import "server-only";

import { buildPageMetadata } from "@/features/seo";

import { privacyPolicy } from "@/features/legal/content/privacy";

export const privacyMetadata = buildPageMetadata({
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  path: "/privacy",
});
