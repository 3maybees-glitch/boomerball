import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import {
  PREMIUM_COOKIE,
  PREMIUM_PRODUCT_NAME,
  PREMIUM_TOKEN_COOKIE,
  PREMIUM_STRIPE_LOOKUP,
  isStripeConfigured,
} from "@/lib/premium";
import { createPremiumSessionToken } from "@/lib/premium-token";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 10;

function setPremiumCookies(response: NextResponse, sessionId: string) {
  const signedToken = createPremiumSessionToken(sessionId);

  response.cookies.set(PREMIUM_COOKIE, "1", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  if (signedToken) {
    response.cookies.set(PREMIUM_TOKEN_COOKIE, signedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
  }
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ premium: false, error: "Missing session_id" }, { status: 400 });
  }

  if (!isStripeConfigured()) {
    return NextResponse.json({ premium: false, demo: true });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ premium: false, status: session.payment_status });
    }

    if (
      session.metadata?.app &&
      session.metadata.app !== PREMIUM_STRIPE_LOOKUP.app
    ) {
      return NextResponse.json({ premium: false, error: "Invalid product" }, { status: 403 });
    }

    const response = NextResponse.json({
      premium: true,
      product: session.metadata?.product ?? PREMIUM_PRODUCT_NAME,
    });

    setPremiumCookies(response, session.id);
    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Verification failed";
    return NextResponse.json({ premium: false, error: message }, { status: 500 });
  }
}
