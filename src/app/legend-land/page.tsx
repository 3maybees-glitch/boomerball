import type { Metadata } from "next";
import { Trophy, Star } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { LegendCard, ChampionshipCard } from "@/components/LegendCard";
import { IconicGameCard } from "@/components/IconicGameCard";
import { SourceAttribution } from "@/components/SourceAttribution";
import { WesternDivider } from "@/components/WesternDivider";
import { iconicGames, ICONIC_GAMES_SOURCE } from "@/data/iconic-games";
import {
  soonersLegends,
  nationalChampionships,
  LEGENDS_SOURCE,
  CHAMPIONSHIPS_SOURCE,
} from "@/data/legends";

export const metadata: Metadata = {
  title: "Legend Land — Sooners Hall of Fame",
  description:
    "Oklahoma Sooners football legends, Heisman winners, iconic games, and seven national championship teams.",
};

export default function LegendLandPage() {
  const heismanWinners = soonersLegends.filter((l) => l.category === "heisman");
  const icons = soonersLegends.filter((l) => l.category !== "heisman");

  return (
    <PageShell theme="legends">
    <div>
      {/* Hero */}
      <section className="border-b-4 border-crimson-dark bg-gradient-to-br from-crimson via-crimson to-crimson-dark py-14 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-2 text-cream/80">
            <Star className="h-5 w-5 fill-cream/30" aria-hidden />
            <span className="text-sm font-semibold uppercase tracking-[0.25em]">
              Sooners Hall of Fame
            </span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            Legend Land
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-cream/90">
            Celebrate the icons who built Sooner Nation — lifelike illustrated
            portraits, Heisman winners, ten iconic games in Sooner history, and
            the seven national championship teams that define crimson & cream
            excellence.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-full bg-cream/15 px-4 py-2">
              <Trophy className="h-5 w-5" aria-hidden />
              <span className="font-bold">7 National Titles</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-cream/15 px-4 py-2">
              <Star className="h-5 w-5" aria-hidden />
              <span className="font-bold">7 Heisman Trophies</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {/* Heisman */}
        <section>
          <h2 className="font-display text-2xl font-bold text-crimson">
            Heisman Trophy Winners
          </h2>
          <p className="mt-1 text-sm text-ink/70">
            OU is tied for the second-most Heisman winners in college football history.
          </p>
          <WesternDivider />
          <div className="space-y-6">
            {heismanWinners.map((legend) => (
              <LegendCard key={legend.id} legend={legend} />
            ))}
          </div>
        </section>

        {/* Icons */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-crimson">
            Sooner Icons
          </h2>
          <p className="mt-1 text-sm text-ink/70">
            Legends who defined eras — from The Boz to Adrian Peterson and Lee Roy Selmon.
          </p>
          <WesternDivider />
          <div className="space-y-6">
            {icons.map((legend) => (
              <LegendCard key={legend.id} legend={legend} />
            ))}
          </div>
        </section>

        {/* Iconic Games */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-crimson">
            Iconic Wins in Sooner History
          </h2>
          <p className="mt-1 text-sm text-ink/70">
            Ten legendary victories — five national championship clinchers, Red River
            classics, and unforgettable upsets that define Boomer Sooner lore.
          </p>
          <WesternDivider />
          <div className="grid gap-6 lg:grid-cols-2">
            {iconicGames.map((game) => (
              <IconicGameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Championships */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-crimson">
            National Championship Teams
          </h2>
          <p className="mt-1 text-sm text-ink/70">
            Seven consensus national titles since 1950 — one of only three programs to reach
            that mark.
          </p>
          <WesternDivider />
          <div className="grid gap-5 sm:grid-cols-2">
            {nationalChampionships.map((team) => (
              <ChampionshipCard key={team.year} team={team} />
            ))}
          </div>
        </section>

        <SourceAttribution
          className="mt-10"
          sources={[
            { label: "soonersports.com — National Championships", url: CHAMPIONSHIPS_SOURCE },
            { label: "soonersports.com — Award Winners", url: LEGENDS_SOURCE },
            { label: "soonersports.com — Opponent History", url: ICONIC_GAMES_SOURCE },
          ]}
        />

        <p className="mt-4 text-xs text-ink/50">
          Stats compiled from University of Oklahoma Athletics, SoonerStats, and NCAA
          historical records. Portrait and game moment illustrations are original
          Boomer Ball artwork inspired by each legend and iconic matchup. Not
          affiliated with the University of Oklahoma.
        </p>
      </div>
    </div>
    </PageShell>
  );
}
