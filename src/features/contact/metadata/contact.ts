import "server-only";

import { buildPageMetadata } from "@/features/seo";

import { contactPageContent } from "@/features/contact/content/contact";

export const contactMetadata = buildPageMetadata({
  title: contactPageContent.title,
  description: contactPageContent.description,
  path: "/contact",
});
