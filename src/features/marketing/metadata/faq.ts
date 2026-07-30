import "server-only";

import { faqMetadataContent } from "@/features/marketing/content/faq";
import { buildPageMetadata } from "@/features/seo";

export const faqMetadata = buildPageMetadata({
  title: faqMetadataContent.title,
  description: faqMetadataContent.description,
  path: "/faq",
});
