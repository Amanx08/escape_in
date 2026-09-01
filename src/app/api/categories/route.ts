import { NextResponse } from "next/server";
import { getCategories } from "@/lib/content";

export async function GET() {
  return NextResponse.json(await getCategories(), {
    headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=3600" },
  });
}