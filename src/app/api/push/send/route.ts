import { NextRequest, NextResponse } from "next/server";
import { sendPushToTopic } from "@/lib/push/send";
import { isPushConfigured } from "@/lib/push/vapid";
import { isPushTopic } from "@/lib/push/types";

export const runtime = "nodejs";

function authorized(request: NextRequest): boolean {
  const secret = process.env.PUSH_SEND_SECRET?.trim();
  if (!secret) return false;
  const header = request.headers.get("authorization");
  if (header === `Bearer ${secret}`) return true;
  return request.headers.get("x-push-secret") === secret;
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!isPushConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Push notifications are not configured yet." },
      { status: 503 },
    );
  }

  let body: {
    topic?: string;
    title?: string;
    message?: string;
    body?: string;
    url?: string;
    tag?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const title = body.title?.trim();
  const message = (body.message ?? body.body)?.trim();
  if (!title || !message) {
    return NextResponse.json(
      { ok: false, error: "title and message are required." },
      { status: 400 },
    );
  }

  const topic =
    body.topic === undefined || body.topic === "all"
      ? undefined
      : isPushTopic(body.topic)
        ? body.topic
        : null;

  if (topic === null) {
    return NextResponse.json(
      { ok: false, error: "topic must be gameday, mmqb, recruiting, or all." },
      { status: 400 },
    );
  }

  const result = await sendPushToTopic(topic, {
    title,
    body: message,
    url: body.url?.trim() || "/",
    tag: body.tag?.trim(),
    topic,
  });

  return NextResponse.json({ ok: true, ...result });
}
