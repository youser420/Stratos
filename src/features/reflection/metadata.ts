import { buildPageMetadata } from "@/features/seo/build-page-metadata";

export const reflectionMetadata = buildPageMetadata({
  title: "Reflection",
  description: "Your Daily Check-In, history, and patterns.",
  path: "/home/reflection",
  noIndex: true,
});
