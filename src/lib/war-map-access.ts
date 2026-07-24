import { cookies } from "next/headers";
import { getStripe } from "@/lib/stripe";
import { hasPremiumAccess } from "@/lib/premium-access";
import {
  WAR_MAP_COOKIE,
  WAR_MAP_TOKEN_COOKIE,
  WAR_MAP_STRIPE_LOOKUP,
  isWarMapStripeConfigured,
} from "@/lib/war-map";
import { verifyPremiumSessionToken } from "@/lib/premium-token";

async function isPaidWarMapSession(sessionId: string): Promise<boolean> {
  if (!isWarMapStripeConfigured()) return false;
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") return false;
    if (session.metadata?.tier === WAR_MAP_STRIPE_LOOKUP.tier) return true;
    // Locker Room lifetime also unlocks the WAR MAP
    if (session.metadata?.tier === "locker_room") return true;
    return false;
  } catch {
    return false;
  }
}

export async function hasWarMapAccess(): Promise<boolean> {
  // Locker Room members get the WAR MAP included
  if (await hasPremiumAccess()) return true;

  const cookieStore = await cookies();
  const token = cookieStore.get(WAR_MAP_TOKEN_COOKIE)?.value;

  if (token) {
    const sessionId = verifyPremiumSessionToken(token);
    if (sessionId) {
      return isPaidWarMapSession(sessionId);
    }
  }

  if (!isWarMapStripeConfigured()) {
    return cookieStore.get(WAR_MAP_COOKIE)?.value === "1";
  }

  return false;
}
