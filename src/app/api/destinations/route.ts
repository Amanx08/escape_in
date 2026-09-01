import { NextResponse } from "next/server";
import { getDestinations } from "@/lib/content";

export async function GET() {
  return NextResponse.json(await getDestinations(), {
    headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=3600" },
  });
}