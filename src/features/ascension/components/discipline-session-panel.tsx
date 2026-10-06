"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/common/typography";
import type { AscensionDisciplineId } from "@/config/sphere";
import {
  abandonAscensionSessionAction,
  completeAscensionSessionAction,
  startAscensionSessionAction,
} from "@/features/ascension/actions/ascension.actions";

type ActiveSession = {
  id: string;
  startedAt: Date;
};

type DisciplineSessionPanelProps = {
  discipline: AscensionDisciplineId;
  disciplineLabel: string;
  activeSession: ActiveSession | null;
};

/**
 * Section 5: "An active Ascension workout should be clearly recoverable."
 * The active/not-active state is the source of truth from the server —
 * this panel only ever shows what's really there, and router.refresh()
 * after every action re-reads it rather than guessing the next state.
 */
export function DisciplineSessionPanel({
  discipline,
  disciplineLabel,
  activeSession,
}: DisciplineSessionPanelProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [durationMinutes, setDurationMinutes] = useState("");
  const [notes, setNotes] = useState("");

  async function handleStart() {
    setIsPending(true);
    setError(null);
    const result = await startAscensionSessionAction({ discipline });
    setIsPending(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    router.refresh();
  }

  async function handleComplete() {
    if (!activeSession) return;

    setIsPending(true);
    setError(null);
    const result = await completeAscensionSessionAction({
      sessionId: activeSession.id,
      durationMinutes: durationMinutes ? Number(durationMinutes) : undefined,
      notes: notes || undefined,
    });
    setIsPending(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    router.refresh();
  }

  async function handleAbandon() {
    if (!activeSession) return;

    setIsPending(true);
    setError(null);
    const result = await abandonAscensionSessionAction({ sessionId: activeSession.id });
    setIsPending(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    router.refresh();
  }

  if (!activeSession) {
    return (
      <div className="space-y-3 border border-border bg-card p-6">
        <Typography variant="muted">
          Starting {disciplineLabel} is a suggestion you&apos;re free to act on whenever it fits —
          not a requirement.
        </Typography>
        {error ? <Typography className="text-destructive">{error}</Typography> : null}
        <Button type="button" onClick={() => void handleStart()} disabled={isPending}>
          {isPending ? "Starting..." : `Start ${disciplineLabel} session`}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 border border-primary/40 bg-card p-6">
      <Typography variant="muted">
        In progress since {activeSession.startedAt.toLocaleTimeString()}. This session stays
        recoverable if you leave and come back.
      </Typography>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1">
          <Typography variant="label">Duration (minutes)</Typography>
          <Input
            type="number"
            min={1}
            max={600}
            value={durationMinutes}
            onChange={(event) => setDurationMinutes(event.target.value)}
          />
        </label>
      </div>
      <label className="space-y-1 block">
        <Typography variant="label">Notes (optional)</Typography>
        <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} />
      </label>
      {error ? <Typography className="text-destructive">{error}</Typography> : null}
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => void handleComplete()} disabled={isPending}>
          {isPending ? "Saving..." : "Complete session"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => void handleAbandon()} disabled={isPending}>
          Abandon
        </Button>
      </div>
    </div>
  );
}
