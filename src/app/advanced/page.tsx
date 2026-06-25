import type { Metadata } from "next";
import { PremiumGate } from "@/components/PremiumGate";
import { SourceAttribution } from "@/components/SourceAttribution";
import { WesternDivider } from "@/components/WesternDivider";
import { advancedStats2025 } from "@/data/stats";
import { PREMIUM_PRICE_DISPLAY } from "@/lib/premium";

export const metadata: Metadata = {
  title: "Advanced Stats (Premium)",
  description:
    "Premium advanced Oklahoma Sooners football analytics — EPA, success rate, havoc rate, and more.",
};

const categoryLabels: Record<string, string> = {
  offense: "Offense",
  defense: "Defense",
  efficiency: "Efficiency",
  special: "Special Teams",
};

export default function AdvancedPage() {
  const categories = ["offense", "defense", "efficiency", "special"] as const;

  const content = (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((cat) => (
          <div key={cat} className="rounded-xl border-2 border-crimson/15 bg-white p-5">
            <h3 className="font-display text-lg font-bold text-crimson">
              {categoryLabels[cat]}
            </h3>
            <ul className="mt-4 space-y-4">
              {advancedStats2025
                .filter((m) => m.category === cat)
                .map((metric) => (
                  <li key={metric.label} className="border-b border-cream-dark pb-3 last:border-0">
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
        Advanced metrics are derived estimates for fan analytics. Base statistics
        sourced from official OU athletics data. Updated weekly during active seasons.
      </p>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-crimson">
            Advanced Statistics
          </h1>
          <p className="mt-2 max-w-2xl text-ink/70">
            Premium analytics inspired by deep-dive stat sites — EPA, success rate,
            havoc rate, pressure rate, and more. One-time {PREMIUM_PRICE_DISPLAY}{" "}
            purchase for lifetime access.
          </p>
        </div>
        <span className="rounded-full bg-crimson px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cream">
          Premium
        </span>
      </div>

      <WesternDivider />

      <p className="mb-6 text-sm text-ink/60">
        Showing 2025 season advanced metrics. During the offseason, these reflect
        final cumulative estimates from the completed season.
      </p>

      <PremiumGate>{content}</PremiumGate>
    </div>
  );
}
