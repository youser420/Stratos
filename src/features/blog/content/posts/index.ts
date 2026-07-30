import { howKoachPersonalizesYourPlan } from "@/features/blog/content/posts/how-koach-personalizes-your-plan";
import { progressiveOverloadWithoutBurnout } from "@/features/blog/content/posts/progressive-overload-without-burnout";
import { trainingScheduleThatSticks } from "@/features/blog/content/posts/training-schedule-that-sticks";
import type { BlogPost } from "@/features/blog/types";

export const blogPosts: readonly BlogPost[] = [
  trainingScheduleThatSticks,
  howKoachPersonalizesYourPlan,
  progressiveOverloadWithoutBurnout,
];

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPostSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
