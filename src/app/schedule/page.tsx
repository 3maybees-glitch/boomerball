import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { PageContent } from "@/components/PageContent";
import { JsonLd } from "@/components/JsonLd";
import { ScheduleTabs } from "@/components/ScheduleTabs";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { CONFERENCE_RECORD, SEASON_RECORD } from "@/data/schedule";
import { SEASON_2026_RECORD } from "@/data/schedule-2026";

const PAGE_TITLE = "Football Schedule";
const PAGE_DESCRIPTION =
  "Oklahoma Sooners 2026 football schedule — now 1-0 after UTEP — plus the complete archived 2025 results with scores, locations, and SEC opponents from soonersports.com.";

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/schedule",
  keywords: [
    "Oklahoma Sooners schedule 2026",
    "OU football schedule",
    "Sooners 2025 results",
    "Oklahoma SEC schedule",
  ],
});

export default function SchedulePage() {
  return (
    <PageShell theme="schedule">
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/schedule",
            title: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE, path: "/schedule" },
          ]),
        ]}
      />
      <PageHeader
        theme="schedule"
        title="Football schedule"
        description={`2026 season underway (${SEASON_2026_RECORD}). 2025 archive: ${SEASON_RECORD}, ${CONFERENCE_RECORD}.`}
      />
      <PageContent>
        <ScheduleTabs />
      </PageContent>
    </PageShell>
  );
}
