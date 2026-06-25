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

Create a one-time payment product in Stripe and set:

```env
STRIPE_SECRET_KEY=sk_...
STRIPE_PRICE_ID=price_...
NEXT_PUBLIC_SITE_URL=https://boomerball.app
```

Without Stripe keys, the advanced page enables demo unlock for testing.

## Data Sources

All statistics credited to:

- [University of Oklahoma Athletics (soonersports.com)](https://soonersports.com/sports/football/stats/2025)
- [ESPN College Football](https://www.espn.com/college-football/team/stats/_/id/201)

Player headshots via ESPN CDN.

## Disclaimer

Boomer Ball is a fan project. Not affiliated with or endorsed by the University of Oklahoma.

**Boomer Sooner!**
