import { Client, Databases, ID } from "appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1";
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "69441e9b00062a6520c1";
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "694423e30037647a97c1";
const queriesCollectionId = process.env.NEXT_PUBLIC_APPWRITE_QUERIES_COLLECTION_ID || "queries";

const client = new Client().setEndpoint(endpoint).setProject(projectId);
const databases = new Databases(client);

type EnquiryDocument = {
  name: string;
  email: string;
  mobile: string;
  destination: string;
  message: string;
  query_type: string;
  [key: string]: unknown;
};

export async function createEnquiryDocument(payload: EnquiryDocument) {
  const { name, email, mobile, destination, message, query_type, ...additionalFields } = payload;
  const document = { name, email, mobile, destination, message, query_type };

  return databases.createDocument(databaseId, queriesCollectionId, ID.unique(), {
    ...document,
    metadata: JSON.stringify({ ...document, ...additionalFields }).slice(0, 8000),
  });
}
