import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";

type BrandLogoProps = {
  href?: string;
  className?: string;
};

const WORDMARK_SRC =
  "https://res.cloudinary.com/dcpnh4iw9/image/upload/v1791294427/02_STRATOS_Word_Mark_odba5n.png";

export function BrandLogo({ href = "/", className }: BrandLogoProps) {
  const content = (
    <span className={cn("inline-flex items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- external
          wordmark asset; intrinsic dimensions aren't known at build time,
          so a plain img with a fixed height and auto width keeps its
          real aspect ratio instead of risking a stretched Next Image
          with guessed width/height props. */}
      <img
        src={WORDMARK_SRC}
        alt={siteConfig.name}
        className="h-7 w-auto"
        loading="eager"
        decoding="async"
      />
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
