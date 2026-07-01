import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { PageContent } from "@/components/PageContent";
import { JsonLd } from "@/components/JsonLd";
import { ScheduleTabs } from "@/components/ScheduleTabs";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { CONFERENCE_RECORD, SEASON_RECORD } from "@/data/schedule";

const PAGE_TITLE = "Football Schedule";
const PAGE_DESCRIPTION =
  "Oklahoma Sooners 2026 football schedule and complete 2025 results with scores, locations, and SEC opponents from soonersports.com.";

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
        description={`2026 SEC slate plus complete 2025 results (${SEASON_RECORD}, ${CONFERENCE_RECORD}).`}
      />
      <PageContent>
        <ScheduleTabs />
      </PageContent>
    </PageShell>
  );
}
