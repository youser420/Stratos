import "server-only";

import { featuresMetadataContent } from "@/features/marketing/content/features";
import { buildPageMetadata } from "@/features/seo";

export const featuresMetadata = buildPageMetadata({
  title: featuresMetadataContent.title,
  description: featuresMetadataContent.description,
  path: "/features",
});
