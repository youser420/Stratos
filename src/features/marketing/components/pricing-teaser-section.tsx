import Link from "next/link";

import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { buttonVariants } from "@/components/ui/button";
import { homePricing } from "@/features/marketing/content/home";
import { cn } from "@/utils/cn";

export function PricingTeaserSection() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <Typography variant="h2">{homePricing.title}</Typography>
        <Typography variant="lead">{homePricing.description}</Typography>
        <Link
          href={homePricing.cta.href}
          className={cn(buttonVariants({ size: "lg" }))}
        >
          {homePricing.cta.label}
        </Link>
      </div>
    </Section>
  );
}
