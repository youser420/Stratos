import { buildPageMetadata } from "@/features/seo/build-page-metadata";

export const landingMetadata = buildPageMetadata({
  title: "Home",
  description: "Your STRATOS Landing Page — Ascension, Recovery, Basecamp, Community, Coach, and Reflection.",
  path: "/home",
  noIndex: true,
});
