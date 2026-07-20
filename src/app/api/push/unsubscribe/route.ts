import { NextRequest, NextResponse } from "next/server";
import { removePushSubscription } from "@/lib/push/store";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: { endpoint?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const endpoint = body.endpoint?.trim();
  if (!endpoint) {
    return NextResponse.json(
      { ok: false, error: "Subscription endpoint is required." },
      { status: 400 },
    );
  }

  const removed = await removePushSubscription(endpoint);
  return NextResponse.json({ ok: true, removed });
}
