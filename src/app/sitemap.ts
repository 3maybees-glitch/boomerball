import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES, SITE_URL } from "@/lib/seo";
import { getRecapSlugs } from "@/lib/mmqb";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = PUBLIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const recapRoutes = getRecapSlugs().map((slug) => ({
    url: `${SITE_URL}/mmqb/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...recapRoutes];
}
