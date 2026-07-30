import Link from "next/link";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import type { PricingTier } from "@/features/pricing/content/tiers";
import { cn } from "@/utils/cn";

type PricingCardProps = {
  tier: PricingTier;
  className?: string;
};

export function PricingCard({ tier, className }: PricingCardProps) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col",
        tier.highlighted && "border-t-2 border-t-primary ring-2 ring-primary/30 shadow-md",
        className,
      )}
    >
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{tier.name}</CardTitle>
          {tier.highlighted ? <Badge className="bg-primary/15 text-primary">Popular</Badge> : null}
        </div>
        <div className="space-y-1">
          <p className="font-heading text-3xl font-semibold tracking-tight text-foreground">
            {tier.price}
          </p>
          {tier.priceNote ? (
            <CardDescription>{tier.priceNote}</CardDescription>
          ) : null}
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {tier.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3">
          {tier.features.map((feature) => (
            <li key={feature} className="flex gap-3 text-sm text-foreground">
              <CheckIcon
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link
          href={tier.cta.href}
          className={cn(
            buttonVariants({
              variant: tier.highlighted ? "default" : "outline",
              size: "lg",
            }),
            "w-full justify-center",
          )}
        >
          {tier.cta.label}
        </Link>
      </CardFooter>
    </Card>
  );
}
