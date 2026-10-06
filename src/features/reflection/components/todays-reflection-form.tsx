"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/common/typography";
import {
  saveReflectionDraftAction,
  submitReflectionAction,
} from "@/features/reflection/actions/reflection.actions";
import { MOOD_TAGS } from "@/features/reflection/schemas";
import { cn } from "@/utils/cn";

type TodaysReflectionFormProps = {
  initialPromptResponse: string;
  initialMoodTag: string | null;
  isSubmitted: boolean;
};

/**
 * Section 8 (Current Check-In): "should provide both understanding and
 * input... should not drop the Individual directly into an unexplained
 * question." The purpose copy always renders alongside the input, and
 * saving a draft (rather than only submitting) is what keeps a partial
 * entry recoverable per section 12.
 */
export function TodaysReflectionForm({
  initialPromptResponse,
  initialMoodTag,
  isSubmitted,
}: TodaysReflectionFormProps) {
  const router = useRouter();
  const [promptResponse, setPromptResponse] = useState(initialPromptResponse);
  const [moodTag, setMoodTag] = useState<string | null>(initialMoodTag);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(!isSubmitted);

  async function handleSaveDraft() {
    setIsPending(true);
    setError(null);
    const result = await saveReflectionDraftAction({ promptResponse, moodTag: moodTag ?? undefined });
    setIsPending(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    router.refresh();
  }

  async function handleSubmit() {
    setIsPending(true);
    setError(null);
    const result = await submitReflectionAction({ promptResponse, moodTag: moodTag ?? undefined });
    setIsPending(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setEditing(false);
    router.refresh();
  }

  if (isSubmitted && !editing) {
    return (
      <div className="space-y-3 border border-border bg-card p-6">
        <Typography variant="muted">Today&apos;s Reflection is complete. Thank you for checking in.</Typography>
        {moodTag ? <Typography variant="label">Tagged: {moodTag}</Typography> : null}
        {promptResponse ? <Typography variant="body">{promptResponse}</Typography> : null}
        <Button type="button" variant="ghost" size="sm" onClick={() => setEditing(true)}>
          Edit today&apos;s Reflection
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 border border-border bg-card p-6">
      <div className="space-y-1">
        <Typography variant="label">What is Reflection?</Typography>
        <Typography variant="muted">
          A short, voluntary check-in about how you&apos;re experiencing your journey — not a
          performance log. Subjective experience matters alongside your Ascension and Recovery
          evidence. What you share here may inform Reflection Analytics, Basecamp, Journey, and
          Coach — never a score, and never required.
        </Typography>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-foreground">
          How would you describe today, in one word?
        </legend>
        <div className="flex flex-wrap gap-2">
          {MOOD_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setMoodTag(tag)}
              className={cn(
                "border px-3 py-1 text-xs capitalize transition-colors",
                moodTag === tag
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block space-y-1">
        <Typography variant="label">Today&apos;s Reflection (optional)</Typography>
        <Textarea
          value={promptResponse}
          onChange={(event) => setPromptResponse(event.target.value)}
          placeholder="Whatever's on your mind about your training, recovery, or how you're feeling..."
          className="min-h-24"
        />
      </label>

      {error ? <Typography className="text-destructive">{error}</Typography> : null}

      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => void handleSubmit()} disabled={isPending}>
          {isPending ? "Saving..." : isSubmitted ? "Update Reflection" : "Submit Reflection"}
        </Button>
        <Button type="button" variant="outline" onClick={() => void handleSaveDraft()} disabled={isPending}>
          Save draft
        </Button>
      </div>
    </div>
  );
}
