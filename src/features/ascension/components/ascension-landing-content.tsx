import Link from "next/link";

import { EmptyState } from "@/components/common/empty-state";
import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ASCENSION_DISCIPLINES } from "@/config/sphere";
import { buildCoachHref } from "@/config/coach";
import type { AscensionSuggestion } from "@/server/services/ascension";
import { cn } from "@/utils/cn";

type AscensionLandingContentProps = {
  activeSession: { id: string; discipline: string; startedAt: Date } | null;
  suggestion: AscensionSuggestion | null;
};

/**
 * Section 5: suggestions are guidance, never a requirement, and every
 * Discipline stays directly reachable regardless of what's suggested.
 */
export function AscensionLandingContent({ activeSession, suggestion }: AscensionLandingContentProps) {
  return (
    <Section containerSize="default" className="space-y-8 py-10 md:py-12">
      <div className="space-y-2">
        <Typography variant="eyebrow">Ascension</Typography>
        <Typography variant="h1">Run, Prime, and Pump</Typography>
        <Typography variant="lead">
          Your training activity. Detailed logging and analytics live inside each Discipline.
        </Typography>
      </div>

      {activeSession ? (
        <div className="border border-primary/40 bg-card p-5">
          <Typography variant="muted">
            An Ascension session is already in progress:{" "}
            <Link href={`/home/ascension/${activeSession.discipline.toLowerCase()}`} className="text-primary underline-offset-4 hover:underline">
              resume {activeSession.discipline}
            </Link>
            .
          </Typography>
        </div>
      ) : suggestion ? (
        <div className="border border-border bg-muted/40 p-5">
          <Typography variant="muted">
            Suggested: <Badge variant="outline">{suggestion.discipline}</Badge> — {suggestion.rationale}
          </Typography>
        </div>
      ) : (
        <EmptyState
          title="No suggestion yet"
          description="Log a few sessions and Ascension will start suggesting a Discipline based on your history."
        />
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {ASCENSION_DISCIPLINES.map((discipline) => (
          <Link
            key={discipline.id}
            href={`/home/ascension/${discipline.slug}`}
            className="flex flex-col gap-2 border border-border bg-card p-5 transition-colors hover:border-primary/60 hover:bg-accent/40"
          >
            <Typography variant="h3">{discipline.label}</Typography>
            <Typography variant="muted">{discipline.description}</Typography>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/home/ascension/analytics" className={cn(buttonVariants({ variant: "outline" }))}>
          Ascension Analytics
        </Link>
        <Link href={buildCoachHref("ASCENSION")} className={cn(buttonVariants({ variant: "ghost" }))}>
          Explore with Coach
        </Link>
      </div>
    </Section>
  );
}
