import { createHmac, timingSafeEqual } from "node:crypto";

function getSigningSecret(): string | null {
  return (
    process.env.PREMIUM_SIGNING_SECRET ??
    process.env.STRIPE_WEBHOOK_SECRET ??
    null
  );
}

function sign(sessionId: string, secret: string): string {
  return createHmac("sha256", secret).update(sessionId).digest("base64url");
}

/** Signed token tying premium access to a verified Checkout Session ID */
export function createPremiumSessionToken(sessionId: string): string | null {
  const secret = getSigningSecret();
  if (!secret) return null;
  return `${sessionId}.${sign(sessionId, secret)}`;
}

export function verifyPremiumSessionToken(token: string): string | null {
  const secret = getSigningSecret();
  if (!secret) return null;

  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;

  const sessionId = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = sign(sessionId, secret);

  try {
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expected);
    if (sigBuf.length !== expBuf.length) return null;
    if (!timingSafeEqual(sigBuf, expBuf)) return null;
    return sessionId;
  } catch {
    return null;
  }
}
