import { Grid } from "@/components/common/grid";
import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { koachPageContent } from "@/features/marketing/content/koach";
import { CTA } from "@/features/marketing/components/cta";

export function KoachPageContent() {
  return (
    <>
      <Section>
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <Typography variant="h1">{koachPageContent.title}</Typography>
          <Typography variant="lead">{koachPageContent.description}</Typography>
        </div>
      </Section>
      <Section variant="muted">
        <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center">
          <Typography variant="h2">{koachPageContent.philosophy.title}</Typography>
          <Typography variant="lead">
            {koachPageContent.philosophy.description}
          </Typography>
        </div>
        <Grid cols={3}>
          {koachPageContent.philosophy.pillars.map((pillar) => (
            <Card key={pillar.title} className="h-full">
              <CardHeader>
                <CardTitle>{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {pillar.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Section>
      <Section>
        <div className="mx-auto max-w-2xl space-y-6">
          <Typography variant="h2">{koachPageContent.memory.title}</Typography>
          <Typography variant="lead">{koachPageContent.memory.description}</Typography>
          <ul className="space-y-3">
            {koachPageContent.memory.points.map((point) => (
              <li key={point} className="text-sm text-foreground">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <Section variant="muted">
        <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center">
          <Typography variant="h2">Example conversations</Typography>
          <Typography variant="lead">
            Illustrative scenarios — not live product interactions.
          </Typography>
        </div>
        <Grid cols={3}>
          {koachPageContent.scenarios.map((scenario) => (
            <Card key={scenario.title} className="h-full">
              <CardHeader>
                <CardTitle>{scenario.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Typography variant="label" as="p" className="mb-1">
                    You
                  </Typography>
                  <CardDescription className="text-sm leading-relaxed text-foreground">
                    {scenario.user}
                  </CardDescription>
                </div>
                <div>
                  <Typography variant="label" as="p" className="mb-1">
                    Koach
                  </Typography>
                  <CardDescription className="text-sm leading-relaxed text-foreground">
                    {scenario.koach}
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Section>
      <Section>
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <Typography variant="h2">
            {koachPageContent.differentiation.title}
          </Typography>
          <Typography variant="lead">
            {koachPageContent.differentiation.description}
          </Typography>
        </div>
      </Section>
      <Section variant="muted">
        <CTA
          variant="signup"
          headline={koachPageContent.cta.headline}
          description={koachPageContent.cta.description}
        />
      </Section>
    </>
  );
}
