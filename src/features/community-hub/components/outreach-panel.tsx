"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/common/typography";
import {
  getLocalOpportunitiesAction,
  logParticipationAction,
} from "@/features/community-hub/actions/community-hub.actions";
import type { OutreachOpportunity } from "@/server/services/community";

type OutreachPanelProps = {
  nonLocationOpportunities: OutreachOpportunity[];
};

/**
 * Section 9/16: location is optional, requested only via the browser's own
 * permission prompt (never assumed), and Outreach stays fully usable
 * without it per section 14.
 */
export function OutreachPanel({ nonLocationOpportunities }: OutreachPanelProps) {
  const [localNote, setLocalNote] = useState<string | null>(null);
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);
  const [loggedIds, setLoggedIds] = useState<Set<string>>(new Set());

  async function handleCheckLocal() {
    setIsCheckingLocation(true);

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      const result = await getLocalOpportunitiesAction(false);
      setLocalNote(result.note);
      setIsCheckingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        void getLocalOpportunitiesAction(true).then((result) => {
          setLocalNote(result.note);
          setIsCheckingLocation(false);
        });
      },
      () => {
        void getLocalOpportunitiesAction(false).then((result) => {
          setLocalNote(result.note);
          setIsCheckingLocation(false);
        });
      },
    );
  }

  async function handleLog(opportunity: OutreachOpportunity) {
    await logParticipationAction({
      type: opportunity.id === "community-checkin" ? "COMMUNITY_CHECK_IN" : "OUTREACH_EVENT",
      title: opportunity.title,
    });
    setLoggedIds((prev) => new Set(prev).add(opportunity.id));
  }

  return (
    <div className="space-y-4 border border-border bg-card p-5">
      <Typography variant="h4">Outreach</Typography>
      <Typography variant="muted">
        Connection within STRATOS matters, and it&apos;s entirely optional — no urgency, no comparison.
      </Typography>

      <ul className="space-y-3">
        {nonLocationOpportunities.map((opportunity) => (
          <li key={opportunity.id} className="flex items-start justify-between gap-3">
            <div>
              <Typography variant="body">{opportunity.title}</Typography>
              <Typography variant="muted">{opportunity.description}</Typography>
            </div>
            <Button
              size="sm"
              variant="outline"
              disabled={loggedIds.has(opportunity.id)}
              onClick={() => void handleLog(opportunity)}
            >
              {loggedIds.has(opportunity.id) ? "Logged" : "I did this"}
            </Button>
          </li>
        ))}
      </ul>

      <div className="border-t border-border/70 pt-3">
        {localNote ? (
          <Typography variant="muted">{localNote}</Typography>
        ) : (
          <Button type="button" variant="ghost" size="sm" disabled={isCheckingLocation} onClick={() => void handleCheckLocal()}>
            {isCheckingLocation ? "Checking..." : "Check for local opportunities (optional)"}
          </Button>
        )}
      </div>
    </div>
  );
}
