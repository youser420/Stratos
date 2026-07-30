import "server-only";

import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

import { getSiteUrl } from "@/features/seo/get-site-url";

type BuildPageMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  openGraph?: Metadata["openGraph"];
  twitter?: Metadata["twitter"];
};

export function buildPageMetadata({
  title,
  description = siteConfig.description,
  path = "",
  noIndex = false,
  openGraph,
  twitter,
}: BuildPageMetadataOptions): Metadata {
  const siteUrl = getSiteUrl();
  const url = new URL(path, siteUrl).toString();
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...twitter,
    },
  };
}
