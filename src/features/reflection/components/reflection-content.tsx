import Link from "next/link";

import { EmptyState } from "@/components/common/empty-state";
import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { buttonVariants } from "@/components/ui/button";
import { buildCoachHref } from "@/config/coach";
import { TodaysReflectionForm } from "@/features/reflection/components/todays-reflection-form";
import type { ReflectionAnalytics } from "@/server/services/reflection";
import { cn } from "@/utils/cn";

type ReflectionHistoryEntry = {
  id: string;
  reflectionDate: Date;
  moodTag: string | null;
  promptResponse: string | null;
};

type ReflectionContentProps = {
  todaysReflection: {
    promptResponse: string;
    moodTag: string | null;
    isSubmitted: boolean;
  };
  history: ReflectionHistoryEntry[];
  analytics: ReflectionAnalytics;
};

/**
 * Section 8 (Reflection Node Architecture): Current Check-In, Analytics,
 * History, and the reciprocal links to Community and Coach, all reachable
 * from this one node without any of them being required first.
 */
export function ReflectionContent({ todaysReflection, history, analytics }: ReflectionContentProps) {
  return (
    <Section containerSize="default" className="space-y-8 py-10 md:py-12">
      <div className="space-y-2">
        <Typography variant="eyebrow">Reflection</Typography>
        <Typography variant="h1">How are you experiencing your journey?</Typography>
      </div>

      <TodaysReflectionForm
        initialPromptResponse={todaysReflection.promptResponse}
        initialMoodTag={todaysReflection.moodTag}
        isSubmitted={todaysReflection.isSubmitted}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 border border-border bg-card p-5">
          <Typography variant="h4">Reflection Patterns</Typography>
          {analytics.hasEvidence ? (
            <div className="space-y-2">
              <Typography variant="muted">
                {analytics.entryCount} entries in the last {analytics.windowDays} days. Most
                frequent: {analytics.dominantMood}.
              </Typography>
              {analytics.crossExperienceNote ? (
                <Typography variant="muted">{analytics.crossExperienceNote}</Typography>
              ) : null}
            </div>
          ) : (
            <EmptyState
              title="Not enough evidence yet"
              description="Patterns will appear here once you have a few Reflection entries."
            />
          )}
        </div>

        <div className="space-y-3 border border-border bg-card p-5">
          <Typography variant="h4">Past Reflections</Typography>
          {history.length > 0 ? (
            <ul className="space-y-2">
              {history.slice(0, 10).map((entry) => (
                <li key={entry.id} className="border-b border-border/60 pb-2 last:border-0">
                  <Typography variant="label">
                    {entry.reflectionDate.toLocaleDateString()}
                    {entry.moodTag ? ` · ${entry.moodTag}` : ""}
                  </Typography>
                  {entry.promptResponse ? (
                    <Typography variant="muted">{entry.promptResponse}</Typography>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="No past Reflections yet"
              description="Submitted Reflections will show up here as a record — never rewritten."
            />
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/home/community"
          className="flex flex-col gap-1 border border-border bg-card p-5 transition-colors hover:border-primary/60 hover:bg-accent/40"
        >
          <Typography variant="h4">Community</Typography>
          <Typography variant="muted">Connection and Outreach — how you&apos;re reaching outward.</Typography>
        </Link>
        <Link
          href={buildCoachHref("REFLECTION")}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-auto flex-col items-start gap-1 whitespace-normal p-5 text-left",
          )}
        >
          <Typography variant="h4">Explore with Coach</Typography>
          <Typography variant="muted">
            Talk through a Reflection or pattern — Coach won&apos;t assert causes it can&apos;t support.
          </Typography>
        </Link>
      </div>
    </Section>
  );
}
