import type { MetadataRoute } from "next";

import { getBlogPostSlugs } from "@/features/blog";
import { getSiteUrl, getStaticRoutes } from "@/features/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  const staticEntries = getStaticRoutes().map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : 0.8,
  }));

  const blogEntries = getBlogPostSlugs().map((slug) => ({
    url: new URL(`/blog/${slug}`, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
