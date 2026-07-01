import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import {
  PREMIUM_PRODUCT_NAME,
  PREMIUM_ROUTE,
  PREMIUM_STRIPE_LOOKUP,
  isStripeConfigured,
} from "@/lib/premium";
import { SITE_URL } from "@/lib/seo";

export async function POST() {
  if (!isStripeConfigured()) {
    return NextResponse.json({
      demo: true,
      message:
        "Stripe not configured. Add STRIPE_SECRET_KEY, STRIPE_PRICE_ID, and STRIPE_WEBHOOK_SECRET in Vercel.",
    });
  }

  const priceId = process.env.STRIPE_PRICE_ID!;
  const siteUrl = SITE_URL;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}${PREMIUM_ROUTE}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}${PREMIUM_ROUTE}?checkout=cancelled`,
      metadata: {
        product: PREMIUM_PRODUCT_NAME,
        app: PREMIUM_STRIPE_LOOKUP.app,
        tier: PREMIUM_STRIPE_LOOKUP.tier,
      },
      allow_promotion_codes: true,
      customer_creation: "always",
      billing_address_collection: "auto",
      automatic_tax: { enabled: false },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    configured: isStripeConfigured(),
    priceId: process.env.STRIPE_PRICE_ID ? "set" : "missing",
  });
}
