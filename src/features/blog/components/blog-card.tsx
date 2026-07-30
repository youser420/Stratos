import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatBlogDate } from "@/features/blog/lib/format-blog-date";
import type { BlogPostSummary } from "@/features/blog/types";
import { cn } from "@/utils/cn";

type BlogCardProps = {
  post: BlogPostSummary;
  className?: string;
};

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Card className={cn("h-full transition-colors hover:border-primary/40", className)}>
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <CardHeader>
          <p className="text-xs text-muted-foreground">
            {formatBlogDate(post.publishedAt)} · {post.author.name}
          </p>
          <CardTitle className="text-base leading-snug">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="mt-auto">
          <CardDescription className="text-sm leading-relaxed">
            {post.excerpt}
          </CardDescription>
          <span className="mt-4 inline-block text-xs font-medium text-foreground">
            Read article →
          </span>
        </CardContent>
      </Link>
    </Card>
  );
}
