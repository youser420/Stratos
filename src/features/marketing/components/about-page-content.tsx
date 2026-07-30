import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { aboutPageContent } from "@/features/marketing/content/about";
import { CTA } from "@/features/marketing/components/cta";

export function AboutPageContent() {
  return (
    <>
      <Section>
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <Typography variant="h1">{aboutPageContent.title}</Typography>
          <Typography variant="lead">{aboutPageContent.description}</Typography>
        </div>
      </Section>
      <Section variant="muted" containerSize="narrow">
        <div className="space-y-10">
          <div className="space-y-3">
            <Typography variant="h2">{aboutPageContent.mission.title}</Typography>
            <Typography variant="body">{aboutPageContent.mission.body}</Typography>
          </div>
          <div className="space-y-3">
            <Typography variant="h2">{aboutPageContent.vision.title}</Typography>
            <Typography variant="body">{aboutPageContent.vision.body}</Typography>
          </div>
          <div className="space-y-3">
            <Typography variant="h2">{aboutPageContent.why.title}</Typography>
            {aboutPageContent.why.paragraphs.map((paragraph) => (
              <Typography key={paragraph} variant="body">
                {paragraph}
              </Typography>
            ))}
          </div>
          <div className="space-y-3 border border-border bg-background p-6">
            <Typography variant="h2">{aboutPageContent.team.title}</Typography>
            <Typography variant="body">{aboutPageContent.team.description}</Typography>
            <Typography variant="muted">{aboutPageContent.team.placeholder}</Typography>
          </div>
        </div>
      </Section>
      <Section>
        <CTA
          variant="signup"
          headline={aboutPageContent.cta.headline}
          description={aboutPageContent.cta.description}
        />
      </Section>
    </>
  );
}
