import type { Metadata } from "next";
import { LOGO_STATIC } from "@/lib/brand";

export const SITE_NAME = "Boomer Ball";
export const SITE_TAGLINE = "Oklahoma Sooners Football Analytics";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://boomerball.app"
).replace(/\/$/, "");

export const DEFAULT_DESCRIPTION =
  "Oklahoma Sooners football analytics for Sooner Nation — 2025 season stats, 2026 roster, schedule, news, legends, and premium SP+ metrics. Sources cited from soonersports.com and ESPN.";

export const DEFAULT_KEYWORDS = [
  "Oklahoma Sooners football",
  "OU football stats",
  "Sooners analytics",
  "Oklahoma football roster 2026",
  "Oklahoma football schedule",
  "Sooners football news",
  "college football analytics",
  "Boomer Ball",
  "Boomer Sooner",
  "SEC football",
];

/** Public indexable routes for sitemap generation */
export const PUBLIC_ROUTES: {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
}[] = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/stats", changeFrequency: "weekly", priority: 0.9 },
  { path: "/roster", changeFrequency: "weekly", priority: 0.9 },
  { path: "/schedule", changeFrequency: "weekly", priority: 0.9 },
  { path: "/mmqb", changeFrequency: "weekly", priority: 0.88 },
  { path: "/news", changeFrequency: "daily", priority: 0.85 },
  { path: "/legend-land", changeFrequency: "monthly", priority: 0.8 },
  { path: "/join", changeFrequency: "monthly", priority: 0.7 },
  { path: "/nfl-comps", changeFrequency: "monthly", priority: 0.68 },
  { path: "/gameulator", changeFrequency: "monthly", priority: 0.68 },
  { path: "/locker-room", changeFrequency: "monthly", priority: 0.65 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.4 },
  { path: "/refunds", changeFrequency: "monthly", priority: 0.4 },
];

export function siteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteAsset(path: string): string {
  return siteUrl(path.startsWith("/") ? path : `/${path}`);
}

type PageMetadataOptions = {
  title: string;
  description?: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

/** Shared per-page metadata for SEO + social previews */
export function pageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  keywords,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = siteUrl(path);
  const image = absoluteAsset(LOGO_STATIC);
  const fullTitle = path === "/" ? `${SITE_NAME} | ${SITE_TAGLINE}` : title;

  return {
    title: path === "/" ? { absolute: fullTitle } : title,
    description,
    keywords: keywords ?? DEFAULT_KEYWORDS,
    alternates: { canonical: url },
    openGraph: {
      title: path === "/" ? fullTitle : `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: image,
          width: 800,
          height: 533,
          alt: `${SITE_NAME} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: path === "/" ? fullTitle : `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
  };
}

export function siteJsonLdGraph() {
  const logo = absoluteAsset(LOGO_STATIC);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: logo,
        },
        description:
          "Fan-inspired Oklahoma Sooners football analytics. Not affiliated with the University of Oklahoma.",
      },
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/#webapp`,
        name: SITE_NAME,
        url: SITE_URL,
        applicationCategory: "SportsApplication",
        operatingSystem: "Web",
        description: DEFAULT_DESCRIPTION,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free stats, roster, schedule, and news with optional premium analytics",
        },
      },
    ],
  };
}

export function webPageJsonLd({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}) {
  const url = siteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    inLanguage: "en-US",
  };
}

export function faqPageJsonLd(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: siteUrl(item.path),
    })),
  };
}
