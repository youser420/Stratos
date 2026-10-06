import { buildPageMetadata } from "@/features/seo/build-page-metadata";

export const ascensionMetadata = buildPageMetadata({
  title: "Ascension",
  description: "Run, Prime, and Pump — your Ascension activity.",
  path: "/home/ascension",
  noIndex: true,
});

export const ascensionAnalyticsMetadata = buildPageMetadata({
  title: "Ascension Analytics",
  description: "Your Ascension activity and progression.",
  path: "/home/ascension/analytics",
  noIndex: true,
});
