"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/common/typography";
import type { CoachSourceId } from "@/config/coach";
import { CoachChat } from "@/features/coach/components/coach-chat";
import { CoachEmblem } from "@/features/coach/components/coach-emblem";
import { useCoachUI } from "@/components/providers/coach-ui-provider";

type CoachFullContentProps = {
  source: CoachSourceId;
  sourceDetail?: string;
};

/**
 * Section 11 (Coach — Dedicated Functional Architecture): the full-size
 * emblem stays visibly present before conversation starts, then dims into
 * the background — never shrinking — once the conversation is the
 * foreground content. A clear Back control returns to the prior experience.
 */
export function CoachFullContent({ source, sourceDetail }: CoachFullContentProps) {
  const router = useRouter();
  const { activeConversationId, openCoach } = useCoachUI();

  useEffect(() => {
    openCoach({ source, sourceDetail });
    // Only sync once on entry — openCoach intentionally omitted from deps so
    // navigating within this page doesn't keep resetting the pane state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasStartedConversation = Boolean(activeConversationId);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="border-b border-border px-6 py-3">
        <Button type="button" variant="ghost" size="sm" onClick={() => router.back()}>
          ← Back
        </Button>
      </div>

      <div className="flex flex-1 flex-col items-center gap-6 px-6 py-8">
        <CoachEmblem
          presence={hasStartedConversation ? "dimmed" : "living"}
          className={hasStartedConversation ? "h-20 w-20" : "h-48 w-48"}
        />
        {!hasStartedConversation ? (
          <div className="max-w-md space-y-1 text-center">
            <Typography variant="h2">Coach</Typography>
            <Typography variant="muted">
              Persistent, contextual guidance. What you say here can carry context from where you
              opened Coach — and Coach will tell you what it&apos;s considering.
            </Typography>
          </div>
        ) : null}

        <div className="w-full max-w-2xl flex-1">
          <CoachChat source={source} sourceDetail={sourceDetail} variant="full" />
        </div>
      </div>
    </div>
  );
}
