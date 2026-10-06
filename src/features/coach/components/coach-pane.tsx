"use client";

import Link from "next/link";
import { ArrowsOutSimpleIcon } from "@phosphor-icons/react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Typography } from "@/components/common/typography";
import { buildCoachHref } from "@/config/coach";
import { CoachChat } from "@/features/coach/components/coach-chat";
import { CoachEmblem } from "@/features/coach/components/coach-emblem";
import { useCoachUI } from "@/components/providers/coach-ui-provider";
import { cn } from "@/utils/cn";

function CoachPaneBody() {
  const { lastOpenRequest, isDesktopExpanded, collapseDesktop } = useCoachUI();

  if (!isDesktopExpanded) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
        <CoachEmblem presence="living" className="h-28 w-28" />
        <div className="space-y-1">
          <Typography variant="h4">Coach</Typography>
          <Typography variant="muted">
            Persistent, contextual guidance. Ask about anything in your STRATOS experience.
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CoachEmblem presence="dimmed" className="h-9 w-9" />
          <Typography variant="h4">Coach</Typography>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href={buildCoachHref(lastOpenRequest.source, lastOpenRequest.sourceDetail)}
            aria-label="Open the full Coach experience"
            className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          >
            <ArrowsOutSimpleIcon />
          </Link>
          <Button variant="ghost" size="sm" onClick={collapseDesktop}>
            Collapse
          </Button>
        </div>
      </div>
      <CoachChat source={lastOpenRequest.source} sourceDetail={lastOpenRequest.sourceDetail} variant="pane" />
    </div>
  );
}

/** Desktop: persistently visible right-hand pane (section 11, Coach Responsive Behavior). */
export function CoachPaneDesktop() {
  return (
    <aside
      aria-label="Coach"
      className="hidden w-80 shrink-0 border-l border-border bg-card lg:sticky lg:top-16 lg:flex lg:h-[calc(100vh-4rem)] lg:flex-col"
    >
      <CoachPaneBody />
    </aside>
  );
}

/** Tablet: the same pane content, but collapsed behind a trigger (section 11, Coach Responsive Behavior). */
export function CoachPaneTablet() {
  const { isTabletPaneOpen, setTabletPaneOpen, openCoach } = useCoachUI();

  return (
    <Sheet
      open={isTabletPaneOpen}
      onOpenChange={(open: boolean) => {
        setTabletPaneOpen(open);
        if (open) {
          openCoach({ source: "LANDING" });
        }
      }}
    >
      <SheetContent side="right" className="hidden md:flex lg:hidden">
        <SheetHeader>
          <SheetTitle className="sr-only">Coach</SheetTitle>
        </SheetHeader>
        <CoachPaneBody />
      </SheetContent>
    </Sheet>
  );
}
