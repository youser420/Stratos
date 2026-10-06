import Link from "next/link";

import { EmptyState } from "@/components/common/empty-state";
import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { buttonVariants } from "@/components/ui/button";
import { buildCoachHref } from "@/config/coach";
import { GoalsPanel } from "@/features/community-hub/components/goals-panel";
import { OutreachPanel } from "@/features/community-hub/components/outreach-panel";
import type {
  OutreachOpportunity,
  ParticipationSummary,
} from "@/server/services/community";
import { cn } from "@/utils/cn";

type Goal = {
  id: string;
  title: string;
  description: string | null;
  status: "ACTIVE" | "PAUSED" | "COMPLETED" | "RETIRED";
};

type Milestone = {
  id: string;
  title: string;
  description: string | null;
  occurredAt: Date;
};

type CommunityContentProps = {
  nonLocationOpportunities: OutreachOpportunity[];
  participation: ParticipationSummary;
  goals: Goal[];
  milestones: Milestone[];
};

/**
 * Section 9 (Community Node Architecture): Outreach, My Participation,
 * Personal Goals, and Journey Milestones, with a reciprocal link to
 * Reflection — none of these require completing another first.
 */
export function CommunityContent({
  nonLocationOpportunities,
  participation,
  goals,
  milestones,
}: CommunityContentProps) {
  return (
    <Section containerSize="default" className="space-y-8 py-10 md:py-12">
      <div className="space-y-2">
        <Typography variant="eyebrow">Community</Typography>
        <Typography variant="h1">Connection, participation, and progress</Typography>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <OutreachPanel nonLocationOpportunities={nonLocationOpportunities} />

        <div className="space-y-3 border border-border bg-card p-5">
          <Typography variant="h4">My Participation</Typography>
          <Typography variant="muted">
            A record, never a score. An isolated absence or low participation isn&apos;t a problem.
          </Typography>
          {participation.hasEvidence ? (
            <div className="space-y-1">
              <Typography variant="body">
                {participation.totalCount} interaction{participation.totalCount === 1 ? "" : "s"} in the
                last {participation.windowDays} days.
              </Typography>
              <ul className="space-y-0.5">
                {participation.byType.map((item) => (
                  <li key={item.type} className="text-xs text-muted-foreground">
                    {item.type.replace(/_/g, " ").toLowerCase()}: {item.count}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <EmptyState title="No participation yet" description="Nothing to report — and that's fine." />
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <GoalsPanel goals={goals} />

        <div className="space-y-3 border border-border bg-card p-5">
          <Typography variant="h4">Journey Milestones</Typography>
          <Typography variant="muted">Meaningful progress already experienced — not points.</Typography>
          {milestones.length > 0 ? (
            <ul className="space-y-2">
              {milestones.map((milestone) => (
                <li key={milestone.id} className="border-b border-border/60 pb-2 last:border-0">
                  <Typography variant="body">{milestone.title}</Typography>
                  <Typography variant="muted">{milestone.occurredAt.toLocaleDateString()}</Typography>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="No milestones yet" description="Meaningful progress will show up here as it happens." />
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/home/reflection"
          className="flex flex-col gap-1 border border-border bg-card p-5 transition-colors hover:border-primary/60 hover:bg-accent/40"
        >
          <Typography variant="h4">Reflection</Typography>
          <Typography variant="muted">How you&apos;re experiencing your journey, inward-facing.</Typography>
        </Link>
        <Link
          href={buildCoachHref("COMMUNITY")}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-auto flex-col items-start gap-1 whitespace-normal p-5 text-left",
          )}
        >
          <Typography variant="h4">Explore with Coach</Typography>
          <Typography variant="muted">Talk through your goals or participation.</Typography>
        </Link>
      </div>
    </Section>
  );
}
