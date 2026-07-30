import { Container } from "@/components/common/container";
import { Grid } from "@/components/common/grid";
import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { BlogCard } from "@/features/blog/components/blog-card";
import type { BlogPostSummary } from "@/features/blog/types";
import { CTA } from "@/features/marketing/components/cta";

type BlogListingContentProps = {
  posts: BlogPostSummary[];
};

export function BlogListingContent({ posts }: BlogListingContentProps) {
  return (
    <>
      <Section>
        <Container size="narrow" className="space-y-4">
          <Typography variant="h1">Blog</Typography>
          <Typography variant="lead">
            Training, recovery, and coaching insights from the Stratos team — built
            to help you train with intention.
          </Typography>
        </Container>
      </Section>
      <Section variant="muted">
        <Container>
          <Grid cols={3}>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </Grid>
        </Container>
      </Section>
      <Section containerSize="narrow">
        <CTA
          variant="signup"
          headline="Ready to train with a plan that adapts?"
          description="Create your account, complete onboarding, and download the Stratos app to work with Koach."
        />
      </Section>
    </>
  );
}
