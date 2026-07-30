import {
  BlogListingContent,
  blogListingMetadata,
  getBlogPosts,
} from "@/features/blog";

export const metadata = blogListingMetadata;

export default function BlogPage() {
  const posts = getBlogPosts();

  return <BlogListingContent posts={posts} />;
}
