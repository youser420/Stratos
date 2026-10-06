import "server-only";

export type OutreachOpportunity = {
  id: string;
  title: string;
  description: string;
  requiresLocation: boolean;
};

/**
 * Section 9 (Outreach): "Surfaces relevant local public wellness activities
 * or STRATOS opportunities where supported... Participation remains
 * optional... should avoid urgency, social pressure, or comparison."
 *
 * There is no local-opportunities data source wired up yet, so this only
 * ever returns non-location-dependent STRATOS opportunities. Per section 14,
 * Outreach still explains its purpose and stays usable without location.
 */
export function getNonLocationOpportunities(): OutreachOpportunity[] {
  return [
    {
      id: "journey-board",
      title: "Share a Journey Board milestone",
      description:
        "Post a meaningful moment from your training, recovery, or reflection for others to see — whenever you're ready.",
      requiresLocation: false,
    },
    {
      id: "community-checkin",
      title: "Join a community check-in",
      description:
        "A low-pressure way to say how your week went. No streaks, no leaderboard.",
      requiresLocation: false,
    },
  ];
}

export type LocalOpportunitiesResult = {
  available: boolean;
  opportunities: OutreachOpportunity[];
  note: string;
};

/**
 * `hasLocationPermission` is supplied by the client after its own optional,
 * explicit permission prompt — this service never requests location itself.
 */
export function getLocalOpportunities(hasLocationPermission: boolean): LocalOpportunitiesResult {
  if (!hasLocationPermission) {
    return {
      available: false,
      opportunities: [],
      note: "Turn on location to see local wellness opportunities near you. This is entirely optional.",
    };
  }

  return {
    available: false,
    opportunities: [],
    note: "Local opportunities aren't available in your area yet — STRATOS-wide opportunities below are always open to you.",
  };
}
