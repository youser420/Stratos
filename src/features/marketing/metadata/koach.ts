import "server-only";

import { koachMetadataContent } from "@/features/marketing/content/koach";
import { buildPageMetadata } from "@/features/seo";

export const koachMetadata = buildPageMetadata({
  title: koachMetadataContent.title,
  description: koachMetadataContent.description,
  path: "/koach",
});
