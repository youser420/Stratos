import Link from "next/link";

import { Typography } from "@/components/common/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";

type CTAVariant = "signup" | "download" | "learn-more";

type CTAAction = {
  label: string;
  href: string;
};

const variantDefaults: Record<
  CTAVariant,
  { primary: CTAAction; secondary: CTAAction }
> = {
  signup: {
    primary: { label: "Sign Up", href: "/signup" },
    secondary: { label: "Download App", href: "/download" },
  },
  download: {
    primary: { label: "Download App", href: "/download" },
    secondary: { label: "Sign Up", href: "/signup" },
  },
  "learn-more": {
    primary: { label: "Learn more", href: "/features" },
    secondary: { label: "Sign Up", href: "/signup" },
  },
};

type CTAProps = {
  variant?: CTAVariant;
  headline: string;
  description?: string;
  primaryAction?: CTAAction;
  secondaryAction?: CTAAction;
  showSecondary?: boolean;
  tone?: "default" | "panel";
  className?: string;
};

export function CTA({
  variant = "signup",
  headline,
  description,
  primaryAction,
  secondaryAction,
  showSecondary = true,
  tone = "default",
  className,
}: CTAProps) {
  const defaults = variantDefaults[variant];
  const primary = primaryAction ?? defaults.primary;
  const secondary = secondaryAction ?? defaults.secondary;

  const content = (
    <>
      <div className="max-w-xl space-y-3">
        <div className="accent-bar mx-auto" aria-hidden />
        <Typography variant="h2">{headline}</Typography>
        {description ? (
          <Typography variant="lead">{description}</Typography>
        ) : null}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href={primary.href}
          className={cn(buttonVariants({ size: "lg" }))}
        >
          {primary.label}
        </Link>
        {showSecondary ? (
          <Link
            href={secondary.href}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            {secondary.label}
          </Link>
        ) : null}
      </div>
    </>
  );

  if (tone === "panel") {
    return (
      <div
        data-section-theme="dark"
        className={cn(
          "gym-radial-glow flex flex-col items-center gap-8 border border-border px-6 py-12 text-center md:px-12 md:py-16",
          className,
        )}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-6 text-center",
        className,
      )}
    >
      {content}
    </div>
  );
}
