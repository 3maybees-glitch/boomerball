import Link from "next/link";
import {
  BarChart3,
  Calendar,
  HatGlasses,
  Lasso,
  Newspaper,
  Users,
  Trophy,
} from "lucide-react";
import { WesternDivider } from "@/components/WesternDivider";
import { TeamStatGrid } from "@/components/StatTable";
import { SourceAttribution } from "@/components/SourceAttribution";
import { ScheduleCard } from "@/components/ScheduleCard";
import { SEASON_RECORD, CONFERENCE_RECORD } from "@/data/schedule";
import { schedule2026 } from "@/data/schedule-2026";
import { roster2026 } from "@/data/roster";
import { teamStats2025, STATS_SOURCE_SOONERS } from "@/data/stats";
import { newsItems } from "@/data/news";

const quickLinks = [
  {
    href: "/stats",
    label: "Season Stats",
    desc: "Passing, rushing, receiving & defense",
    icon: BarChart3,
  },
  {
    href: "/roster",
    label: "Roster & Coaches",
    desc: `${roster2026.length}+ players, bios & staff`,
    icon: Users,
  },
  {
    href: "/schedule",
    label: "Schedule",
    desc: "2026 upcoming & 2025 results",
    icon: Calendar,
  },
  {
    href: "/news",
    label: "Sooner News",
    desc: "Cited updates from official sources",
    icon: Newspaper,
  },
  {
    href: "/advanced",
    label: "Advanced Stats",
    desc: "Premium SP+ & PFF-style grades",
    icon: HatGlasses,
  },
];

export default function HomePage() {
  const upcomingGames = schedule2026.slice(0, 3);
  const latestNews = newsItems.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b-4 border-crimson-dark bg-crimson">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-8 border-cream" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full border-4 border-cream" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex items-center gap-3 text-cream/80">
            <Lasso className="h-6 w-6" aria-hidden />
            <span className="text-sm font-semibold uppercase tracking-[0.25em]">
              Boomer Sooner
            </span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-cream sm:text-6xl">
            Boomer Ball
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-cream/90">
            Oklahoma Sooners football analytics for Sooner Nation. Full 2026 roster,
            upcoming schedule, 2025 stats, and cited news — with premium SP+ and
            PFF-style advanced metrics.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-cream px-5 py-2.5">
              <Trophy className="h-5 w-5 text-crimson" aria-hidden />
              <span className="font-display text-xl font-bold text-crimson">
                {SEASON_RECORD}
              </span>
              <span className="text-sm text-ink/70">{CONFERENCE_RECORD}</span>
            </div>
            <span className="rounded-full border border-cream/40 px-4 py-2 text-sm text-cream/90">
              🏈 Offseason — 2026 opener vs UTEP, Sep 5
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/stats"
              className="rounded-full bg-cream px-6 py-3 font-bold text-crimson transition hover:bg-white"
            >
              View 2025 Stats
            </Link>
            <Link
              href="/advanced"
              className="rounded-full border-2 border-cream px-6 py-3 font-bold text-cream transition hover:bg-crimson-dark"
            >
              Advanced Stats
            </Link>
          </div>
        </div>
      </section>

      {/* Team snapshot */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-crimson">
          2025 Season Snapshot
        </h2>
        <p className="mt-1 text-sm text-ink/70">
          Cumulative stats through the CFP first round (13 games)
        </p>
        <WesternDivider />
        <TeamStatGrid
          stats={[
            { label: "Record", value: teamStats2025.record, sub: teamStats2025.conferenceRecord },
            { label: "PPG", value: teamStats2025.pointsPerGame },
            { label: "PA/G", value: teamStats2025.pointsAllowedPerGame },
            { label: "Total YPG", value: teamStats2025.totalYardsPerGame },
            { label: "Rush YPG", value: teamStats2025.rushingYardsPerGame },
            { label: "Pass YPG", value: teamStats2025.passingYardsPerGame },
            { label: "Sacks", value: teamStats2025.sacks },
            { label: "INTs", value: teamStats2025.interceptions },
          ]}
        />
        <SourceAttribution
          className="mt-6"
          sources={[{ label: "soonersports.com", url: STATS_SOURCE_SOONERS }]}
        />
      </section>

      {/* Quick links */}
      <section className="border-y border-crimson/10 bg-white/60 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-crimson">Explore</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-start gap-4 rounded-xl border-2 border-crimson/15 bg-white p-5 shadow-sm transition hover:border-crimson hover:shadow-md"
              >
                <div className="rounded-lg bg-crimson/10 p-3 text-crimson transition group-hover:bg-crimson group-hover:text-cream">
                  <link.icon className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display font-bold text-ink group-hover:text-crimson">
                    {link.label}
                  </h3>
                  <p className="mt-1 text-sm text-ink/70">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent games & news */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-crimson">
              2026 Schedule Preview
            </h2>
            <div className="mt-4 space-y-3">
              {upcomingGames.map((game) => (
                <ScheduleCard key={game.date + game.opponent} game={game} />
              ))}
            </div>
            <Link
              href="/schedule"
              className="mt-4 inline-block text-sm font-semibold text-crimson underline"
            >
              Full 2026 & 2025 schedule →
            </Link>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-crimson">
              Latest News
            </h2>
            <div className="mt-4 space-y-4">
              {latestNews.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border-2 border-crimson/15 bg-white p-4 shadow-sm"
                >
                  <time className="text-xs text-ink/60">{item.date}</time>
                  <h3 className="mt-1 font-display font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink/75">{item.summary}</p>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs font-medium text-crimson underline"
                  >
                    Source: {item.source}
                  </a>
                </article>
              ))}
            </div>
            <Link
              href="/news"
              className="mt-4 inline-block text-sm font-semibold text-crimson underline"
            >
              All news →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
