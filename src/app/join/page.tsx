import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Shield, Trophy, Users } from "lucide-react";
import { JoinHero } from "@/components/JoinHero";
import { JoinPerksBento } from "@/components/JoinPerksBento";
import { LockerRoomCTA } from "@/components/LockerRoomCTA";
import { PageShell } from "@/components/PageShell";
import { PageContent } from "@/components/PageContent";
import { EditorialSection } from "@/components/EditorialSection";
import { JsonLd } from "@/components/JsonLd";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { recruitingClass2027 } from "@/data/recruiting-2027";
import { offensivePhilosophy } from "@/data/schemes";
import { computeAdvancedStats } from "@/lib/advanced-metrics";
import {
  PREMIUM_PRICE_DISPLAY,
  PREMIUM_ROUTE,
  PREMIUM_TIER_NAME,
} from "@/lib/premium";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const PAGE_TITLE = `Join ${PREMIUM_TIER_NAME}`;
const PAGE_DESCRIPTION = `We're recruiting die-hard Sooners fans. Preview SP+ analytics, PFF-style grades, scheme intel, and 2027 recruiting — ${PREMIUM_PRICE_DISPLAY} lifetime access.`;

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/join",
  keywords: [
    "Oklahoma Sooners premium analytics",
    "Sooners SP+ stats",
    "Boomer Ball Locker Room",
    "OU football advanced metrics",
  ],
});

const perks = [
  {
    icon: "analytics" as const,
    title: "Advanced analytics",
    desc: "SP+-inspired ratings, EPA/play, havoc rate, and success rate. The numbers coaches watch.",
  },
  {
    icon: "grades" as const,
    title: "Player grades",
    desc: "PFF-style 0–100 grades for every key Sooner, with plain-English breakdowns.",
  },
  {
    icon: "scheme" as const,
    title: "Scheme intel",
    desc: "Formation guides, personnel packages, and chess-match breakdowns for Arbuckle and Venables.",
  },
  {
    icon: "recruiting" as const,
    title: "Recruiting board",
    desc: "Cross-service 2027 class rankings, commit board, and blue-chip tracking.",
  },
  {
    icon: "updates" as const,
    title: "Weekly updates",
    desc: "Metrics recalculate every week during the season. Your intel stays current.",
  },
  {
    icon: "lifetime" as const,
    title: "Lifetime access",
    desc: "One payment, no subscription. Your locker stays open forever.",
  },
];

