import { QuotesIcon } from "@phosphor-icons/react/dist/ssr";

import { Grid } from "@/components/common/grid";
import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { homeSocialProof } from "@/features/marketing/content/home";

export function SocialProofSection() {
  return (
    <Section>
      <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center">
        <Typography variant="eyebrow">Community</Typography>
        <Typography variant="h2">{homeSocialProof.title}</Typography>
        <Typography variant="lead">{homeSocialProof.description}</Typography>
      </div>
      <Grid cols={3}>
        {homeSocialProof.testimonials.map((testimonial) => (
          <Card key={testimonial.author} className="h-full border-t-2 border-t-primary/50">
            <CardHeader>
              <QuotesIcon
                className="size-6 text-primary"
                weight="duotone"
                aria-hidden
              />
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-sm leading-relaxed text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </CardDescription>
              <div>
                <Typography variant="label" as="p">
                  {testimonial.author}
                </Typography>
                <Typography variant="muted" as="p">
                  {testimonial.role}
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
