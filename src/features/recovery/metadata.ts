import { buildPageMetadata } from "@/features/seo/build-page-metadata";

export const recoveryMetadata = buildPageMetadata({
  title: "Recovery",
  description: "Stretch, Breathe, and Nourish — your Recovery activity.",
  path: "/home/recovery",
  noIndex: true,
});

export const recoveryAnalyticsMetadata = buildPageMetadata({
  title: "Recovery Analytics",
  description: "Your Recovery activity and readiness context.",
  path: "/home/recovery/analytics",
  noIndex: true,
});
