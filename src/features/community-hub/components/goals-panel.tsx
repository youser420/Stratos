"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/common/empty-state";
import { Typography } from "@/components/common/typography";
import {
  createPersonalGoalAction,
  setPersonalGoalStatusAction,
} from "@/features/community-hub/actions/community-hub.actions";

type Goal = {
  id: string;
  title: string;
  description: string | null;
  status: "ACTIVE" | "PAUSED" | "COMPLETED" | "RETIRED";
};

type GoalsPanelProps = {
  goals: Goal[];
};

const STATUS_LABEL: Record<Goal["status"], string> = {
  ACTIVE: "Active",
  PAUSED: "Paused",
  COMPLETED: "Completed",
  RETIRED: "Retired",
};

/**
 * Section 9 (Personal Goals): "The Individual creates, edits, completes,
 * pauses, or retires goals... STRATOS should not treat an unmet goal as
 * failure or noncompliance." Pausing/retiring is presented as a neutral
 * status change, not a penalty.
 */
export function GoalsPanel({ goals }: GoalsPanelProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    if (!title.trim()) return;

    setIsPending(true);
    setError(null);
    const result = await createPersonalGoalAction({ title: title.trim() });
    setIsPending(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setTitle("");
    router.refresh();
  }

  async function handleStatusChange(goalId: string, status: Goal["status"]) {
    setIsPending(true);
    setError(null);
    const result = await setPersonalGoalStatusAction({ goalId, status });
    setIsPending(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    router.refresh();
  }

  return (
    <div className="space-y-4 border border-border bg-card p-5">
      <Typography variant="h4">My Goals</Typography>
      <Typography variant="muted">
        Where you want to go — set by you, distinct from anything STRATOS suggests.
      </Typography>

      {goals.length === 0 ? (
        <EmptyState title="No goals yet" description="Add a goal whenever something matters to you." />
      ) : (
        <ul className="space-y-2">
          {goals.map((goal) => (
            <li key={goal.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2 last:border-0">
              <div>
                <Typography variant="body">{goal.title}</Typography>
                <Badge variant="outline">{STATUS_LABEL[goal.status]}</Badge>
              </div>
              <div className="flex gap-1">
                {goal.status !== "ACTIVE" && goal.status !== "COMPLETED" ? (
                  <Button size="xs" variant="ghost" disabled={isPending} onClick={() => void handleStatusChange(goal.id, "ACTIVE")}>
                    Resume
                  </Button>
                ) : null}
                {goal.status === "ACTIVE" ? (
                  <>
                    <Button size="xs" variant="ghost" disabled={isPending} onClick={() => void handleStatusChange(goal.id, "PAUSED")}>
                      Pause
                    </Button>
                    <Button size="xs" variant="ghost" disabled={isPending} onClick={() => void handleStatusChange(goal.id, "COMPLETED")}>
                      Complete
                    </Button>
                  </>
                ) : null}
                {goal.status !== "RETIRED" ? (
                  <Button size="xs" variant="ghost" disabled={isPending} onClick={() => void handleStatusChange(goal.id, "RETIRED")}>
                    Retire
                  </Button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}

      {error ? <Typography className="text-destructive">{error}</Typography> : null}

      <div className="flex gap-2">
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Add a goal..."
          aria-label="New goal title"
        />
        <Button type="button" disabled={isPending || !title.trim()} onClick={() => void handleCreate()}>
          Add
        </Button>
      </div>
    </div>
  );
}
