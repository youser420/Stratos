import "server-only";

import { buildPageMetadata } from "@/features/seo";
import type { BlogPost } from "@/features/blog/types";

export function buildBlogArticleMetadata(post: BlogPost) {
  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  });
}
