#!/usr/bin/env node
/**
 * One-time setup: create Boomer Ball Stripe webhook endpoint.
 *
 * Usage (with your live secret key):
 *   STRIPE_SECRET_KEY=sk_live_... node scripts/setup-stripe-webhook.mjs
 *
 * Or if keys are in .env.local:
 *   node --env-file=.env.local scripts/setup-stripe-webhook.mjs
 *
 * Prints the signing secret — add to Vercel as STRIPE_WEBHOOK_SECRET, then redeploy.
 */

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
const WEBHOOK_URL =
  process.env.WEBHOOK_URL ?? "https://boomerball.app/api/webhooks/stripe";
const EVENTS = ["checkout.session.completed", "charge.refunded"];

if (!STRIPE_KEY?.startsWith("sk_")) {
  console.error("Set STRIPE_SECRET_KEY (sk_live_... or sk_test_...) and re-run.");
  process.exit(1);
}

const auth = Buffer.from(`${STRIPE_KEY}:`).toString("base64");

async function stripe(path, { method = "GET", body } = {}) {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json;
}

function encodeBody(params) {
  return new URLSearchParams(params).toString();
}

async function main() {
  const existing = await stripe("/webhook_endpoints?limit=20");
  const match = existing.data?.find((ep) => ep.url === WEBHOOK_URL);

  if (match) {
    console.log("Webhook already exists:");
    console.log("  ID:", match.id);
    console.log("  URL:", match.url);
    console.log("  Status:", match.status);
    console.log("\nCopy the signing secret from Stripe Dashboard → Webhooks → this endpoint.");
    console.log("Dashboard: https://dashboard.stripe.com/webhooks/" + match.id);
    return;
  }

  const body = encodeBody({
    url: WEBHOOK_URL,
    description: "Boomer Ball — The Locker Room (production)",
    ...Object.fromEntries(EVENTS.map((e, i) => [`enabled_events[${i}]`, e])),
  });

  const created = await stripe("/webhook_endpoints", { method: "POST", body });

  console.log("Created webhook endpoint:");
  console.log("  ID:", created.id);
  console.log("  URL:", created.url);
  console.log("\nAdd this to Vercel → STRIPE_WEBHOOK_SECRET → Production, then redeploy:\n");
  console.log(created.secret);
}

main().catch((err) => {
  console.error("Setup failed:", err.message);
  process.exit(1);
});
