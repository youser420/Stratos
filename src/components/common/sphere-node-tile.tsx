import Link from "next/link";

import { Typography } from "@/components/common/typography";
import type { SphereNodeConfig } from "@/config/sphere";
import { cn } from "@/utils/cn";

type SphereNodeTileProps = {
  node: SphereNodeConfig;
  /** Short contextual teaser, e.g. a Suggested Discipline or Today's Check-In state. Never required to understand the node. */
  teaser?: React.ReactNode;
  className?: string;
};

/**
 * Section 15 (Accessibility): "All nodes must have semantic labels.
 * Geometry, placement, animation, or color must not be the only means by
 * which the Individual understands a node." The label, tagline, and
 * description below are always present as real text, regardless of the
 * grid position, so a node is identifiable with CSS and color stripped out.
 */
export function SphereNodeTile({ node, teaser, className }: SphereNodeTileProps) {
  return (
    <Link
      href={node.href}
      aria-label={`${node.label} — ${node.description}`}
      className={cn(
        "group flex min-h-40 flex-col justify-between gap-3 border border-border bg-card p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:border-primary/60 hover:bg-accent/40",
        className,
      )}
    >
      <div className="space-y-1.5">
        <Typography variant="eyebrow">{node.tagline}</Typography>
        <Typography variant="h3" className="group-hover:text-primary">
          {node.label}
        </Typography>
        <Typography variant="muted">{node.description}</Typography>
      </div>
      {teaser ? <div className="border-t border-border/70 pt-3">{teaser}</div> : null}
    </Link>
  );
}
