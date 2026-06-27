import { cookies } from "next/headers";
import { getStripe } from "@/lib/stripe";
import { PREMIUM_COOKIE, PREMIUM_TOKEN_COOKIE, isStripeConfigured } from "@/lib/premium";
import { verifyPremiumSessionToken } from "@/lib/premium-token";

async function isPaidCheckoutSession(sessionId: string): Promise<boolean> {
  if (!isStripeConfigured()) return false;
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid";
  } catch {
    return false;
  }
}

export async function hasPremiumAccess(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(PREMIUM_TOKEN_COOKIE)?.value;

  if (token) {
    const sessionId = verifyPremiumSessionToken(token);
    if (sessionId) {
      return isPaidCheckoutSession(sessionId);
    }
  }

  // Legacy/demo cookie — only honored when Stripe is not configured
  if (!isStripeConfigured()) {
    return cookieStore.get(PREMIUM_COOKIE)?.value === "1";
  }

  return false;
}
