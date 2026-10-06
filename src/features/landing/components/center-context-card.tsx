import { Typography } from "@/components/common/typography";
import type { LandingState } from "@/server/services/landing";

type CenterContextCardProps = {
  landingState: LandingState;
};

function formatToday(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function getContextLine(landingState: LandingState): string {
  if (landingState.ascension.activeSession) {
    return `An Ascension session is in progress — pick it up where you left off.`;
  }

  if (landingState.recovery.activeSession) {
    return `A Recovery session is in progress — pick it up where you left off.`;
  }

  if (landingState.basecamp.hasMeaningfulUpdate) {
    return "Basecamp has noticed a new pattern worth a look.";
  }

  if (!landingState.reflection.hasSubmittedToday) {
    return "Today's Reflection is still open whenever you're ready.";
  }

  return "You're up to date across STRATOS.";
}

/**
 * Section 3: "Center: STRATOS / current overall context / large faded
 * Brand Mark." Section 1: "The center of the STRATOS Sphere represents
 * current STRATOS context and is not a seventh destination." — deliberately
 * not a link.
 */
export function CenterContextCard({ landingState }: CenterContextCardProps) {
  return (
    <div className="relative overflow-hidden border border-border bg-card p-8 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element -- approved brand asset, decorative background mark */}
      <img
        src="/sphere/brand-mark.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 m-auto h-24 w-auto opacity-[0.06] grayscale"
      />
      <div className="relative space-y-2">
        <Typography variant="eyebrow">{formatToday(landingState.today)}</Typography>
        <Typography variant="h2">
          {landingState.greetingName ? `Welcome back, ${landingState.greetingName}` : "Welcome back"}
        </Typography>
        <Typography variant="muted">{getContextLine(landingState)}</Typography>
      </div>
    </div>
  );
}
