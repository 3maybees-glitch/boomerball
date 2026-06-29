import Link from "next/link";
import {
  BarChart3,
  Calendar,
  HatGlasses,
  Newspaper,
  Users,
  Trophy,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SiteLogo } from "@/components/SiteLogo";
import { WesternDivider } from "@/components/WesternDivider";
import { TeamStatGrid } from "@/components/StatTable";
import { SourceAttribution } from "@/components/SourceAttribution";
import { ScheduleCard } from "@/components/ScheduleCard";
import { SEASON_RECORD, CONFERENCE_RECORD } from "@/data/schedule";
import { schedule2026 } from "@/data/schedule-2026";
import { roster2026 } from "@/data/roster";
import { teamStats2025, STATS_SOURCE_SOONERS } from "@/data/stats";
import { newsItems } from "@/data/news";
import { PREMIUM_RECRUIT_ROUTE, PREMIUM_ROUTE, PREMIUM_TIER_NAME } from "@/lib/premium";

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
    href: "/legend-land",
    label: "Legend Land",
    desc: "Heisman winners, icons & titles",
    icon: Trophy,
  },
  {
    href: "/news",
    label: "Sooner News",
    desc: "Cited updates from official sources",
    icon: Newspaper,
  },
  {
    href: PREMIUM_RECRUIT_ROUTE,
    label: "Join The Team",
    desc: "Recruitment page — preview Locker Room intel",
    icon: HatGlasses,
  },
  {
    href: PREMIUM_ROUTE,
    label: PREMIUM_TIER_NAME,
    desc: "Premium SP+ analytics & insider grades",
    icon: HatGlasses,
  },
];

export default function HomePage() {
  const upcomingGames = schedule2026.slice(0, 3);
  const latestNews = newsItems.slice(0, 3);

  return (
    <PageShell theme="home">
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b-4 border-crimson-dark bg-crimson">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-8 border-cream lg:right-8 lg:top-1/2 lg:-translate-y-1/2" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full border-4 border-cream" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:py-11">
          <div className="lg:grid lg:grid-cols-[minmax(220px,34%)_1fr] lg:items-center lg:gap-x-10 xl:gap-x-12">
            <div className="flex justify-center lg:justify-start">
              <SiteLogo variant="hero" />
            </div>

            <div className="mt-5 text-center lg:mt-0 lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/80 sm:text-sm">
                Boomer Sooner · Sooners Analytics
              </p>
              <h1 className="sr-only">Boomer Ball — Oklahoma Sooners Football Analytics</h1>
              <p className="mt-2 text-base leading-snug text-cream/90 sm:text-lg lg:max-w-2xl">
                Oklahoma Sooners football analytics — 2026 roster, schedule, 2025 stats,
                cited news, and premium SP+ metrics.
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
                <div className="flex items-center gap-2 rounded-full bg-cream px-4 py-2">
                  <Trophy className="h-4 w-4 text-crimson" aria-hidden />
                  <span className="font-display text-lg font-bold text-crimson">
                    {SEASON_RECORD}
                  </span>
                  <span className="text-xs text-ink/70">{CONFERENCE_RECORD}</span>
                </div>
                <span className="rounded-full border border-cream/40 px-3 py-1.5 text-xs text-cream/90 sm:text-sm">
                  Offseason · 2026 opener vs UTEP, Sep 5
                </span>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                <Link
                  href="/stats"
                  className="rounded-full bg-cream px-5 py-2.5 text-sm font-bold text-crimson transition hover:bg-white"
                >
                  View 2025 Stats
                </Link>
                <Link
                  href={PREMIUM_RECRUIT_ROUTE}
                  className="rounded-full border-2 border-cream px-5 py-2.5 text-sm font-bold text-cream transition hover:bg-crimson-dark"
                >
                  Join {PREMIUM_TIER_NAME}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team snapshot */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-crimson sm:text-2xl">
              2025 Season Snapshot
            </h2>
            <p className="mt-0.5 text-sm text-ink/70">
              Cumulative stats through the CFP first round (13 games)
            </p>
          </div>
          <SourceAttribution
            className="sm:text-right"
            sources={[{ label: "soonersports.com", url: STATS_SOURCE_SOONERS }]}
          />
        </div>
        <WesternDivider className="my-4" />
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
    </PageShell>
  );
}
