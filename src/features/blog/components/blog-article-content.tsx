import Link from "next/link";

import { Container } from "@/components/common/container";
import { Grid } from "@/components/common/grid";
import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { BlogCard } from "@/features/blog/components/blog-card";
import { formatBlogDate } from "@/features/blog/lib/format-blog-date";
import type { BlogPost, BlogPostSummary } from "@/features/blog/types";
import { CTA } from "@/features/marketing/components/cta";

type BlogArticleContentProps = {
  post: BlogPost;
  relatedPosts: BlogPostSummary[];
};

export function BlogArticleContent({ post, relatedPosts }: BlogArticleContentProps) {
  return (
    <>
      <Section>
        <Container size="narrow" className="space-y-6">
          <div className="space-y-3">
            <Link
              href="/blog"
              className="text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              ← Back to blog
            </Link>
            <Typography variant="h1">{post.title}</Typography>
            <Typography variant="muted">
              {formatBlogDate(post.publishedAt)} · {post.author.name},{" "}
              {post.author.role}
            </Typography>
          </div>
          <article className="space-y-4">
            {post.body.map((block, index) => {
              if (block.type === "heading") {
                return (
                  <Typography key={index} variant="h2" className="pt-2">
                    {block.text}
                  </Typography>
                );
              }

              return (
                <Typography key={index} variant="body" as="p">
                  {block.text}
                </Typography>
              );
            })}
          </article>
        </Container>
      </Section>
      <Section containerSize="narrow">
        <CTA
          variant="signup"
          headline="Turn insight into action"
          description="Sign up for Stratos, complete onboarding, and start training with Koach in the app."
        />
      </Section>
      {relatedPosts.length > 0 ? (
        <Section variant="muted">
          <Container className="space-y-8">
            <Typography variant="h2">Related articles</Typography>
            <Grid cols={2}>
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </Grid>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
