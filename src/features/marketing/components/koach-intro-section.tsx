import Link from "next/link";
import { ChatCircleIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";

import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { buttonVariants } from "@/components/ui/button";
import { homeKoach } from "@/features/marketing/content/home";
import { cn } from "@/utils/cn";

export function KoachIntroSection() {
  return (
    <Section variant="muted">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <Typography variant="eyebrow">Your coach</Typography>
          <Typography variant="h2">{homeKoach.title}</Typography>
          <Typography variant="lead">{homeKoach.description}</Typography>
          <ul className="space-y-3">
            {homeKoach.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-sm text-foreground">
                <CheckIcon
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          <Link
            href={homeKoach.cta.href}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            {homeKoach.cta.label}
          </Link>
        </div>
        <div className="relative flex items-center justify-center overflow-hidden border border-border bg-gradient-to-br from-primary/10 via-background to-chart-2/10 p-12">
          <div
            className="absolute inset-0 gym-grid-pattern opacity-30"
            aria-hidden
          />
          <ChatCircleIcon
            className="relative size-24 text-primary"
            weight="duotone"
            aria-hidden
          />
        </div>
      </div>
    </Section>
  );
}
