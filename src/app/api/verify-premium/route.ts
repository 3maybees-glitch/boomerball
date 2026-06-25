import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import {
  PREMIUM_COOKIE,
  PREMIUM_TOKEN_COOKIE,
  PREMIUM_PRODUCT_NAME,
} from "@/lib/premium";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ premium: false, error: "Missing session_id" }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ premium: false, demo: true });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ premium: false, status: session.payment_status });
    }

    const response = NextResponse.json({
      premium: true,
      product: session.metadata?.product ?? PREMIUM_PRODUCT_NAME,
    });

    response.cookies.set(PREMIUM_COOKIE, "1", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365 * 10,
      path: "/",
    });

    if (session.customer) {
      response.cookies.set(
        PREMIUM_TOKEN_COOKIE,
        String(session.customer),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 365 * 10,
          path: "/",
        }
      );
    }

    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Verification failed";
    return NextResponse.json({ premium: false, error: message }, { status: 500 });
  }
}
