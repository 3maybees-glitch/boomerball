import type { Metadata } from "next";
import { AdvancedStatsGuide } from "@/components/AdvancedStatsGuide";
import { PremiumGate } from "@/components/PremiumGate";
import { PageShell } from "@/components/PageShell";
import { JsonLd } from "@/components/JsonLd";
import { RecruitingBreakdown } from "@/components/RecruitingBreakdown";
import { SchemeGuide } from "@/components/SchemeGuide";
import { SourceAttribution } from "@/components/SourceAttribution";
import { WesternDivider } from "@/components/WesternDivider";
import { recruitingClass2027 } from "@/data/recruiting-2027";
import { computeAdvancedStats } from "@/lib/advanced-metrics";
import {
  PREMIUM_PRICE_DISPLAY,
  PREMIUM_TIER_NAME,
  PREMIUM_TIER_TAGLINE,
} from "@/lib/premium";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const PAGE_TITLE = PREMIUM_TIER_NAME;
const PAGE_DESCRIPTION = `${PREMIUM_TIER_TAGLINE}. SP+, PFF-style grades, schemes, and recruiting intel for Oklahoma Sooners football.`;

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/locker-room",
  keywords: [
    "Oklahoma Sooners SP+",
    "OU advanced football stats",
    "Sooners PFF grades",
    "Oklahoma football analytics premium",
  ],
});

const categoryLabels: Record<string, string> = {
  offense: "Offense",
  defense: "Defense",
  efficiency: "Efficiency",
  special: "Special Teams",
};

export default function LockerRoomPage() {
  const { spPlusOffense, spPlusDefense, spPlusOverall, metrics, playerGrades } =
    computeAdvancedStats();
  const categories = ["offense", "defense", "efficiency", "special"] as const;

  const content = (
    <div>
      <AdvancedStatsGuide />

      <div className="mb-8 grid grid-cols-3 gap-3">
        <div className="rounded-xl border-2 border-crimson/20 bg-white p-4 text-center">
          <p className="text-xs font-semibold uppercase text-ink/60">SP+ Offense</p>
          <p className="font-display text-3xl font-bold text-crimson">
            {spPlusOffense > 0 ? `+${spPlusOffense}` : spPlusOffense}
          </p>
        </div>
        <div className="rounded-xl border-2 border-crimson/20 bg-white p-4 text-center">
          <p className="text-xs font-semibold uppercase text-ink/60">SP+ Defense</p>
          <p className="font-display text-3xl font-bold text-crimson">
            {spPlusDefense > 0 ? `+${spPlusDefense}` : spPlusDefense}
          </p>
        </div>
        <div className="rounded-xl border-2 border-crimson bg-crimson p-4 text-center text-cream">
          <p className="text-xs font-semibold uppercase text-cream/80">SP+ Overall</p>
          <p className="font-display text-3xl font-bold">
            {spPlusOverall > 0 ? `+${spPlusOverall}` : spPlusOverall}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((cat) => (
          <div key={cat} className="rounded-xl border-2 border-crimson/15 bg-white p-5">
            <h3 className="font-display text-lg font-bold text-crimson">
              {categoryLabels[cat]}
            </h3>
            <ul className="mt-4 space-y-4">
              {metrics
                .filter((m) => m.category === cat)
                .map((metric) => (
                  <li
                    key={metric.label}
                    className="border-b border-cream-dark pb-3 last:border-0"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-semibold text-ink">{metric.label}</span>
                      <span className="font-display text-xl font-bold text-crimson">
                        {metric.value}
                      </span>
                    </div>
                    {metric.rank && (
                      <span className="text-xs font-medium text-green-700">
                        {metric.rank}
                      </span>
                    )}
                    <p className="mt-1 text-sm text-ink/65">{metric.description}</p>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border-2 border-crimson/15 bg-white p-5">
        <h3 className="font-display text-lg font-bold text-crimson">
          PFF-Style Player Grades (2025)
        </h3>
        <p className="mt-1 text-sm text-ink/60">
          0–100 scale estimates derived from production data. Not official PFF grades.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[400px] text-sm">
            <thead>
              <tr className="border-b border-cream-dark text-left text-xs font-semibold uppercase text-crimson">
                <th className="py-2 pr-4">Player</th>
                <th className="py-2 pr-4">Pos</th>
                <th className="py-2 pr-4 text-right">Grade</th>
                <th className="hidden py-2 sm:table-cell">Note</th>
              </tr>
            </thead>
            <tbody>
              {playerGrades.map((pg) => (
                <tr key={pg.player} className="border-b border-cream-dark/60">
                  <td className="py-2.5 font-medium">{pg.player}</td>
                  <td className="py-2.5 text-ink/70">{pg.position}</td>
                  <td className="py-2.5 text-right">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 font-bold ${
                        pg.grade >= 80
                          ? "bg-green-100 text-green-800"
                          : pg.grade >= 70
                            ? "bg-amber-100 text-amber-800"
                            : "bg-cream-dark text-ink"
                      }`}
                    >
                      {pg.grade.toFixed(1)}
                    </span>
                  </td>
                  <td className="hidden py-2.5 text-ink/65 sm:table-cell">{pg.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SchemeGuide />

      <RecruitingBreakdown recruitingClass={recruitingClass2027} />

      <SourceAttribution
        className="mt-8"
        sources={[
          {
            label: "soonersports.com (base data)",
            url: "https://soonersports.com/sports/football/stats/2025",
          },
        ]}
      />

      <p className="mt-4 text-xs text-ink/50">
        SP+ and PFF-style metrics are fan analytics estimates computed from official
        OU cumulative statistics. Not affiliated with ESPN SP+ or Pro Football Focus.
        Updated weekly during active seasons.
      </p>
    </div>
  );

  return (
    <PageShell theme="advanced">
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/locker-room",
            title: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE, path: "/locker-room" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-crimson/70">
              Premium · Members Only
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold text-crimson sm:text-4xl">
              {PREMIUM_TIER_NAME}
            </h1>
            <p className="mt-2 max-w-2xl text-ink/70">
              {PREMIUM_TIER_TAGLINE}. SP+-inspired efficiency ratings, PFF-style player
              grades, OU scheme & formation guides, 2027 recruiting breakdowns, and more.
              One-time {PREMIUM_PRICE_DISPLAY} for lifetime access.
            </p>
          </div>
          <span className="rounded-full bg-crimson px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cream">
            {PREMIUM_TIER_NAME}
          </span>
        </div>

        <WesternDivider />

        <p className="mb-6 text-sm text-ink/60">
          Based on 2025 season cumulative data. Metrics recalculate when weekly stats
          update during the season.
        </p>

        <PremiumGate>{content}</PremiumGate>
      </div>
    </PageShell>
  );
}
