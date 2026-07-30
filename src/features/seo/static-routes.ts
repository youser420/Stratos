/** Public marketing routes included in sitemap generation. */
export const staticMarketingRoutes = [
  "/",
  "/features",
  "/koach",
  "/pricing",
  "/community",
  "/blog",
  "/about",
  "/faq",
  "/contact",
  "/download",
  "/privacy",
  "/terms",
  "/cookies",
] as const;

export type StaticMarketingRoute = (typeof staticMarketingRoutes)[number];

export function getStaticRoutes(): StaticMarketingRoute[] {
  return [...staticMarketingRoutes];
}
