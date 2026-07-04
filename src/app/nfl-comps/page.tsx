import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { NflCompExplorer } from "@/components/NflCompExplorer";
import { PageContent } from "@/components/PageContent";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { PremiumGate } from "@/components/PremiumGate";
import { roster2026 } from "@/data/roster";
import { nflComparables } from "@/data/nfl-comparables";
import {
  PREMIUM_PRICE_DISPLAY,
  PREMIUM_TIER_NAME,
} from "@/lib/premium";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const PAGE_TITLE = "NFL Comp Machine";
const PAGE_DESCRIPTION =
  "Which NFL player does each Sooner project to become? Similarity scores out of 100 built from height, weight, 40 time, strength, jumps, combine testing, and estimated talent.";

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/nfl-comps",
  keywords: [
    "Oklahoma Sooners NFL comparisons",
    "John Mateer NFL comp",
    "college football player comparison tool",
    "NFL draft player comps",
    "Sooners NFL projections",
  ],
});

export default function NflCompsPage() {
  const content = <NflCompExplorer roster={roster2026} />;

  return (
    <PageShell theme="advanced">
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/nfl-comps",
            title: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE, path: "/nfl-comps" },
          ]),
        ]}
      />
      <PageHeader
        theme="advanced"
        title={PAGE_TITLE}
        description={`Every Sooner's closest NFL twin — similarity graded out of 100 from size, speed, strength, jumps, combine testing, and talent projection. Includes a scouting tool for any college player in the country. Part of ${PREMIUM_TIER_NAME} (${PREMIUM_PRICE_DISPLAY} lifetime).`}
      >
        <span className="inline-flex rounded-full bg-cream px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-crimson">
          Premium · Members only
        </span>
      </PageHeader>

      <PageContent>
        <p className="mb-8 max-w-[68ch] text-sm leading-relaxed text-ink/60">
          The comp engine normalizes eight attributes against {nflComparables.length}{" "}
          NFL benchmarks at each position — height, weight, 40-yard dash, bench
          strength, vertical and broad jump, 3-cone agility, and estimated talent —
          then ranks the closest matches. College testing numbers are Boomer Ball
          scouting estimates unless noted.
        </p>

        <PremiumGate>{content}</PremiumGate>

        <p className="mt-8 text-xs leading-relaxed text-ink/50">
          NFL measurables blend official combine results, pro-day numbers, and
          estimates for players who skipped drills. Similarity scores are fan
          analytics for entertainment — style comps, not draft guarantees. Not
          affiliated with the NFL or the University of Oklahoma.
        </p>
      </PageContent>
    </PageShell>
  );
}
