import { NextRequest, NextResponse } from "next/server";
import { createMagicLinkToken, sanitizeRedirectPath } from "@/lib/magic-link";
import { findPaidLockerRoomSession } from "@/lib/premium-stripe";
import { isStripeConfigured } from "@/lib/premium";
import { sendLockerRoomMagicLinkEmail } from "@/lib/send-email";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://boomerball.app").replace(
    /\/$/,
    "",
  );
}

const GENERIC_SUCCESS =
  "If that email has a Locker Room purchase, check your inbox for a magic link.";

export async function POST(request: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Premium checkout is not configured yet." },
      { status: 503 },
    );
  }

  let body: { email?: string; redirect?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const redirect = sanitizeRedirectPath(body.redirect);

  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const sessionId = await findPaidLockerRoomSession(email);

    if (sessionId) {
      const token = createMagicLinkToken(sessionId, redirect);
      if (!token) {
        return NextResponse.json(
          { ok: false, error: "Unable to create sign-in link. Try again later." },
          { status: 500 },
        );
      }

      const magicUrl = `${siteUrl()}${redirect}?magic_token=${encodeURIComponent(token)}`;
      await sendLockerRoomMagicLinkEmail(email, magicUrl);
    }

    return NextResponse.json({ ok: true, message: GENERIC_SUCCESS });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unable to send magic link";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
