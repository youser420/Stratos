import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";

type BrandLogoProps = {
  href?: string;
  className?: string;
};

export function BrandLogo({ href = "/", className }: BrandLogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="flex flex-col gap-0.5" aria-hidden>
        <span className="h-0.5 w-5 bg-primary" />
        <span className="h-0.5 w-3 bg-primary/60" />
      </span>
      <span className="font-heading text-sm font-semibold uppercase tracking-widest text-foreground">
        {siteConfig.name}
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="shrink-0 transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
