import { buildPageMetadata } from "@/features/seo/build-page-metadata";

export const dashboardMetadata = buildPageMetadata({
  title: "Dashboard",
  description: "Your Stratos account overview and next steps.",
  path: "/dashboard",
  noIndex: true,
});
