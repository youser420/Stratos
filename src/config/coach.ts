/**
 * Client-safe mirror of the Prisma `CoachContextSource` enum. Kept as a
 * plain string union (not imported from `@prisma/client`) so client
 * components never need to pull in Prisma's generated runtime.
 */
export const COACH_SOURCE_IDS = [
  "LANDING",
  "BASECAMP",
  "REFLECTION",
  "ASCENSION",
  "RECOVERY",
  "COMMUNITY",
  "DIRECT",
] as const;

export type CoachSourceId = (typeof COACH_SOURCE_IDS)[number];

export function buildCoachHref(source: CoachSourceId, detail?: string): string {
  const params = new URLSearchParams({ source });

  if (detail) {
    params.set("detail", detail);
  }

  return `/home/coach?${params.toString()}`;
}
