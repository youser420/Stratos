import Link from "next/link";

import { buildCoachHref } from "@/config/coach";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/common/empty-state";
import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import type { BasecampSnapshot } from "@/server/services/basecamp";
import { cn } from "@/utils/cn";

type BasecampContentProps = {
  snapshot: BasecampSnapshot;
};

/**
 * Section 7 (Basecamp Governing Analytics Principle): Evidence → Context →
 * Pattern → Relationship → Interpretation, never Data → Judgment →
 * Composite Score. There is deliberately no single number anywhere on this
 * page — each insight stays a small, separately-evidenced statement.
 */
export function BasecampContent({ snapshot }: BasecampContentProps) {
  return (
    <Section containerSize="default" className="space-y-8 py-10 md:py-12">
      <div className="space-y-2">
        <Typography variant="eyebrow">Basecamp</Typography>
        <Typography variant="h1">What&apos;s happening across your whole STRATOS experience</Typography>
        <Typography variant="lead">
          Patterns and relationships, not a score. Everything below traces back to real evidence
          from Ascension, Recovery, Reflection, Community, and Journey.
        </Typography>
      </div>

      {snapshot.hasAnyEvidence ? (
        <div className="grid gap-4 md:grid-cols-2">
          {snapshot.insights.map((insight) => (
            <div key={insight.id} className="space-y-2 border border-border bg-card p-5">
              <div className="flex flex-wrap gap-1">
                {insight.evidenceFrom.map((source) => (
                  <Badge key={source} variant="outline" className="capitalize">
                    {source}
                  </Badge>
                ))}
                {insight.isCrossExperience ? <Badge variant="secondary">Cross-experience</Badge> : null}
              </div>
              <Typography variant="muted">{insight.evidence}</Typography>
              <Typography variant="body">{insight.pattern}</Typography>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Not enough evidence yet"
          description="As you use Ascension, Recovery, Reflection, and Community, Basecamp will start noticing patterns here — without inventing anything in the meantime."
        />
      )}

      <Link
        href={buildCoachHref("BASECAMP")}
        className={cn(buttonVariants({ variant: "outline" }), "inline-flex")}
      >
        Explore with Coach
      </Link>
    </Section>
  );
}
