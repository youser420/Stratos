import { buildPageMetadata } from "@/features/seo/build-page-metadata";

export const communityHubMetadata = buildPageMetadata({
  title: "Community",
  description: "Outreach, My Participation, Personal Goals, and Journey Milestones.",
  path: "/home/community",
  noIndex: true,
});
