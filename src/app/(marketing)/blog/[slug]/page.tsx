import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  BlogArticleContent,
  buildBlogArticleMetadata,
  getBlogPost,
  getBlogPostSlugs,
  getRelatedBlogPosts,
} from "@/features/blog";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getBlogPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  return buildBlogArticleMetadata(post);
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(slug);

  return <BlogArticleContent post={post} relatedPosts={relatedPosts} />;
}
