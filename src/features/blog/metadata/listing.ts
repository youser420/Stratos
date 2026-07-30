import "server-only";

import { buildPageMetadata } from "@/features/seo";

export const blogListingMetadata = buildPageMetadata({
  title: "Blog",
  description:
    "Training, recovery, and coaching insights from Stratos — progressive overload, scheduling, and how Koach personalizes your plan.",
  path: "/blog",
});
