"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/common/typography";
import type { CoachSourceId } from "@/config/coach";
import { useCoachUI } from "@/components/providers/coach-ui-provider";
import { sendCoachMessageAction } from "@/features/coach/actions/coach.actions";
import { cn } from "@/utils/cn";

type ChatMessage = {
  id: string;
  role: "USER" | "COACH";
  content: string;
};

type CoachChatProps = {
  source: CoachSourceId;
  sourceDetail?: string;
  initialMessages?: ChatMessage[];
  initialContextSummary?: string[];
  variant?: "pane" | "full";
};

export function CoachChat({
  source,
  sourceDetail,
  initialMessages = [],
  initialContextSummary = [],
  variant = "pane",
}: CoachChatProps) {
  const { activeConversationId, setActiveConversationId } = useCoachUI();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [contextSummary, setContextSummary] = useState<string[]>(initialContextSummary);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showContext, setShowContext] = useState(false);

  async function handleSend() {
    const message = draft.trim();

    if (!message || isSending) {
      return;
    }

    setError(null);
    setIsSending(true);
    setDraft("");

    const optimisticUserMessage: ChatMessage = {
      id: `local-${Date.now()}`,
      role: "USER",
      content: message,
    };

    setMessages((prev) => [...prev, optimisticUserMessage]);

    const result = await sendCoachMessageAction({
      conversationId: activeConversationId,
      source,
      sourceDetail,
      message,
    });

    setIsSending(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setActiveConversationId(result.conversationId);
    setContextSummary(result.contextSummary);
    setMessages((prev) => [
      ...prev,
      { id: `coach-${Date.now()}`, role: "COACH", content: result.reply },
    ]);
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <div
        className={cn(
          "flex-1 space-y-3 overflow-y-auto",
          variant === "pane" ? "max-h-80" : "min-h-80",
        )}
        aria-live="polite"
      >
        {messages.length === 0 ? (
          <Typography variant="muted">
            Ask Coach about anything in your STRATOS experience — a Reflection, a pattern in
            Basecamp, or what to do next.
          </Typography>
        ) : null}
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[85%] border px-3 py-2 text-xs/relaxed",
              message.role === "USER"
                ? "ml-auto border-primary/30 bg-primary/10 text-foreground"
                : "border-border bg-card text-card-foreground",
            )}
          >
            {message.content}
          </div>
        ))}
      </div>

      {contextSummary.length > 0 ? (
        <div className="border-t border-border/70 pt-2">
          <button
            type="button"
            onClick={() => setShowContext((prev) => !prev)}
            className="text-xs font-medium text-muted-foreground underline-offset-4 hover:underline"
          >
            {showContext ? "Hide what Coach is considering" : "What is Coach considering?"}
          </button>
          {showContext ? (
            <ul className="mt-2 space-y-1">
              {contextSummary.map((line) => (
                <li key={line} className="text-xs text-muted-foreground">
                  {line}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      {error ? <Typography variant="muted" className="text-destructive">{error}</Typography> : null}

      <div className="flex items-end gap-2 border-t border-border/70 pt-3">
        <Textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void handleSend();
            }
          }}
          placeholder="Ask Coach..."
          aria-label="Message to Coach"
          className="min-h-10"
          disabled={isSending}
        />
        <Button type="button" onClick={() => void handleSend()} disabled={isSending || !draft.trim()}>
          {isSending ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
