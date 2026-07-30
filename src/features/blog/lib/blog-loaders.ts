import "server-only";

import {
  getAllBlogPosts,
  getAllBlogPostSlugs,
  getBlogPostBySlug,
} from "@/features/blog/content/posts";
import type { BlogPost, BlogPostSummary } from "@/features/blog/types";

function toSummary(post: BlogPost): BlogPostSummary {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    author: post.author,
  };
}

export function getBlogPosts(): BlogPostSummary[] {
  return getAllBlogPosts().map(toSummary);
}

export function getBlogPost(slug: string): BlogPost | null {
  return getBlogPostBySlug(slug) ?? null;
}

export function getBlogPostSlugs(): string[] {
  return getAllBlogPostSlugs();
}

export function getRelatedBlogPosts(slug: string, limit = 2): BlogPostSummary[] {
  return getBlogPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, limit);
}
