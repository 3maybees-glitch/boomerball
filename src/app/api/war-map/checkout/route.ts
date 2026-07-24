import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import {
  WAR_MAP_PRICE_CENTS,
  WAR_MAP_PRODUCT_DESCRIPTION,
  WAR_MAP_PRODUCT_NAME,
  WAR_MAP_ROUTE,
  WAR_MAP_STRIPE_LOOKUP,
  isWarMapStripeConfigured,
} from "@/lib/war-map";

export async function POST() {
  if (!isWarMapStripeConfigured()) {
    return NextResponse.json({
      demo: true,
      message:
        "Stripe not configured. Add STRIPE_SECRET_KEY in Vercel to enable $1 checkout.",
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
            unit_amount: WAR_MAP_PRICE_CENTS,
            product_data: {
              name: WAR_MAP_PRODUCT_NAME,
              description: WAR_MAP_PRODUCT_DESCRIPTION,
            },
          },
        },
      ],
      success_url: `${siteUrl}${WAR_MAP_ROUTE}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}${WAR_MAP_ROUTE}?checkout=cancelled`,
      metadata: {
        product: WAR_MAP_PRODUCT_NAME,
        app: WAR_MAP_STRIPE_LOOKUP.app,
        tier: WAR_MAP_STRIPE_LOOKUP.tier,
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
    configured: isWarMapStripeConfigured(),
    priceCents: WAR_MAP_PRICE_CENTS,
  });
}
