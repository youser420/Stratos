import "server-only";

import { buildPageMetadata } from "@/features/seo";

import { termsOfService } from "@/features/legal/content/terms";

export const termsMetadata = buildPageMetadata({
  title: termsOfService.title,
  description: termsOfService.description,
  path: "/terms",
});
