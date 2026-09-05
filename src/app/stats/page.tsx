import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { PageContent } from "@/components/PageContent";
import { JsonLd } from "@/components/JsonLd";
import { StatsSeasonTabs } from "@/components/StatsSeasonTabs";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const PAGE_TITLE = "2026 Season Stats";
const PAGE_DESCRIPTION =
  "Oklahoma Sooners 2026 football statistics through Week 1, plus the archived 2025 cumulative passing, rushing, receiving, and defense totals from soonersports.com and ESPN.";

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/stats",
  keywords: [
    "Oklahoma Sooners 2026 stats",
    "OU football passing stats",
    "Sooners rushing stats",
    "Oklahoma defense stats 2026",
    "Oklahoma 2025 stats archive",
  ],
});

export default function StatsPage() {
  return (
    <PageShell theme="stats">
      <JsonLd
        data={[
          webPageJsonLd({ path: "/stats", title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE, path: "/stats" },
          ]),
        ]}
      />
      <PageHeader
        theme="stats"
        title="Season statistics"
        description="Live 2026 totals after the UTEP opener, with the complete 2025 season archived in one click."
      />

      <PageContent>
        <StatsSeasonTabs />
      </PageContent>
    </PageShell>
  );
}
