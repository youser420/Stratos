import "server-only";

import { aboutMetadataContent } from "@/features/marketing/content/about";
import { buildPageMetadata } from "@/features/seo";

export const aboutMetadata = buildPageMetadata({
  title: aboutMetadataContent.title,
  description: aboutMetadataContent.description,
  path: "/about",
});
