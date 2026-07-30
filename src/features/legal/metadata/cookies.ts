import "server-only";

import { buildPageMetadata } from "@/features/seo";

import { cookiesPolicy } from "@/features/legal/content/cookies";

export const cookiesMetadata = buildPageMetadata({
  title: cookiesPolicy.title,
  description: cookiesPolicy.description,
  path: "/cookies",
});
