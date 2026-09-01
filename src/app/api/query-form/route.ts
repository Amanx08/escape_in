import { Client, Databases, ID } from "node-appwrite";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DEFAULT_ENDPOINT = "https://fra.cloud.appwrite.io/v1";
const DEFAULT_PROJECT_ID = "69441e9b00062a6520c1";
const DEFAULT_DATABASE_ID = "694423e30037647a97c1";
const DEFAULT_COLLECTION_ID = "queries";
const allowedQueryTypes = new Set(["quote", "callback", "contact_form", "ms_form"]);

function cleanString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function getDatabases() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || DEFAULT_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || DEFAULT_PROJECT_ID;
  const client = new Client().setEndpoint(endpoint).setProject(projectId);

  // A server API key is optional when the Appwrite collection allows public document creation.
  // If present, it is used only on the server and is never sent to the browser.
  if (process.env.APPWRITE_API_KEY) client.setKey(process.env.APPWRITE_API_KEY);

  return new Databases(client);
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const name = cleanString(payload?.name, 120);
    const email = cleanString(payload?.email, 160);
    const mobile = cleanString(payload?.mobile || payload?.telephone, 60);
    const destination = cleanString(payload?.destination, 120);
    const message = cleanString(payload?.message, 3000);
    const queryType = cleanString(payload?.query_type, 30) || "quote";

    if (!allowedQueryTypes.has(queryType)) {
      return NextResponse.json({ ok: false, message: "Invalid enquiry type." }, { status: 400 });
    }

    if (!name || !mobile) {
      return NextResponse.json({ ok: false, message: "Name and telephone number are required." }, { status: 400 });
    }

    if (queryType === "quote" && !email) {
      return NextResponse.json({ ok: false, message: "Email address is required for a quote." }, { status: 400 });
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ ok: false, message: "Please enter a valid email address." }, { status: 400 });
    }

    const databaseId = process.env.APPWRITE_DATABASE_ID || DEFAULT_DATABASE_ID;
    const collectionId = process.env.APPWRITE_QUERIES_COLLECTION_ID || DEFAULT_COLLECTION_ID;
    const documentData = {
      name,
      email,
      mobile,
      destination,
      message,
      query_type: queryType,
      metadata: JSON.stringify(payload).slice(0, 8000),
    };

    const document = await getDatabases().createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      documentData,
    );

    return NextResponse.json({
      ok: true,
      id: document.$id,
      message: "Your enquiry has been received.",
    });
  } catch (error) {
    console.error("Appwrite enquiry submission failed", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { ok: false, message: "We could not submit your enquiry right now. Please try again or call us directly." },
      { status: 500 },
    );
  }
}
