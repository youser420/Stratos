/**
 * Static configuration for the STRATOS Sphere: the six primary experience
 * nodes surfaced on the STRATOS Landing Page, plus their disciplines.
 *
 * Positions describe the visual arrangement in docs/implementation/
 * STRATOS_LANDING_PAGE_ARCHITECTURE.md section 3. Per section 15
 * (Accessibility), geometry/position/color must never be the only way a
 * node is identified — every node also carries an explicit semantic label
 * and description used for accessible markup regardless of layout.
 */

export const SPHERE_NODE_IDS = [
  "ascension",
  "basecamp",
  "recovery",
  "community",
  "coach",
  "reflection",
] as const;

export type SphereNodeId = (typeof SPHERE_NODE_IDS)[number];

export type SphereNodePosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type SphereNodeConfig = {
  id: SphereNodeId;
  label: string;
  tagline: string;
  description: string;
  href: string;
  position: SphereNodePosition;
};

export const SPHERE_NODES: readonly SphereNodeConfig[] = [
  {
    id: "ascension",
    label: "Ascension",
    tagline: "Suggested Discipline",
    description: "Run, Prime, and Pump — training activity and progression.",
    href: "/home/ascension",
    position: "top-left",
  },
  {
    id: "basecamp",
    label: "Basecamp",
    tagline: "Overall Analytics",
    description: "Whole-experience synthesis across everything you do in STRATOS.",
    href: "/home/basecamp",
    position: "top-center",
  },
  {
    id: "recovery",
    label: "Recovery",
    tagline: "Suggested Discipline",
    description: "Stretch, Breathe, and Nourish — recovery and readiness.",
    href: "/home/recovery",
    position: "top-right",
  },
  {
    id: "community",
    label: "Community",
    tagline: "Goals · Journey · Outreach",
    description: "Connection, participation, and progress toward what matters to you.",
    href: "/home/community",
    position: "bottom-left",
  },
  {
    id: "coach",
    label: "Coach",
    tagline: "Ask Coach",
    description: "Persistent contextual guidance — explore what your STRATOS data means.",
    href: "/home/coach",
    position: "bottom-center",
  },
  {
    id: "reflection",
    label: "Reflection",
    tagline: "Daily Check-In",
    description: "How you're experiencing your journey, in your own words.",
    href: "/home/reflection",
    position: "bottom-right",
  },
] as const;

export function getSphereNode(id: SphereNodeId): SphereNodeConfig {
  const node = SPHERE_NODES.find((item) => item.id === id);

  if (!node) {
    throw new Error(`Unknown STRATOS Sphere node: ${id}`);
  }

  return node;
}

// ---------------------------------------------------------------------------
// Ascension disciplines (section 5)
// ---------------------------------------------------------------------------

export const ASCENSION_DISCIPLINE_IDS = ["RUN", "PRIME", "PUMP"] as const;

export type AscensionDisciplineId = (typeof ASCENSION_DISCIPLINE_IDS)[number];

export type DisciplineConfig<T extends string = string> = {
  id: T;
  slug: string;
  label: string;
  description: string;
};

export const ASCENSION_DISCIPLINES: readonly DisciplineConfig<AscensionDisciplineId>[] = [
  {
    id: "RUN",
    slug: "run",
    label: "Run",
    description: "Cardio-driven conditioning work.",
  },
  {
    id: "PRIME",
    slug: "prime",
    label: "Prime",
    description: "Movement preparation and activation before heavier loading.",
  },
  {
    id: "PUMP",
    slug: "pump",
    label: "Pump",
    description: "Resistance training focused on strength and hypertrophy.",
  },
] as const;

// ---------------------------------------------------------------------------
// Recovery disciplines (section 6)
// ---------------------------------------------------------------------------

export const RECOVERY_DISCIPLINE_IDS = ["STRETCH", "BREATHE", "NOURISH"] as const;

export type RecoveryDisciplineId = (typeof RECOVERY_DISCIPLINE_IDS)[number];

export const RECOVERY_DISCIPLINES: readonly DisciplineConfig<RecoveryDisciplineId>[] = [
  {
    id: "STRETCH",
    slug: "stretch",
    label: "Stretch",
    description: "Mobility and flexibility work.",
  },
  {
    id: "BREATHE",
    slug: "breathe",
    label: "Breathe",
    description: "Breathwork and nervous-system regulation.",
  },
  {
    id: "NOURISH",
    slug: "nourish",
    label: "Nourish",
    description: "Nutrition and fueling guidance.",
  },
] as const;

export function getAscensionDisciplineBySlug(
  slug: string,
): DisciplineConfig<AscensionDisciplineId> | null {
  return ASCENSION_DISCIPLINES.find((item) => item.slug === slug) ?? null;
}

export function getRecoveryDisciplineBySlug(
  slug: string,
): DisciplineConfig<RecoveryDisciplineId> | null {
  return RECOVERY_DISCIPLINES.find((item) => item.slug === slug) ?? null;
}
