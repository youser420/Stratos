import Link from "next/link";

import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { buttonVariants } from "@/components/ui/button";
import type { DisciplineConfig, RecoveryDisciplineId } from "@/config/sphere";
import { buildCoachHref } from "@/config/coach";
import { RecoverySessionPanel } from "@/features/recovery/components/recovery-session-panel";
import { cn } from "@/utils/cn";

type RecoveryDisciplineDetailContentProps = {
  discipline: DisciplineConfig<RecoveryDisciplineId>;
  activeSession: { id: string; startedAt: Date } | null;
};

export function RecoveryDisciplineDetailContent({
  discipline,
  activeSession,
}: RecoveryDisciplineDetailContentProps) {
  return (
    <Section containerSize="narrow" className="space-y-6 py-10 md:py-12">
      <div className="space-y-2">
        <Link href="/home/recovery" className="text-xs text-muted-foreground hover:text-primary">
          ← Recovery
        </Link>
        <Typography variant="h1">{discipline.label}</Typography>
        <Typography variant="lead">{discipline.description}</Typography>
      </div>

      <RecoverySessionPanel
        discipline={discipline.id}
        disciplineLabel={discipline.label}
        activeSession={activeSession}
      />

      <Link href={buildCoachHref("RECOVERY", discipline.label)} className={cn(buttonVariants({ variant: "ghost" }))}>
        Explore {discipline.label} with Coach
      </Link>
    </Section>
  );
}
