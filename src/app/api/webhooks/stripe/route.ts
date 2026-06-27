import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { PREMIUM_STRIPE_LOOKUP, isStripeConfigured } from "@/lib/premium";

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || !isStripeConfigured()) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        if (session.payment_status === "paid") {
          console.info("[stripe] Locker Room purchase completed", {
            sessionId: session.id,
            customer: session.customer,
            tier: session.metadata?.tier ?? PREMIUM_STRIPE_LOOKUP.tier,
          });
        }
        break;
      }
      case "charge.refunded": {
        const charge = event.data.object;
        console.info("[stripe] Charge refunded — review premium access", {
          chargeId: charge.id,
          paymentIntent: charge.payment_intent,
        });
        break;
      }
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    configured: Boolean(process.env.STRIPE_WEBHOOK_SECRET && isStripeConfigured()),
  });
}