export default function JoinPage() {
  const { spPlusOffense, spPlusDefense, spPlusOverall, metrics, playerGrades } =
    computeAdvancedStats();
  const topGrades = [...playerGrades].sort((a, b) => b.grade - a.grade).slice(0, 4);
  const highlightMetrics = metrics.filter((m) =>
    ["EPA/Play (Offense)", "Havoc Rate", "Pressure Rate", "Success Rate"].includes(m.label),
  );
  const topCommits = recruitingClass2027.commits
    .filter((c) => c.on3?.stars === 5)
    .slice(0, 4);

  return (
    <PageShell theme="advanced">
      <JsonLd
        data={[
          webPageJsonLd({ path: "/join", title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE, path: "/join" },
          ]),
        ]}
      />
      <JoinHero />

      <section className="border-y border-crimson/10 bg-cream/35 py-14 sm:py-16">
        <PageContent className="py-0">
          <EditorialSection
            title="What you get as a member"
            description={`Full access to every tool inside ${PREMIUM_TIER_NAME}.`}
            divider={false}
          >
            <JoinPerksBento perks={perks} />
          </EditorialSection>
        </PageContent>
      </section>

      <PageContent>
        <EditorialSection
          title="Scouting report preview"
          description="Real numbers from our 2025 analytics engine. Join to unlock the full dashboard, guides, and weekly updates."
          divider={false}
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <PreviewCard title="SP+ efficiency ratings" badge="Analytics">
              <div className="grid grid-cols-3 gap-2">
                <StatTeaser label="SP+ Offense" value={spPlusOffense} />
                <StatTeaser label="SP+ Defense" value={spPlusDefense} />
                <div className="rounded-lg bg-crimson p-3 text-center text-cream">
                  <p className="text-[10px] font-semibold uppercase text-cream/80">
                    SP+ Overall
                  </p>
                  <p className="font-display text-2xl font-bold tabular-nums">
                    {spPlusOverall > 0 ? `+${spPlusOverall}` : spPlusOverall}
                  </p>
                </div>
              </div>
              <LockedRow count={4} label="more efficiency metrics inside" />
            </PreviewCard>

            <PreviewCard title="Advanced metrics" badge="Film room">
              <ul className="space-y-3">
                {highlightMetrics.map((m) => (
                  <li
                    key={m.label}
                    className="flex items-baseline justify-between border-b border-cream-dark/80 pb-2 last:border-0"
                  >
                    <span className="text-sm font-medium text-ink">{m.label}</span>
                    <div className="text-right">
                      <span className="font-display text-lg font-bold tabular-nums text-crimson">
                        {m.value}
                      </span>
                      {m.rank && (
                        <span className="ml-2 text-xs text-green-700">{m.rank}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <LockedRow count={8} label="more metrics inside" />
            </PreviewCard>

            <PreviewCard title="PFF-style player grades" badge="Roster intel">
              <div className="space-y-2">
                {topGrades.map((pg) => (
                  <div
                    key={pg.player}
                    className="flex items-center justify-between rounded-lg bg-cream/50 px-3 py-2"
                  >
                    <div>
                      <span className="font-medium text-ink">{pg.player}</span>
                      <span className="ml-2 text-xs text-ink/60">{pg.position}</span>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-sm font-bold tabular-nums ${
                        pg.grade >= 80
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {pg.grade.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
              <LockedRow count={4} label="more player grades inside" />
            </PreviewCard>

            <PreviewCard title="2027 recruiting class" badge="War room">
              <div className="mb-4 grid grid-cols-3 gap-2 text-center">
                <RankBadge
                  service="On3"
                  rank={recruitingClass2027.on3.nationalRank}
                  label={`${recruitingClass2027.on3.commits} commits`}
                />
                <RankBadge
                  service="247"
                  rank={recruitingClass2027.twoFourSeven.nationalRank}
                  label={`${recruitingClass2027.twoFourSeven.blueChips} blue chips`}
                />
                <RankBadge
                  service="ESPN"
                  rank={recruitingClass2027.espn.nationalRank}
                  label={`${recruitingClass2027.espn.commits} commits`}
                />
              </div>
              <div className="space-y-2">
                {topCommits.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="font-medium">{c.name}</span>
                    <span className="text-ink/60">
                      {c.position} · {c.on3?.stars}★
                    </span>
                  </div>
                ))}
              </div>
              <LockedRow count={21} label="commits on the full board" />
            </PreviewCard>
          </div>

          <div className="mt-6">
            <PreviewCard title="Scheme & formation guides" badge="Playbook">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase text-crimson/70">Offense</p>
                  <p className="mt-1 font-display font-bold text-ink">
                    {offensivePhilosophy.coordinator} — {offensivePhilosophy.scheme}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    {offensivePhilosophy.summary}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-crimson/70">
                    What&apos;s inside
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-ink/75">
                    <li>Personnel groupings (11, 12, 10) with usage rates</li>
                    <li>Formation diagrams with player alignments</li>
                    <li>The &ldquo;Cheetah&rdquo; hybrid role breakdown</li>
                    <li>Defensive packages and game-day chess matches</li>
                  </ul>
                </div>
              </div>
              <LockedRow count={6} label="formations and packages inside" />
            </PreviewCard>
          </div>
        </EditorialSection>
      </PageContent>

      <section className="border-t border-crimson-dark/30 bg-crimson py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <MotionReveal>
            <Trophy className="mx-auto h-10 w-10 text-cream/80" aria-hidden />
            <h2 className="mt-4 font-display text-3xl font-bold text-cream sm:text-4xl">
              Your offer is on the table
            </h2>
            <p className="mt-4 text-lg text-cream/90">
              One-time {PREMIUM_PRICE_DISPLAY} for lifetime access to {PREMIUM_TIER_NAME}.
              No recurring charges. Just the analytics die-hards deserve.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <LockerRoomCTA label="Join The Team" variant="featured" onDark />
              <Link
                href={PREMIUM_ROUTE}
                className="text-sm text-cream/70 underline decoration-cream/30 underline-offset-4 transition hover:text-cream"
              >
                Already a member? Enter {PREMIUM_TIER_NAME}
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-cream/60">
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" aria-hidden />
                Built for Sooner Nation
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" aria-hidden />
                Secure Stripe checkout
              </span>
              <span>Not affiliated with the University of Oklahoma</span>
            </div>
          </MotionReveal>
        </div>
      </section>
    </PageShell>
  );
}

function PreviewCard({
  title,
  badge,
  children,
}: {
  title: string;
  badge: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-crimson/12 bg-white/95 p-5 shadow-[0_4px_20px_rgba(26,10,10,0.06)]">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-lg font-bold text-crimson">{title}</h3>
        <span className="shrink-0 rounded-full bg-crimson/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-crimson">
          {badge}
        </span>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function StatTeaser({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-crimson/12 p-3 text-center">
      <p className="text-[10px] font-semibold uppercase text-ink/60">{label}</p>
      <p className="font-display text-2xl font-bold tabular-nums text-crimson">
        {value > 0 ? `+${value}` : value}
      </p>
    </div>
  );
}

function RankBadge({
  service,
  rank,
  label,
}: {
  service: string;
  rank: number;
  label: string;
}) {
  return (
    <div className="rounded-lg border border-crimson/12 px-2 py-3">
      <p className="text-[10px] font-bold uppercase text-crimson/70">{service}</p>
      <p className="font-display text-2xl font-bold tabular-nums text-crimson">#{rank}</p>
      <p className="text-[10px] text-ink/60">{label}</p>
    </div>
  );
}

function LockedRow({ count, label }: { count: number; label: string }) {
  return (
    <div className="mt-4 flex items-center gap-2 rounded-lg border border-dashed border-crimson/25 bg-cream/40 px-3 py-2 text-xs text-ink/60">
      <Lock className="h-3.5 w-3.5 shrink-0 text-crimson/60" aria-hidden />
      <span>
        +{count} {label}
      </span>
    </div>
  );
}
