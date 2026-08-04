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

const PAGE_TITLE = `${BB_PLUS_TITLE} — Offense Top 12`;
const PAGE_DESCRIPTION =
  "BB+ Offense Top 12 — Boomer Ball’s proprietary offensive efficiency ranking from EPA/play, success rate, explosives, and scoring metrics. Locker Room exclusive.";

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/rankings/offense",
  keywords: [
    "BB+ offense rankings",
    "college football offense rankings",
    "EPA rankings",
    "Boomer Ball Locker Room",
  ],
});

export default function RankingsOffensePage() {
  return (
    <PageShell theme="advanced">
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/rankings/offense",
            title: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "BB+ Rankings", path: "/rankings" },
            { name: "Offense", path: "/rankings/offense" },
          ]),
        ]}
      />
      <PageHeader
        theme="advanced"
        title="BB+ Offense"
        description={`Top 12 offenses graded on EPA/play, success rate, explosives, scoring pace, and red-zone finishing. Part of ${PREMIUM_TIER_NAME} (${PREMIUM_PRICE_DISPLAY} ${PREMIUM_ACCESS_LABEL}).`}
      >
        <span className="inline-flex rounded-full bg-cream px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-crimson">
          Locker Room · Members only
        </span>
      </PageHeader>

      <PageContent>
        <BbPlusRankingsNav active="offense" />
        <PremiumGate>
          <BbPlusRankingsBoard kind="offense" showNav={false} />
        </PremiumGate>
      </PageContent>
    </PageShell>
  );
}
