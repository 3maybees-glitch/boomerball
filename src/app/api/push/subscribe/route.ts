import { NextRequest, NextResponse } from "next/server";
import { upsertPushSubscription } from "@/lib/push/store";
import { isPushConfigured } from "@/lib/push/vapid";
import { normalizeTopics, type PushSubscriptionJSON } from "@/lib/push/types";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isPushConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Push notifications are not configured yet." },
      { status: 503 },
    );
  }

  let body: { subscription?: PushSubscriptionJSON; topics?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const subscription = body.subscription;
  if (
    !subscription?.endpoint ||
    !subscription.keys?.p256dh ||
    !subscription.keys?.auth
  ) {
    return NextResponse.json(
      { ok: false, error: "A valid push subscription is required." },
      { status: 400 },
    );
  }

  const saved = await upsertPushSubscription(
    subscription,
    normalizeTopics(body.topics),
  );

  return NextResponse.json({ ok: true, topics: saved.topics });
}
