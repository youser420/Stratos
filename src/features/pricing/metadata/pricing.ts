import "server-only";

import { pricingMetadataContent } from "@/features/pricing/content/tiers";
import { buildPageMetadata } from "@/features/seo";

export const pricingMetadata = buildPageMetadata({
  title: pricingMetadataContent.title,
  description: pricingMetadataContent.description,
  path: "/pricing",
});
