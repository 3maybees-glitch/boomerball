import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  ClipboardList,
  HatGlasses,
  Lock,
  Shield,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { LockerRoomCTA } from "@/components/LockerRoomCTA";
import { PageShell } from "@/components/PageShell";
import { WesternDivider } from "@/components/WesternDivider";
import { recruitingClass2027 } from "@/data/recruiting-2027";
import { offensivePhilosophy } from "@/data/schemes";
import { computeAdvancedStats } from "@/lib/advanced-metrics";
import {
  PREMIUM_PRICE_DISPLAY,
  PREMIUM_ROUTE,
  PREMIUM_TIER_NAME,
  PREMIUM_TIER_TAGLINE,
} from "@/lib/premium";

export const metadata: Metadata = {
  title: `Join ${PREMIUM_TIER_NAME} — Boomer Ball`,
  description: `We're recruiting die-hard Sooners fans. Preview SP+ analytics, PFF-style grades, scheme intel, and 2027 recruiting — ${PREMIUM_PRICE_DISPLAY} lifetime access.`,
};

const perks = [
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    desc: "SP+-inspired ratings, EPA/play, havoc rate, and success rate — the numbers coaches watch.",
  },
  {
    icon: Star,
    title: "Player Grades",
    desc: "PFF-style 0–100 grades for every key Sooner, with plain-English breakdowns.",
  },
  {
    icon: Target,
    title: "Scheme Intel",
    desc: "Formation guides, personnel packages, and chess-match breakdowns for Arbuckle & Venables.",
  },
  {
    icon: ClipboardList,
    title: "Recruiting Board",
    desc: "Cross-service 2027 class rankings, commit board, and blue-chip tracking.",
  },
  {
    icon: Zap,
    title: "Weekly Updates",
    desc: "Metrics recalculate every week during the season — your intel stays current.",
  },
  {
    icon: Shield,
    title: "Lifetime Access",
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
      {/* Hero — recruitment letter style */}
      <section className="relative overflow-hidden border-b-4 border-crimson-dark bg-crimson">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-8 border-cream" />
          <div className="absolute -bottom-8 left-1/4 h-32 w-32 rounded-full border-4 border-cream" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex items-center gap-3 text-cream/80">
            <HatGlasses className="h-6 w-6" aria-hidden />
            <span className="text-sm font-semibold uppercase tracking-[0.25em]">
              Now Recruiting
            </span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-cream sm:text-5xl lg:text-6xl">
            Join The Locker Room
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-cream/90">
            We&apos;re building an inner circle of die-hard Sooners fans who want more than
            box scores. If you live for film breakdowns, recruiting intel, and advanced
            metrics — we want you on our team.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-cream px-4 py-2 text-sm font-bold text-crimson">
              {PREMIUM_PRICE_DISPLAY} · Lifetime Access
            </span>
            <span className="rounded-full border border-cream/40 px-4 py-2 text-sm text-cream/90">
              No subscription · No monthly fees
            </span>
          </div>
          <div className="mt-8">
            <LockerRoomCTA label="Accept Your Offer" className="items-start" />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border-2 border-crimson/20 bg-white p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-crimson/70">
            Letter from the Staff
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-crimson sm:text-3xl">
            You&apos;ve Watched the Games. Now See What the Coaches See.
          </h2>
          <div className="mt-4 space-y-4 text-ink/80">
            <p>
              {PREMIUM_TIER_TAGLINE}. {PREMIUM_TIER_NAME} is where Boomer Ball goes
              deep — SP+-inspired efficiency ratings, PFF-style player grades, full scheme
              breakdowns, and a live 2027 recruiting board pulled from On3, 247Sports, and
              ESPN.
            </p>
            <p>
              We built this for fans who argue about third-down stop rates at tailgates,
              who track every five-star commit, and who want to understand why Venables
              calls a 4-2-5 over trips. If that sounds like you, consider this your
              official offer.
            </p>
          </div>
        </div>
      </section>

      {/* Perks grid */}
      <section className="border-y border-crimson/10 bg-white/60 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-crimson">
            What You Get as a Member
          </h2>
          <p className="mt-1 text-sm text-ink/70">
            Full access to every tool inside {PREMIUM_TIER_NAME}
          </p>
          <WesternDivider />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="rounded-xl border-2 border-crimson/15 bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-crimson/10 text-crimson">
                  <perk.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-3 font-display font-bold text-ink">{perk.title}</h3>
                <p className="mt-1 text-sm text-ink/70">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview sections */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-crimson/70">
            Scouting Report Preview
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-crimson sm:text-3xl">
            A Taste of What&apos;s Inside
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-ink/70">
            These are real numbers from our 2025 analytics engine. Join to unlock the
            full dashboard, guides, and weekly updates.
          </p>
        </div>

        <WesternDivider />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* SP+ preview */}
          <PreviewCard title="SP+ Efficiency Ratings" badge="Analytics">
            <div className="grid grid-cols-3 gap-2">
              <StatTeaser label="SP+ Offense" value={spPlusOffense} />
              <StatTeaser label="SP+ Defense" value={spPlusDefense} />
              <div className="rounded-lg bg-crimson p-3 text-center text-cream">
                <p className="text-[10px] font-semibold uppercase text-cream/80">
                  SP+ Overall
                </p>
                <p className="font-display text-2xl font-bold">
                  {spPlusOverall > 0 ? `+${spPlusOverall}` : spPlusOverall}
                </p>
              </div>
            </div>
            <LockedRow count={4} label="more efficiency metrics inside" />
          </PreviewCard>

          {/* Key metrics preview */}
          <PreviewCard title="Advanced Metrics" badge="Film Room">
            <ul className="space-y-3">
              {highlightMetrics.map((m) => (
                <li
                  key={m.label}
                  className="flex items-baseline justify-between border-b border-cream-dark pb-2 last:border-0"
                >
                  <span className="text-sm font-medium text-ink">{m.label}</span>
                  <div className="text-right">
                    <span className="font-display text-lg font-bold text-crimson">
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

          {/* Player grades preview */}
          <PreviewCard title="PFF-Style Player Grades" badge="Roster Intel">
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
                    className={`rounded-full px-2.5 py-0.5 text-sm font-bold ${
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

          {/* Recruiting preview */}
          <PreviewCard title="2027 Recruiting Class" badge="War Room">
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

        {/* Scheme preview — full width */}
        <div className="mt-6">
          <PreviewCard title="Scheme & Formation Guides" badge="Playbook">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase text-crimson/70">Offense</p>
                <p className="mt-1 font-display font-bold text-ink">
                  {offensivePhilosophy.coordinator} — {offensivePhilosophy.scheme}
                </p>
                <p className="mt-2 text-sm text-ink/70">{offensivePhilosophy.summary}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-crimson/70">
                  What&apos;s Inside
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-ink/75">
                  <li>· Personnel groupings (11, 12, 10) with usage rates</li>
                  <li>· Formation diagrams with player alignments</li>
                  <li>· The &ldquo;Cheetah&rdquo; hybrid role breakdown</li>
                  <li>· Defensive packages & game-day chess matches</li>
                </ul>
              </div>
            </div>
            <LockedRow count={6} label="formations & packages inside" />
          </PreviewCard>
        </div>
      </section>

      {/* Offer / CTA */}
      <section className="border-t-4 border-crimson bg-crimson py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Trophy className="mx-auto h-10 w-10 text-cream/80" aria-hidden />
          <h2 className="mt-4 font-display text-3xl font-bold text-cream sm:text-4xl">
            Your Offer Is on the Table
          </h2>
          <p className="mt-4 text-lg text-cream/90">
            One-time {PREMIUM_PRICE_DISPLAY} for lifetime access to {PREMIUM_TIER_NAME}.
            No recurring charges. No fine print. Just the analytics die-hards deserve.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-3 rounded-full bg-cream/20 blur-md"
                aria-hidden
              />
              <LockerRoomCTA
                label="Join The Team"
                variant="featured"
                onDark
              />
            </div>
            <Link
              href={PREMIUM_ROUTE}
              className="text-sm text-cream/70 underline transition hover:text-cream"
            >
              Already a member? Enter {PREMIUM_TIER_NAME} →
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
    <div className="relative overflow-hidden rounded-xl border-2 border-crimson/15 bg-white p-5 shadow-sm">
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
    <div className="rounded-lg border border-crimson/15 p-3 text-center">
      <p className="text-[10px] font-semibold uppercase text-ink/60">{label}</p>
      <p className="font-display text-2xl font-bold text-crimson">
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
    <div className="rounded-lg border border-crimson/15 px-2 py-3">
      <p className="text-[10px] font-bold uppercase text-crimson/70">{service}</p>
      <p className="font-display text-2xl font-bold text-crimson">#{rank}</p>
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
