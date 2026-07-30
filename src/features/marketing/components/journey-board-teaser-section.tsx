import Link from "next/link";
import { TrophyIcon } from "@phosphor-icons/react/dist/ssr";

import { Grid } from "@/components/common/grid";
import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { homeJourneyBoard } from "@/features/marketing/content/home";
import { cn } from "@/utils/cn";

export function JourneyBoardTeaserSection() {
  return (
    <Section variant="muted">
      <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center">
        <Typography variant="h2">{homeJourneyBoard.title}</Typography>
        <Typography variant="lead">{homeJourneyBoard.description}</Typography>
      </div>
      <Grid cols={3}>
        {homeJourneyBoard.highlights.map((highlight) => (
          <Card key={highlight.title} className="h-full">
            <CardHeader>
              <TrophyIcon
                className="size-6 text-primary"
                weight="duotone"
                aria-hidden
              />
              <CardTitle>{highlight.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                {highlight.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </Grid>
      <div className="mt-12 text-center">
        <Link
          href={homeJourneyBoard.cta.href}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          {homeJourneyBoard.cta.label}
        </Link>
      </div>
    </Section>
  );
}
