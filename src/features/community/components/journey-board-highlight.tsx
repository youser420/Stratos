import {
  CalendarCheckIcon,
  FlagBannerIcon,
  MedalIcon,
  TrophyIcon,
  TrendUpIcon,
} from "@phosphor-icons/react/dist/ssr";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  JourneyBoardHighlight,
  JourneyBoardMilestoneType,
} from "@/features/community/types";
import { cn } from "@/utils/cn";

const milestoneIcons = {
  streak: CalendarCheckIcon,
  personal_best: TrophyIcon,
  goal: FlagBannerIcon,
  consistency: TrendUpIcon,
  program: MedalIcon,
} satisfies Record<
  JourneyBoardMilestoneType,
  typeof CalendarCheckIcon
>;

const milestoneLabels: Record<JourneyBoardMilestoneType, string> = {
  streak: "Streak",
  personal_best: "Personal best",
  goal: "Goal",
  consistency: "Consistency",
  program: "Program",
};

type JourneyBoardHighlightCardProps = {
  highlight: JourneyBoardHighlight;
  className?: string;
};

export function JourneyBoardHighlightCard({
  highlight,
  className,
}: JourneyBoardHighlightCardProps) {
  const Icon = milestoneIcons[highlight.milestoneType];

  return (
    <Card className={cn("h-full border-t-2 border-t-primary/60", className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <Icon className="size-6 shrink-0 text-primary" weight="duotone" aria-hidden />
          <span className="text-xs font-medium text-muted-foreground">
            {milestoneLabels[highlight.milestoneType]}
          </span>
        </div>
        <CardTitle className="text-base leading-snug">{highlight.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CardDescription className="text-sm leading-relaxed">
          {highlight.description}
        </CardDescription>
        <p className="text-xs text-muted-foreground">
          {highlight.memberLabel} · {highlight.timeframe}
        </p>
      </CardContent>
    </Card>
  );
}
