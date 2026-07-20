import { getVapidPublicKey } from "./public-key";

export { DEFAULT_VAPID_PUBLIC_KEY, getVapidPublicKey } from "./public-key";

export function getVapidPrivateKey(): string | null {
  const key = process.env.VAPID_PRIVATE_KEY?.trim();
  return key || null;
}

export function getVapidSubject(): string {
  return (
    process.env.VAPID_SUBJECT?.trim() || "mailto:locker@boomerball.app"
  );
}

export function isPushConfigured(): boolean {
  return Boolean(getVapidPublicKey() && getVapidPrivateKey());
}
