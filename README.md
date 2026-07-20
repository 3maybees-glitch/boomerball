# Boomer Ball

Fan-inspired Oklahoma Sooners college football analytics website.

**Planned domain:** [boomerball.app](https://boomerball.app)

## Features

- **2025 Season Stats** — Passing, rushing, receiving, and defensive cumulative statistics
- **Roster & Coaches** — Player bios, ESPN headshots, height/weight, coaching staff
- **Schedule** — Full 2025 results (10-3, 6-2 SEC)
- **News** — Cited summaries from [soonersports.com](https://soonersports.com) and reputable outlets
- **The Locker Room (Premium)** — SP+, EPA, havoc rate, schemes, and recruiting via one-time Stripe purchase
- **PWA alerts** — Installable home-screen app with optional push for game day, MMQB, and recruiting

## Offseason Mode

During summer/offseason, the site displays 2025 cumulative stats. Stats update weekly once the season begins.

## Development

```bash
npm install
cp .env.example .env.local
# set VAPID_PRIVATE_KEY (and Stripe keys if testing checkout)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For push testing locally, use HTTPS:

```bash
npx next dev --experimental-https
```

## PWA — Install + push alerts

Boomer Ball ships as a light PWA: web manifest + installable icons, and push-only service worker (no offline shell).

### Vercel environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | Web Push public key (optional; project default is fine) |
| `VAPID_PRIVATE_KEY` | Web Push private key (**required** for push) |
| `VAPID_SUBJECT` | `mailto:` contact used in VAPID claims |
| `PUSH_SEND_SECRET` | Bearer token for `POST /api/push/send` |
| `CRON_SECRET` | Protects `/api/cron/gameday-alerts` (Vercel Cron sends this automatically) |
| `BLOB_READ_WRITE_TOKEN` | **Recommended** — durable subscription store via Vercel Blob |

Generate a new key pair anytime with:

```bash
npx web-push generate-vapid-keys --json
```

### Send a manual alert (MMQB / recruiting)

```bash
curl -X POST "$NEXT_PUBLIC_SITE_URL/api/push/send" \
  -H "Authorization: Bearer $PUSH_SEND_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"topic":"mmqb","title":"MMQB is live","message":"Monday recap is up.","url":"/mmqb"}'
```

`topic` may be `gameday`, `mmqb`, `recruiting`, or `all`.

### Game-day cron

`vercel.json` schedules `GET /api/cron/gameday-alerts` daily at 14:00 UTC (morning CT). It notifies `gameday` subscribers when OU plays today or tomorrow.

## Stripe Setup — The Locker Room

A **live** Stripe product is configured for Boomer Ball:

| Field | Value |
|-------|-------|
| Product | Boomer Ball — The Locker Room |
| Price | $9.99 one-time (`price_1Tmn1yPIHJvArvGeDqY1rGuL`) |

### Vercel environment variables

Copy `.env.example` and set in **Vercel → Settings → Environment Variables**:

1. `STRIPE_SECRET_KEY` — Stripe Dashboard → [API keys](https://dashboard.stripe.com/apikeys)
2. `STRIPE_PRICE_ID` — `price_1Tmn1yPIHJvArvGeDqY1rGuL`
3. `STRIPE_WEBHOOK_SECRET` — from webhook endpoint (below)
4. `NEXT_PUBLIC_SITE_URL` — `https://boomerball.vercel.app`

### Webhook

In Stripe Dashboard → **Developers → Webhooks**, add:

- **URL:** `https://boomerball.vercel.app/api/webhooks/stripe`
- **Events:** `checkout.session.completed`, `charge.refunded`

Redeploy after saving env vars.

### How it works

1. User clicks **Unlock The Locker Room** → Stripe Checkout (hosted)
2. Success redirect → `/locker-room?session_id=…` → `/api/verify-premium` sets signed cookies
3. Webhook confirms payment server-side for logging and reconciliation

### Magic link restore (returning members)

If a member clears cookies or switches browsers, they can enter their checkout email under **Send me a magic link** on any premium page. The app:

1. Looks up a paid Stripe Checkout session for that email
2. Emails a signed 15-minute link via [Resend](https://resend.com)
3. Opens the link → sets the same premium cookies as checkout

Add to Vercel env vars:

5. `RESEND_API_KEY` — Resend Dashboard → API Keys
6. `RESEND_FROM` — verified sender, e.g. `Boomer Ball <locker@boomerball.app>`
7. `MAGIC_LINK_SECRET` — optional; defaults to `STRIPE_WEBHOOK_SECRET`

Without Stripe keys, **local dev only** can use demo unlock via checkout button. Production requires live keys.

Legacy URL `/advanced` redirects permanently to `/locker-room`.

## Data Sources

All statistics credited to:

- [University of Oklahoma Athletics (soonersports.com)](https://soonersports.com/sports/football/stats/2025)
- [ESPN College Football](https://www.espn.com/college-football/team/stats/_/id/201)

Player headshots via ESPN CDN.

## Disclaimer

Boomer Ball is a fan-focused sports analytics property published by [Maybee Creations](https://maybeecreations.com). Not affiliated with or endorsed by the University of Oklahoma.

**Boomer Sooner!**
