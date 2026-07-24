import { NextResponse } from "next/server";
import { hasWarMapAccess } from "@/lib/war-map-access";

export async function GET() {
  const unlocked = await hasWarMapAccess();
  return NextResponse.json({ unlocked });
}
