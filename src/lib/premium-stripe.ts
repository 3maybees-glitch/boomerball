import { getStripe } from "@/lib/stripe";
import { PREMIUM_STRIPE_LOOKUP } from "@/lib/premium";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isLockerRoomSession(session: {
  payment_status: string | null;
  metadata?: Record<string, string> | null;
}): boolean {
  if (session.payment_status !== "paid") return false;
  if (session.metadata?.app && session.metadata.app !== PREMIUM_STRIPE_LOOKUP.app) {
    return false;
  }
  return true;
}

/** Find the most recent paid Locker Room checkout session for an email. */
export async function findPaidLockerRoomSession(email: string): Promise<string | null> {
  const stripe = getStripe();
  const normalized = normalizeEmail(email);

  const customers = await stripe.customers.list({ email: normalized, limit: 10 });

  let bestSessionId: string | null = null;
  let bestCreated = 0;

  for (const customer of customers.data) {
    const sessions = await stripe.checkout.sessions.list({
      customer: customer.id,
      limit: 25,
    });

    for (const session of sessions.data) {
      if (!isLockerRoomSession(session)) continue;
      const created = session.created ?? 0;
      if (created >= bestCreated) {
        bestCreated = created;
        bestSessionId = session.id;
      }
    }
  }

  if (bestSessionId) return bestSessionId;

  // Fallback: scan recent checkout sessions with matching customer_details email
  const recent = await stripe.checkout.sessions.list({ limit: 100 });
  for (const session of recent.data) {
    const detailsEmail = session.customer_details?.email?.toLowerCase();
    if (detailsEmail !== normalized) continue;
    if (!isLockerRoomSession(session)) continue;
    const created = session.created ?? 0;
    if (created >= bestCreated) {
      bestCreated = created;
      bestSessionId = session.id;
    }
  }

  return bestSessionId;
}

export async function isPaidLockerRoomSession(sessionId: string): Promise<boolean> {
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return isLockerRoomSession(session);
  } catch {
    return false;
  }
}
