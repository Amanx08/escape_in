import { NextResponse } from "next/server";
import { getDestinations } from "@/lib/content";

export async function GET() {
  return NextResponse.json(await getDestinations(), {
    headers: { 
      "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
      "Pragma": "no-cache",
      "Expires": "0"
    },
  });
}