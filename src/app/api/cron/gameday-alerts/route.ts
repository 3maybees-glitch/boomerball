import { NextRequest, NextResponse } from "next/server";
import { buildGameDayAlerts } from "@/lib/push/gameday";
import { sendPushToTopic } from "@/lib/push/send";
import { isPushConfigured } from "@/lib/push/vapid";

export const runtime = "nodejs";

function authorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET?.trim();
  const pushSecret = process.env.PUSH_SEND_SECRET?.trim();
  const auth = request.headers.get("authorization");
  const bearer = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

  if (cronSecret && bearer === cronSecret) return true;
  if (pushSecret && bearer === pushSecret) return true;
  if (pushSecret && request.headers.get("x-push-secret") === pushSecret) {
    return true;
  }
  return false;
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!isPushConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Push notifications are not configured yet.", skipped: true },
      { status: 503 },
    );
  }

  const alerts = buildGameDayAlerts();
  if (alerts.length === 0) {
    return NextResponse.json({
      ok: true,
      sent: 0,
      message: "No game-day or eve-of-game alerts for today.",
    });
  }

  const results = [];
  for (const alert of alerts) {
    const result = await sendPushToTopic("gameday", {
      title: alert.title,
      body: alert.body,
      url: alert.url,
      tag: `gameday-${alert.game.date}-${alert.kind}`,
      topic: "gameday",
    });
    results.push({ kind: alert.kind, opponent: alert.game.opponent, ...result });
  }

  return NextResponse.json({ ok: true, sent: results.length, results });
}
