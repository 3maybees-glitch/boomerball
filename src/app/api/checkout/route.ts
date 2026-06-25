import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { PREMIUM_PRODUCT_NAME } from "@/lib/premium";

export async function POST() {
  const priceId = process.env.STRIPE_PRICE_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  if (!process.env.STRIPE_SECRET_KEY || !priceId) {
    return NextResponse.json({
      demo: true,
      message:
        "Stripe not configured — demo unlock enabled. Set STRIPE_SECRET_KEY and STRIPE_PRICE_ID for production.",
    });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/advanced?premium=success`,
      cancel_url: `${siteUrl}/advanced?premium=cancelled`,
      metadata: { product: PREMIUM_PRODUCT_NAME },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
