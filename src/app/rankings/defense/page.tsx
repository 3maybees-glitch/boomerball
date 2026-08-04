import type { Metadata } from "next";
import { BbPlusRankingsBoard } from "@/components/BbPlusRankingsBoard";
import { BbPlusRankingsNav } from "@/components/BbPlusRankingsNav";
import { JsonLd } from "@/components/JsonLd";
import { PageContent } from "@/components/PageContent";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { PremiumGate } from "@/components/PremiumGate";
import { BB_PLUS_TITLE } from "@/data/bb-plus-rankings";
import {
  PREMIUM_ACCESS_LABEL,
  PREMIUM_PRICE_DISPLAY,
  PREMIUM_TIER_NAME,
} from "@/lib/premium";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const PAGE_TITLE = `${BB_PLUS_TITLE} — Defense Top 12`;
const PAGE_DESCRIPTION =
  "BB+ Defense Top 12 — Boomer Ball’s proprietary defensive efficiency ranking from havoc, pressure, points allowed, and third-down stops. Locker Room exclusive.";

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/rankings/defense",
  keywords: [
    "BB+ defense rankings",
    "college football defense rankings",
    "havoc rate rankings",
    "Boomer Ball Locker Room",
  ],
});

export default function RankingsDefensePage() {
  return (
    <PageShell theme="advanced">
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/rankings/defense",
            title: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "BB+ Rankings", path: "/rankings" },
            { name: "Defense", path: "/rankings/defense" },
          ]),
        ]}
      />
      <PageHeader
        theme="advanced"
        title="BB+ Defense"
        description={`Top 12 defenses graded on havoc, pressure, points allowed, yards per play allowed, and red-zone stands. Part of ${PREMIUM_TIER_NAME} (${PREMIUM_PRICE_DISPLAY} ${PREMIUM_ACCESS_LABEL}).`}
      >
        <span className="inline-flex rounded-full bg-cream px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-crimson">
          Locker Room · Members only
        </span>
      </PageHeader>

      <PageContent>
        <BbPlusRankingsNav active="defense" />
        <PremiumGate>
          <BbPlusRankingsBoard kind="defense" showNav={false} />
        </PremiumGate>
      </PageContent>
    </PageShell>
  );
}
