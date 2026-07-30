import { Container } from "@/components/common/container";
import { Grid } from "@/components/common/grid";
import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { communityPageContent } from "@/features/community/content/community";
import { JourneyBoardHighlightCard } from "@/features/community/components/journey-board-highlight";
import type { JourneyBoardHighlight } from "@/features/community/types";
import { CTA } from "@/features/marketing/components/cta";

type CommunityPageContentProps = {
  highlights: JourneyBoardHighlight[];
};

export function CommunityPageContent({ highlights }: CommunityPageContentProps) {
  const { intro, howItWorks, highlights: highlightsSection, cta } = communityPageContent;

  return (
    <>
      <Section>
        <Container size="narrow" className="space-y-4 text-center">
          <Typography variant="h1">{communityPageContent.title}</Typography>
          <Typography variant="lead">{communityPageContent.lead}</Typography>
        </Container>
      </Section>
      <Section variant="muted" containerSize="narrow">
        <div className="space-y-10">
          <div className="space-y-3">
            <Typography variant="h2">{intro.title}</Typography>
            {intro.paragraphs.map((paragraph) => (
              <Typography key={paragraph} variant="body">
                {paragraph}
              </Typography>
            ))}
          </div>
          <div className="space-y-6">
            <Typography variant="h2">{howItWorks.title}</Typography>
            <div className="grid gap-6 md:grid-cols-3">
              {howItWorks.steps.map((step) => (
                <div key={step.title} className="space-y-2 border border-border bg-background p-4">
                  <Typography variant="h3">{step.title}</Typography>
                  <Typography variant="muted">{step.description}</Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <Container className="space-y-8">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <Typography variant="h2">{highlightsSection.title}</Typography>
            <Typography variant="lead">{highlightsSection.description}</Typography>
          </div>
          <Grid cols={3}>
            {highlights.map((highlight) => (
              <JourneyBoardHighlightCard key={highlight.id} highlight={highlight} />
            ))}
          </Grid>
        </Container>
      </Section>
      <Section containerSize="narrow">
        <CTA
          variant="signup"
          headline={cta.headline}
          description={cta.description}
          secondaryAction={{ label: "Download app", href: "/download" }}
        />
      </Section>
    </>
  );
}
