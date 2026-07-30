import { Grid } from "@/components/common/grid";
import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { homeAdaptation } from "@/features/marketing/content/home";
import { FeatureCard } from "@/features/marketing/components/feature-card";

export function AdaptationSection() {
  return (
    <Section>
      <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center">
        <Typography variant="eyebrow">How it works</Typography>
        <Typography variant="h2">{homeAdaptation.title}</Typography>
        <Typography variant="lead">{homeAdaptation.description}</Typography>
      </div>
      <Grid cols={3}>
        {homeAdaptation.features.map((feature) => {
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
  );
}
