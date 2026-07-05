import { NextRequest, NextResponse } from "next/server";
import { verifyMagicLinkToken } from "@/lib/magic-link";
import { isPaidLockerRoomSession } from "@/lib/premium-stripe";
import { setPremiumCookies } from "@/lib/premium-cookies";
import { PREMIUM_PRODUCT_NAME, isStripeConfigured } from "@/lib/premium";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ premium: false, error: "Missing token" }, { status: 400 });
  }

  if (!isStripeConfigured()) {
    return NextResponse.json({ premium: false, demo: true });
  }

  const payload = verifyMagicLinkToken(token);
  if (!payload) {
    return NextResponse.json(
      { premium: false, error: "This magic link expired or is invalid. Request a new one." },
      { status: 401 },
    );
  }

  const paid = await isPaidLockerRoomSession(payload.sessionId);
  if (!paid) {
    return NextResponse.json(
      { premium: false, error: "We couldn't verify your purchase. Contact support if you were charged." },
      { status: 403 },
    );
  }

  const response = NextResponse.json({
    premium: true,
    product: PREMIUM_PRODUCT_NAME,
    redirect: payload.redirect,
  });

  setPremiumCookies(response, payload.sessionId);
  return response;
}
