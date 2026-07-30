import "server-only";

import { buildPageMetadata } from "@/features/seo";
import { homeMetadataContent } from "@/features/marketing/content/home";

export const homeMetadata = buildPageMetadata({
  title: homeMetadataContent.title,
  description: homeMetadataContent.description,
  path: "/",
});
