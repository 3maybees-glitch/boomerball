import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import {
  PREMIUM_PRICE_CENTS,
  PREMIUM_PRODUCT_DESCRIPTION,
  PREMIUM_PRODUCT_NAME,
  PREMIUM_ROUTE,
  PREMIUM_STRIPE_LOOKUP,
  isStripeConfigured,
} from "@/lib/premium";

export async function POST() {
  if (!isStripeConfigured()) {
    return NextResponse.json({
      demo: true,
      message:
        "Stripe not configured. Add STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in Vercel.",
    });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://boomerball.vercel.app";

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: PREMIUM_PRICE_CENTS,
            product_data: {
              name: PREMIUM_PRODUCT_NAME,
              description: PREMIUM_PRODUCT_DESCRIPTION,
            },
          },
        },
      ],
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
    priceCents: PREMIUM_PRICE_CENTS,
  });
}
