import "server-only";

import { downloadMetadataContent } from "@/features/marketing/content/download";
import { buildPageMetadata } from "@/features/seo";

export const downloadMetadata = buildPageMetadata({
  title: downloadMetadataContent.title,
  description: downloadMetadataContent.description,
  path: "/download",
});
