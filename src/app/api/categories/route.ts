import { NextResponse } from "next/server";
import { getCategories } from "@/lib/content";

export async function GET() {
  return NextResponse.json(await getCategories(), {
    headers: { 
      "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
      "Pragma": "no-cache",
      "Expires": "0"
    },
  });
}