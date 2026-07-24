import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import {
  WAR_MAP_PRODUCT_NAME,
  WAR_MAP_STRIPE_LOOKUP,
  isWarMapStripeConfigured,
} from "@/lib/war-map";
import { setWarMapCookies } from "@/lib/war-map-cookies";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ unlocked: false, error: "Missing session_id" }, { status: 400 });
  }

  if (!isWarMapStripeConfigured()) {
    return NextResponse.json({ unlocked: false, demo: true });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ unlocked: false, status: session.payment_status });
    }

    if (
      session.metadata?.app &&
      session.metadata.app !== WAR_MAP_STRIPE_LOOKUP.app
    ) {
      return NextResponse.json({ unlocked: false, error: "Invalid product" }, { status: 403 });
    }

    const tier = session.metadata?.tier;
    if (tier && tier !== WAR_MAP_STRIPE_LOOKUP.tier && tier !== "locker_room") {
      return NextResponse.json({ unlocked: false, error: "Wrong product" }, { status: 403 });
    }

    const response = NextResponse.json({
      unlocked: true,
      product: session.metadata?.product ?? WAR_MAP_PRODUCT_NAME,
    });

    setWarMapCookies(response, session.id);
    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Verification failed";
    return NextResponse.json({ unlocked: false, error: message }, { status: 500 });
  }
}
