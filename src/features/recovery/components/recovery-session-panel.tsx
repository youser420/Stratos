"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/common/typography";
import type { RecoveryDisciplineId } from "@/config/sphere";
import {
  abandonRecoverySessionAction,
  completeRecoverySessionAction,
  startRecoverySessionAction,
} from "@/features/recovery/actions/recovery.actions";

type ActiveSession = { id: string; startedAt: Date };

type RecoverySessionPanelProps = {
  discipline: RecoveryDisciplineId;
  disciplineLabel: string;
  activeSession: ActiveSession | null;
};

/** Section 6: "An active Recovery experience should be clearly recoverable." */
export function RecoverySessionPanel({
  discipline,
  disciplineLabel,
  activeSession,
}: RecoverySessionPanelProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [durationMinutes, setDurationMinutes] = useState("");
  const [notes, setNotes] = useState("");

  async function handleStart() {
    setIsPending(true);
    setError(null);
    const result = await startRecoverySessionAction({ discipline });
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
    const result = await completeRecoverySessionAction({
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
    const result = await abandonRecoverySessionAction({ sessionId: activeSession.id });
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
          {disciplineLabel} is here whenever it&apos;s useful to you — not a requirement.
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
      <label className="block space-y-1">
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
