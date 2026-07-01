# Boomer Ball

Fan-inspired Oklahoma Sooners college football analytics website.

**Primary domain:** [boomerball.app](https://boomerball.app)  
**Alternate domain:** [boomerballstats.com](https://boomerballstats.com) → redirects to boomerball.app

## Custom domain setup (Vercel)

Add both domains in **Vercel → Project → Settings → Domains**, then point DNS at your registrar.

| Domain | Role | DNS records |
|--------|------|-------------|
| `boomerball.app` | Primary | **A** `@` → `76.76.21.21` |
| `www.boomerball.app` | Redirect → primary | **CNAME** `www` → `cname.vercel-dns.com` |
| `boomerballstats.com` | Redirect → primary | **A** `@` → `76.76.21.21` |
| `www.boomerballstats.com` | Redirect → primary | **CNAME** `www` → `cname.vercel-dns.com` |

After DNS propagates, set production env vars in Vercel:

1. `NEXT_PUBLIC_SITE_URL` → `https://boomerball.app`
2. Update Stripe webhook URL → `https://boomerball.app/api/webhooks/stripe`
3. Redeploy

Redirects for `www` and `boomerballstats.com` are configured in `vercel.json` and `src/proxy.ts`.

## Features

- **2025 Season Stats** — Passing, rushing, receiving, and defensive cumulative statistics
- **Roster & Coaches** — Player bios, ESPN headshots, height/weight, coaching staff
- **Schedule** — Full 2025 results (10-3, 6-2 SEC)
- **News** — Cited summaries from [soonersports.com](https://soonersports.com) and reputable outlets
- **The Locker Room (Premium)** — SP+, EPA, havoc rate, schemes, and recruiting via one-time Stripe purchase

## Offseason Mode

During summer/offseason, the site displays 2025 cumulative stats. Stats update weekly once the season begins.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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
4. `NEXT_PUBLIC_SITE_URL` — `https://boomerball.app`

### Webhook

In Stripe Dashboard → **Developers → Webhooks**, add:

- **URL:** `https://boomerball.app/api/webhooks/stripe`
- **Events:** `checkout.session.completed`, `charge.refunded`

Redeploy after saving env vars.

### How it works

1. User clicks **Unlock The Locker Room** → Stripe Checkout (hosted)
2. Success redirect → `/locker-room?session_id=…` → `/api/verify-premium` sets signed cookies
3. Webhook confirms payment server-side for logging and reconciliation

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
