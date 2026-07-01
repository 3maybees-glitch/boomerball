import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { HomeHero } from "@/components/HomeHero";
import { ExploreBento } from "@/components/ExploreBento";
import { SeoFaq } from "@/components/SeoFaq";
import { JsonLd } from "@/components/JsonLd";
import { WesternDivider } from "@/components/WesternDivider";
import { TeamStatGrid } from "@/components/StatTable";
import { SourceAttribution } from "@/components/SourceAttribution";
import { ScheduleCard } from "@/components/ScheduleCard";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { roster2026 } from "@/data/roster";
import { schedule2026 } from "@/data/schedule-2026";
import { teamStats2025, STATS_SOURCE_SOONERS } from "@/data/stats";
import { newsItems } from "@/data/news";
import { PREMIUM_RECRUIT_ROUTE, PREMIUM_ROUTE, PREMIUM_TIER_NAME } from "@/lib/premium";
import { seoFaqItems } from "@/data/seo-faq";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  faqPageJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

const quickLinks = [
  {
    href: "/stats",
    label: "Season Stats",
    desc: "Passing, rushing, receiving and defense through 13 games",
    icon: "stats" as const,
    accent: "default" as const,
  },
  {
    href: "/roster",
    label: "Roster & Coaches",
    desc: `${roster2026.length}+ players, bios and staff`,
    icon: "roster" as const,
    accent: "default" as const,
  },
  {
    href: "/schedule",
    label: "Schedule",
    desc: "2026 upcoming and 2025 results",
    icon: "schedule" as const,
    accent: "default" as const,
  },
  {
    href: "/legend-land",
    label: "Legend Land",
    desc: "Heisman winners, icons and titles",
    icon: "legends" as const,
    accent: "default" as const,
  },
  {
    href: "/news",
    label: "Sooner News",
    desc: "Cited updates from official sources",
    icon: "news" as const,
    accent: "default" as const,
  },
  {
    href: PREMIUM_RECRUIT_ROUTE,
    label: "Join The Team",
    desc: "Recruitment page with Locker Room preview",
    icon: "join" as const,
    accent: "crimson" as const,
  },
  {
    href: PREMIUM_ROUTE,
    label: PREMIUM_TIER_NAME,
    desc: "Premium SP+ analytics and insider grades",
    icon: "locker" as const,
    accent: "dark" as const,
  },
];

export default function HomePage() {
  const upcomingGames = schedule2026.slice(0, 3);
  const latestNews = newsItems.slice(0, 3);

  return (
    <PageShell theme="home">
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/",
            title: `${SITE_NAME} — ${SITE_TAGLINE}`,
            description: DEFAULT_DESCRIPTION,
          }),
          faqPageJsonLd(seoFaqItems),
        ]}
      />
      <div>
        <HomeHero />

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <MotionReveal>
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-crimson sm:text-4xl">
                2025 season snapshot
              </h2>
              <p className="mt-3 max-w-[55ch] text-base leading-relaxed text-ink/70">
                Cumulative stats through the CFP first round. Updated for
                offseason review until weekly 2026 reporting begins.
              </p>
            </div>
            <SourceAttribution
              className="mt-4"
              sources={[{ label: "soonersports.com", url: STATS_SOURCE_SOONERS }]}
            />
          </MotionReveal>
          <WesternDivider className="my-6" />
          <MotionReveal delay={0.08}>
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
          </MotionReveal>
        </section>

        <section className="border-y border-crimson/10 bg-cream/40 py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <MotionReveal>
              <h2 className="font-display text-3xl font-bold tracking-tight text-crimson">
                Explore the site
              </h2>
              <p className="mt-3 max-w-[48ch] text-base text-ink/70">
                Roster intel, schedules, legends, news, and premium analytics in
                one fan-built hub.
              </p>
            </MotionReveal>
            <div className="mt-8">
              <ExploreBento links={quickLinks} />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <MotionReveal>
              <h2 className="font-display text-2xl font-bold tracking-tight text-crimson sm:text-3xl">
                2026 schedule preview
              </h2>
              <div className="mt-5 space-y-3">
                {upcomingGames.map((game) => (
                  <ScheduleCard key={game.date + game.opponent} game={game} />
                ))}
              </div>
              <Link
                href="/schedule"
                className="mt-5 inline-flex text-sm font-semibold text-crimson underline decoration-crimson/30 underline-offset-4 transition hover:decoration-crimson"
              >
                Full 2026 and 2025 schedule
              </Link>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h2 className="font-display text-2xl font-bold tracking-tight text-crimson sm:text-3xl">
                Latest news
              </h2>
              <div className="mt-5 space-y-4">
                {latestNews.map((item) => (
                  <article
                    key={item.id}
                    className="group border-l-2 border-crimson/25 bg-white/80 py-4 pl-5 pr-4 transition hover:border-crimson hover:bg-white"
                  >
                    <time className="text-xs font-medium uppercase tracking-wide text-ink/50">
                      {item.date}
                    </time>
                    <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-ink group-hover:text-crimson">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-[55ch] text-sm leading-relaxed text-ink/70">
                      {item.summary}
                    </p>
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-xs font-semibold text-crimson underline decoration-crimson/25 underline-offset-2"
                    >
                      Source: {item.source}
                    </a>
                  </article>
                ))}
              </div>
              <Link
                href="/news"
                className="mt-5 inline-flex text-sm font-semibold text-crimson underline decoration-crimson/30 underline-offset-4 transition hover:decoration-crimson"
              >
                All news
              </Link>
            </MotionReveal>
          </div>
        </section>

        <SeoFaq items={seoFaqItems} />
      </div>
    </PageShell>
  );
}
