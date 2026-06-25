import { NextResponse } from "next/server";
import { hasPremiumAccess } from "@/lib/premium-access";

export async function GET() {
  const premium = await hasPremiumAccess();
  return NextResponse.json({ premium });
}
