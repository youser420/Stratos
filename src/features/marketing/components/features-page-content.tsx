import { Grid } from "@/components/common/grid";
import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { featuresPageContent } from "@/features/marketing/content/features";
import { CTA } from "@/features/marketing/components/cta";
import { FeatureCard } from "@/features/marketing/components/feature-card";

export function FeaturesPageContent() {
  return (
    <>
      <Section>
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <Typography variant="h1">{featuresPageContent.title}</Typography>
          <Typography variant="lead">{featuresPageContent.description}</Typography>
        </div>
      </Section>
      <Section variant="muted">
        <Grid cols={3}>
          {featuresPageContent.features.map((feature) => {
            const Icon = feature.icon;

            return (
              <FeatureCard
                key={feature.title}
                icon={<Icon weight="duotone" />}
                title={feature.title}
                description={feature.description}
              />
            );
          })}
        </Grid>
      </Section>
      <Section>
        <CTA
          variant="signup"
          headline={featuresPageContent.cta.headline}
          description={featuresPageContent.cta.description}
        />
      </Section>
    </>
  );
}
