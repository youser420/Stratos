import Link from "next/link";

import { EmptyState } from "@/components/common/empty-state";
import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import type { AscensionAnalytics } from "@/server/services/ascension";

type AscensionAnalyticsContentProps = {
  analytics: AscensionAnalytics;
};

export function AscensionAnalyticsContent({ analytics }: AscensionAnalyticsContentProps) {
  return (
    <Section containerSize="default" className="space-y-8 py-10 md:py-12">
      <div className="space-y-2">
        <Link href="/home/ascension" className="text-xs text-muted-foreground hover:text-primary">
          ← Ascension
        </Link>
        <Typography variant="h1">Ascension Analytics</Typography>
      </div>

      {analytics.hasEvidence ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="border border-border bg-card p-5">
            <Typography variant="muted">Completed ({analytics.windowDays}d)</Typography>
            <Typography variant="h2">{analytics.totalCompleted}</Typography>
          </div>
          <div className="border border-border bg-card p-5">
            <Typography variant="muted">Current streak</Typography>
            <Typography variant="h2">{analytics.currentStreakDays}d</Typography>
          </div>
          <div className="border border-border bg-card p-5 sm:col-span-1">
            <Typography variant="muted">By Discipline</Typography>
            <ul className="mt-2 space-y-1">
              {analytics.byDiscipline.map((item) => (
                <li key={item.discipline} className="text-xs text-foreground">
                  {item.discipline}: {item.completedCount} session{item.completedCount === 1 ? "" : "s"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <EmptyState
          title="Not enough evidence yet"
          description="Complete a few Ascension sessions and your analytics will appear here."
        />
      )}
    </Section>
  );
}
