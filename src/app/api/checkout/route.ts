import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { PREMIUM_PRODUCT_NAME } from "@/lib/premium";

export async function POST() {
  const priceId = process.env.STRIPE_PRICE_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://boomerball.vercel.app";

  if (!process.env.STRIPE_SECRET_KEY || !priceId) {
    return NextResponse.json({
      demo: true,
      message:
        "Stripe not configured. Add STRIPE_SECRET_KEY and STRIPE_PRICE_ID in Vercel env vars.",
    });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/advanced?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/advanced?premium=cancelled`,
      metadata: { product: PREMIUM_PRODUCT_NAME },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
