import Link from "next/link";

import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { buttonVariants } from "@/components/ui/button";
import type { AscensionDisciplineId, DisciplineConfig } from "@/config/sphere";
import { buildCoachHref } from "@/config/coach";
import { DisciplineSessionPanel } from "@/features/ascension/components/discipline-session-panel";
import { cn } from "@/utils/cn";

type DisciplineDetailContentProps = {
  discipline: DisciplineConfig<AscensionDisciplineId>;
  activeSession: { id: string; startedAt: Date } | null;
};

export function DisciplineDetailContent({ discipline, activeSession }: DisciplineDetailContentProps) {
  return (
    <Section containerSize="narrow" className="space-y-6 py-10 md:py-12">
      <div className="space-y-2">
        <Link href="/home/ascension" className="text-xs text-muted-foreground hover:text-primary">
          ← Ascension
        </Link>
        <Typography variant="h1">{discipline.label}</Typography>
        <Typography variant="lead">{discipline.description}</Typography>
      </div>

      <DisciplineSessionPanel
        discipline={discipline.id}
        disciplineLabel={discipline.label}
        activeSession={activeSession}
      />

      <Link href={buildCoachHref("ASCENSION", discipline.label)} className={cn(buttonVariants({ variant: "ghost" }))}>
        Explore {discipline.label} with Coach
      </Link>
    </Section>
  );
}
