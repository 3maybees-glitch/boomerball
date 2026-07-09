import type { Metadata } from "next";
import { AdvancedStatsGuide } from "@/components/AdvancedStatsGuide";
import { PremiumGate } from "@/components/PremiumGate";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { PageContent } from "@/components/PageContent";
import { EditorialSection } from "@/components/EditorialSection";
import { JsonLd } from "@/components/JsonLd";
import { RecruitingBreakdown } from "@/components/RecruitingBreakdown";
import { SchemeGuide } from "@/components/SchemeGuide";
import { SourceAttribution } from "@/components/SourceAttribution";
import { recruitingClass2027 } from "@/data/recruiting-2027";
import { computeAdvancedStats } from "@/lib/advanced-metrics";
import { LOCKER_ROOM_TAGLINE } from "@/data/locker-room-features";
import { PREMIUM_PRICE_DISPLAY, PREMIUM_TIER_NAME } from "@/lib/premium";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const PAGE_TITLE = PREMIUM_TIER_NAME;
const PAGE_DESCRIPTION = `${LOCKER_ROOM_TAGLINE} NFL Comp Machine, The Game-u-lator, SP+ dashboards, PFF-style grades, schemes, and 2027 recruiting intel.`;

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
        <div className="rounded-xl border border-crimson/12 bg-white/95 p-4 text-center shadow-[0_4px_20px_rgba(26,10,10,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">SP+ Offense</p>
          <p className="mt-1 font-display text-3xl font-bold tabular-nums text-crimson">
            {spPlusOffense > 0 ? `+${spPlusOffense}` : spPlusOffense}
          </p>
        </div>
        <div className="rounded-xl border border-crimson/12 bg-white/95 p-4 text-center shadow-[0_4px_20px_rgba(26,10,10,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">SP+ Defense</p>
          <p className="mt-1 font-display text-3xl font-bold tabular-nums text-crimson">
            {spPlusDefense > 0 ? `+${spPlusDefense}` : spPlusDefense}
          </p>
        </div>
        <div className="rounded-xl border border-crimson/30 bg-crimson p-4 text-center text-cream shadow-[0_8px_24px_rgba(132,22,23,0.22)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-cream/80">SP+ Overall</p>
          <p className="mt-1 font-display text-3xl font-bold tabular-nums">
            {spPlusOverall > 0 ? `+${spPlusOverall}` : spPlusOverall}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((cat) => (
          <div
            key={cat}
            className="rounded-2xl border border-crimson/12 bg-white/95 p-5 shadow-[0_4px_20px_rgba(26,10,10,0.06)]"
          >
            <h3 className="font-display text-lg font-bold text-crimson">
              {categoryLabels[cat]}
            </h3>
            <ul className="mt-4 space-y-4">
              {metrics
                .filter((m) => m.category === cat)
                .map((metric) => (
                  <li key={metric.label} className="border-b border-cream-dark/80 pb-3 last:border-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-semibold text-ink">{metric.label}</span>
                      <span className="font-display text-xl font-bold tabular-nums text-crimson">
                        {metric.value}
                      </span>
                    </div>
                    {metric.rank && (
                      <span className="text-xs font-medium text-green-700">
                        {metric.rank}
                      </span>
                    )}
                    <p className="mt-1 text-sm leading-relaxed text-ink/65">
                      {metric.description}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-crimson/12 bg-white/95 p-5 shadow-[0_4px_20px_rgba(26,10,10,0.06)]">
        <h3 className="font-display text-lg font-bold text-crimson">
          PFF-style player grades (2025)
        </h3>
        <p className="mt-1 text-sm text-ink/60">
          0–100 scale estimates derived from production data. Not official PFF grades.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[400px] text-sm">
            <thead>
              <tr className="border-b border-cream-dark text-left text-xs font-semibold uppercase tracking-wide text-crimson">
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
                      className={`inline-block rounded-full px-2.5 py-0.5 font-bold tabular-nums ${
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

      <p className="mt-4 text-xs leading-relaxed text-ink/50">
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
      <PageHeader
        theme="advanced"
        title={PREMIUM_TIER_NAME}
        description={`${LOCKER_ROOM_TAGLINE} Includes NFL Comp Machine, The Game-u-lator, SP+-inspired ratings, PFF-style player grades, scheme guides, and 2027 recruiting breakdowns. One-time ${PREMIUM_PRICE_DISPLAY} for lifetime access.`}
      >
        <span className="inline-flex rounded-full bg-cream px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-crimson">
          Premium · Members only
        </span>
      </PageHeader>

      <PageContent>
        <p className="mb-8 text-sm text-ink/60">
          Based on 2025 season cumulative data. Metrics recalculate when weekly stats
          update during the season.
        </p>

        <PremiumGate>{content}</PremiumGate>
      </PageContent>
    </PageShell>
  );
}
