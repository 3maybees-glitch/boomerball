# Boomer Ball

Fan-inspired Oklahoma Sooners college football analytics website.

**Planned domain:** [boomerball.app](https://boomerball.app)

## Features

- **2025 Season Stats** — Passing, rushing, receiving, and defensive cumulative statistics
- **Roster & Coaches** — Player bios, ESPN headshots, height/weight, coaching staff
- **Schedule** — Full 2025 results (10-3, 6-2 SEC)
- **News** — Cited summaries from [soonersports.com](https://soonersports.com) and reputable outlets
- **The Locker Room (Premium)** — SP+, EPA, havoc rate, schemes, and recruiting via one-time Stripe purchase
- **PWA** — Installable to your home screen (online-only; no offline shell)

## Offseason Mode

During summer/offseason, the site displays 2025 cumulative stats. Stats update weekly once the season begins.

## Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## PWA — Install to home screen

Boomer Ball is a light, online-only PWA. There is no service worker or offline cache — pages load from the network as usual.

What you get:

- Web app manifest (`/manifest.webmanifest`)
- Standalone display when launched from a home-screen icon
- iOS and Android install support over HTTPS

Users can install from the browser menu (Chrome: **Install app**; iOS Safari: **Share → Add to Home Screen**). A small dismissible tip appears for visitors who haven’t installed yet. No extra env vars are required.

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
