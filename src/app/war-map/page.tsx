import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { PageContent } from "@/components/PageContent";
import { WarMapGate } from "@/components/WarMapGate";
import { WAR_MAP_PRICE_DISPLAY } from "@/lib/war-map";
import { warMapHeadline } from "@/data/war-map-2026";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const PAGE_TITLE = "2026 WAR MAP";
const PAGE_DESCRIPTION = `Oklahoma Sooners 2026 WAR MAP — one-page super master season preview with roster depth, unit grades, projected scores, freshman hopefuls, NFL draft board, and ${warMapHeadline.bowl} placement. ${WAR_MAP_PRICE_DISPLAY} digital unlock.`;

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/war-map",
  keywords: [
    "Oklahoma Sooners 2026 preview",
    "OU football season preview",
    "Sooners war map",
    "Oklahoma football projected scores",
    "OU bowl projection 2026",
    "Boomer Ball WAR MAP",
  ],
});

export default function WarMapPage() {
  return (
    <PageShell theme="schedule">
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/war-map",
            title: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "2026 WAR MAP", path: "/war-map" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Boomer Ball — 2026 WAR MAP",
            description: PAGE_DESCRIPTION,
            brand: { "@type": "Brand", name: "Boomer Ball" },
            offers: {
              "@type": "Offer",
              price: "1.00",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          },
        ]}
      />

      <div className="print:hidden border-b border-crimson/10 bg-gradient-to-b from-cream/80 to-transparent">
        <PageContent className="py-10 sm:py-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-crimson/70">
            Digital season preview · {WAR_MAP_PRICE_DISPLAY}
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            2026 WAR MAP
          </h1>
          <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-ink/65">
            Everything on one page: players, positions, schedule picks, unit grades,
            freshman hopefuls, draft potentials, projected scores, and bowl placement.
          </p>
        </PageContent>
      </div>

      <PageContent className="py-8 sm:py-10 print:max-w-none print:px-0 print:py-0">
        <WarMapGate />
      </PageContent>
    </PageShell>
  );
}
