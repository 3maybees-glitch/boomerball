import type { Metadata } from "next";
import { GameulatorSim } from "@/components/GameulatorSim";
import { JsonLd } from "@/components/JsonLd";
import { PageContent } from "@/components/PageContent";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { PremiumGate } from "@/components/PremiumGate";
import { schedule2026 } from "@/data/schedule-2026";
import {
  PREMIUM_PRICE_DISPLAY,
  PREMIUM_TIER_NAME,
} from "@/lib/premium";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const PAGE_TITLE = "The Game-u-lator";
const PAGE_DESCRIPTION =
  "Simulate Oklahoma vs. every 2026 opponent. Grade all 13 units — QB through coaching — for both teams, then get three predicted scores, a consensus, win probability, and estimated player stat lines.";

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/gameulator",
  keywords: [
    "Oklahoma Sooners game simulator",
    "OU vs Texas prediction 2026",
    "college football score predictor",
    "Sooners schedule predictions",
    "Oklahoma football simulation",
  ],
});

export default function GameulatorPage() {
  return (
    <PageShell theme="advanced">
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/gameulator",
            title: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE, path: "/gameulator" },
          ]),
        ]}
      />
      <PageHeader
        theme="advanced"
        title={PAGE_TITLE}
        description={`Boomer Ball's matchup machine — pick any 2026 opponent, tune 13 unit grades per team (or one overall grade), and simulate the game. Three score predictions, a consensus call, win probability, and full estimated box scores. Part of ${PREMIUM_TIER_NAME} (${PREMIUM_PRICE_DISPLAY} lifetime).`}
      >
        <span className="inline-flex rounded-full bg-cream px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-crimson">
          Premium · Members only
        </span>
      </PageHeader>

      <PageContent>
        <p className="mb-8 max-w-[68ch] text-sm leading-relaxed text-ink/60">
          Default grades are Boomer Ball scouting estimates built from roster
          talent, returning production, and 2026 opponent strength tiers — every
          slider is yours to override. The engine converts unit grades into
          offense, defense, and special-teams ratings, adds venue edge, then runs
          the matchup through 1,200 Monte Carlo simulations.
        </p>

        <PremiumGate>
          <GameulatorSim schedule={schedule2026} />
        </PremiumGate>

        <p className="mt-8 text-xs leading-relaxed text-ink/50">
          The Game-u-lator is fan entertainment, not a betting tool. Grades,
          simulated scores, and player stat lines are Boomer Ball estimates —
          opponent lineups use projected or placeholder starters. Not affiliated
          with the University of Oklahoma or any opponent institution.
        </p>
      </PageContent>
    </PageShell>
  );
}
