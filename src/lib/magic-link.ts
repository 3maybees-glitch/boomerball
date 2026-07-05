import { createHmac, timingSafeEqual } from "node:crypto";

const MAGIC_LINK_TTL_MS = 15 * 60 * 1000;

export interface MagicLinkPayload {
  sessionId: string;
  redirect: string;
  exp: number;
}

function getSigningSecret(): string | null {
  return (
    process.env.MAGIC_LINK_SECRET ??
    process.env.PREMIUM_SIGNING_SECRET ??
    process.env.STRIPE_WEBHOOK_SECRET ??
    null
  );
}

function sign(payloadB64: string, secret: string): string {
  return createHmac("sha256", secret).update(payloadB64).digest("base64url");
}

function encodePayload(payload: MagicLinkPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function decodePayload(payloadB64: string): MagicLinkPayload | null {
  try {
    const parsed = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8"),
    ) as MagicLinkPayload;
    if (
      typeof parsed.sessionId !== "string" ||
      typeof parsed.redirect !== "string" ||
      typeof parsed.exp !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function sanitizeRedirectPath(path: string | null | undefined): string {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return "/locker-room";
  }
  return path.split("?")[0] || "/locker-room";
}

export function createMagicLinkToken(
  sessionId: string,
  redirect = "/locker-room",
): string | null {
  const secret = getSigningSecret();
  if (!secret) return null;

  const payload = encodePayload({
    sessionId,
    redirect: sanitizeRedirectPath(redirect),
    exp: Date.now() + MAGIC_LINK_TTL_MS,
  });

  return `${payload}.${sign(payload, secret)}`;
}

export function verifyMagicLinkToken(token: string): MagicLinkPayload | null {
  const secret = getSigningSecret();
  if (!secret) return null;

  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;

  const payloadB64 = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = sign(payloadB64, secret);

  try {
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expected);
    if (sigBuf.length !== expBuf.length) return null;
    if (!timingSafeEqual(sigBuf, expBuf)) return null;
  } catch {
    return null;
  }

  const payload = decodePayload(payloadB64);
  if (!payload || payload.exp < Date.now()) return null;

  return {
    ...payload,
    redirect: sanitizeRedirectPath(payload.redirect),
  };
}
