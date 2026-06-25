# Boomer Ball

Fan-inspired Oklahoma Sooners college football analytics website.

**Planned domain:** [boomerball.app](https://boomerball.app)

## Features

- **2025 Season Stats** — Passing, rushing, receiving, and defensive cumulative statistics
- **Roster & Coaches** — Player bios, ESPN headshots, height/weight, coaching staff
- **Schedule** — Full 2025 results (10-3, 6-2 SEC)
- **News** — Cited summaries from [soonersports.com](https://soonersports.com) and reputable outlets
- **Advanced Stats (Premium)** — EPA, success rate, havoc rate, and more via one-time Stripe purchase

## Offseason Mode

During summer/offseason, the site displays 2025 cumulative stats. Stats update weekly once the season begins.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stripe Setup (Premium)

1. Create a **one-time payment** product in [Stripe Dashboard](https://dashboard.stripe.com/products) ($9.99 recommended)
2. In **Vercel → Settings → Environment Variables**, add:
   - `STRIPE_SECRET_KEY` — from Stripe API keys
   - `STRIPE_PRICE_ID` — from your product's price ID
   - `STRIPE_WEBHOOK_SECRET` — from Stripe webhook signing secret
   - `NEXT_PUBLIC_SITE_URL` — `https://boomerball.vercel.app`
3. Add webhook in Stripe: `https://boomerball.vercel.app/api/webhooks/stripe`  
   Event: `checkout.session.completed`
4. Redeploy

Without Stripe keys, the advanced page uses demo unlock for testing.

## Data Sources

All statistics credited to:

- [University of Oklahoma Athletics (soonersports.com)](https://soonersports.com/sports/football/stats/2025)
- [ESPN College Football](https://www.espn.com/college-football/team/stats/_/id/201)

Player headshots via ESPN CDN.

## Disclaimer

Boomer Ball is a fan project. Not affiliated with or endorsed by the University of Oklahoma.

**Boomer Sooner!**
