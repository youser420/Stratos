import Link from "next/link";

import { Container } from "@/components/common/container";
import { Typography } from "@/components/common/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";

type HeroStat = {
  value: string;
  label: string;
};

type HeroAction = {
  label: string;
  href: string;
};

type HeroProps = {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  primaryCta: HeroAction;
  secondaryCta?: HeroAction;
  stats?: readonly HeroStat[];
  className?: string;
};

export function Hero({
  eyebrow = "AI-powered fitness",
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  stats,
  className,
}: HeroProps) {
  return (
    <div className={cn("relative flex flex-col gap-10 py-4 md:py-8", className)}>
      <div className="max-w-3xl space-y-6">
        {eyebrow ? (
          <Typography variant="eyebrow">{eyebrow}</Typography>
        ) : null}
        <Typography variant="h1" className="text-gradient-brand normal-case md:uppercase">
          {headline}
        </Typography>
        <Typography variant="lead" className="max-w-2xl text-base md:text-lg">
          {subheadline}
        </Typography>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href={primaryCta.href}
          className={cn(buttonVariants({ size: "lg" }), "min-w-[140px]")}
        >
          {primaryCta.label}
        </Link>
        {secondaryCta ? (
          <Link
            href={secondaryCta.href}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "min-w-[140px] border-border/80 bg-background/5 backdrop-blur-sm hover:bg-background/10",
            )}
          >
            {secondaryCta.label}
          </Link>
        ) : null}
      </div>
      {stats && stats.length > 0 ? (
        <dl className="grid gap-6 border-t border-border/60 pt-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-heading text-2xl font-semibold uppercase tracking-tight text-primary">
                {stat.value}
              </dd>
              <Typography variant="muted" as="p">
                {stat.label}
              </Typography>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}
