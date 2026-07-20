import webpush from "web-push";
import {
  getVapidPrivateKey,
  getVapidPublicKey,
  getVapidSubject,
  isPushConfigured,
} from "./vapid";
import { listPushSubscriptions, removePushSubscription } from "./store";
import type { PushPayload, PushTopic } from "./types";

let vapidReady = false;

function ensureVapid(): void {
  if (vapidReady) return;
  const privateKey = getVapidPrivateKey();
  if (!privateKey) {
    throw new Error("VAPID_PRIVATE_KEY is not configured");
  }
  webpush.setVapidDetails(getVapidSubject(), getVapidPublicKey(), privateKey);
  vapidReady = true;
}

export type SendPushResult = {
  attempted: number;
  delivered: number;
  removed: number;
  failures: number;
};

export async function sendPushToTopic(
  topic: PushTopic | undefined,
  payload: PushPayload,
): Promise<SendPushResult> {
  if (!isPushConfigured()) {
    throw new Error("Push notifications are not configured");
  }

  ensureVapid();

  const rows = await listPushSubscriptions(topic);
  const body = JSON.stringify({
    title: payload.title,
    body: payload.body,
    url: payload.url ?? "/",
    tag: payload.tag ?? payload.topic ?? "boomer-ball",
    icon: payload.icon ?? "/icons/icon-192.png",
    badge: payload.badge ?? "/icons/badge-96.png",
  });

  let delivered = 0;
  let removed = 0;
  let failures = 0;

  await Promise.all(
    rows.map(async (row) => {
      try {
        await webpush.sendNotification(row.subscription, body);
        delivered += 1;
      } catch (err) {
        const statusCode =
          err && typeof err === "object" && "statusCode" in err
            ? Number((err as { statusCode?: number }).statusCode)
            : undefined;

        if (statusCode === 404 || statusCode === 410) {
          await removePushSubscription(row.subscription.endpoint);
          removed += 1;
          return;
        }

        failures += 1;
        console.error(
          "[push] send failed",
          row.subscription.endpoint.slice(0, 48),
          err,
        );
      }
    }),
  );

  return {
    attempted: rows.length,
    delivered,
    removed,
    failures,
  };
}
