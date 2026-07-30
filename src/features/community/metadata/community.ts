import "server-only";

import { buildPageMetadata } from "@/features/seo";

export const communityMetadata = buildPageMetadata({
  title: "Community",
  description:
    "Explore Journey Board highlights from the Stratos community — milestones, streaks, and progress stories that motivate consistent training.",
  path: "/community",
});
