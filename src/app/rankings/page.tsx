import type { Metadata } from "next";
import { BbPlusRankingsBoard } from "@/components/BbPlusRankingsBoard";
import { JsonLd } from "@/components/JsonLd";
import { PageContent } from "@/components/PageContent";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import {
  BB_PLUS_EDITION,
  BB_PLUS_TITLE,
} from "@/data/bb-plus-rankings";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const PAGE_TITLE = `${BB_PLUS_TITLE} — Combined Top 12`;
const PAGE_DESCRIPTION =
  "Boomer Ball’s BB+ Combined Top 12 — a proprietary college football ranking built from advanced offense and defense efficiency stats across all conferences. 2026 press edition.";

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/rankings",
  keywords: [
    "BB+ rankings",
    "Boomer Ball rankings",
    "college football rankings",
    "Oklahoma Sooners rankings",
    "advanced team rankings",
    "2026 CFB rankings",
  ],
});

export default function RankingsPage() {
  return (
    <PageShell theme="stats">
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/rankings",
            title: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "BB+ Rankings", path: "/rankings" },
          ]),
        ]}
      />
      <PageHeader
        theme="stats"
        title={BB_PLUS_TITLE}
        description={`Our own Top 12 for the press and the rest of the ${BB_PLUS_EDITION.replace(" Press", "")} regular season — combined board is free; offense and defense boards live in The Locker Room.`}
      >
        <span className="inline-flex rounded-full bg-cream px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-crimson">
          Combined board · Public
        </span>
      </PageHeader>

      <PageContent>
        <BbPlusRankingsBoard kind="combined" />
      </PageContent>
    </PageShell>
  );
}
