import { Badge } from "@/components/ui/badge";
import { SphereNodeTile } from "@/components/common/sphere-node-tile";
import { Typography } from "@/components/common/typography";
import { ASCENSION_DISCIPLINES, RECOVERY_DISCIPLINES, SPHERE_NODES, type SphereNodeId } from "@/config/sphere";
import { CenterContextCard } from "@/features/landing/components/center-context-card";
import type { LandingState } from "@/server/services/landing";

type SphereGridProps = {
  landingState: LandingState;
};

function AscensionTeaser({ landingState }: { landingState: LandingState }) {
  const { activeSession, suggestion } = landingState.ascension;

  if (activeSession) {
    return <Badge variant="outline">Resume {activeSession.discipline}</Badge>;
  }

  if (suggestion) {
    const label = ASCENSION_DISCIPLINES.find((d) => d.id === suggestion.discipline)?.label;
    return <Typography variant="muted">Suggested: {label}</Typography>;
  }

  return <Typography variant="muted">Explore Ascension</Typography>;
}

function RecoveryTeaser({ landingState }: { landingState: LandingState }) {
  const { activeSession, suggestion } = landingState.recovery;

  if (activeSession) {
    return <Badge variant="outline">Resume {activeSession.discipline}</Badge>;
  }

  if (suggestion) {
    const label = RECOVERY_DISCIPLINES.find((d) => d.id === suggestion.discipline)?.label;
    return <Typography variant="muted">Suggested: {label}</Typography>;
  }

  return <Typography variant="muted">Explore Recovery</Typography>;
}

function ReflectionTeaser({ landingState }: { landingState: LandingState }) {
  if (landingState.reflection.hasSubmittedToday) {
    return <Typography variant="muted">Today&apos;s Reflection is complete</Typography>;
  }

  if (landingState.reflection.hasDraftToday) {
    return <Typography variant="muted">Continue today&apos;s Reflection</Typography>;
  }

  return <Typography variant="muted">Begin today&apos;s Reflection</Typography>;
}

function CommunityTeaser({ landingState }: { landingState: LandingState }) {
  return (
    <Typography variant="muted">
      {landingState.community.hasActiveGoals ? "You have active goals" : "See goals, outreach, and more"}
    </Typography>
  );
}

function BasecampTeaser({ landingState }: { landingState: LandingState }) {
  return (
    <Typography variant="muted">
      {landingState.basecamp.hasMeaningfulUpdate
        ? "New patterns to see"
        : "Not enough evidence yet"}
    </Typography>
  );
}

function CoachTeaser({ landingState }: { landingState: LandingState }) {
  return (
    <Typography variant="muted">
      {landingState.coach.available ? "Ask anything, anytime" : "Guidance available soon"}
    </Typography>
  );
}

const teaserByNode: Record<SphereNodeId, React.ComponentType<{ landingState: LandingState }>> = {
  ascension: AscensionTeaser,
  recovery: RecoveryTeaser,
  reflection: ReflectionTeaser,
  community: CommunityTeaser,
  basecamp: BasecampTeaser,
  coach: CoachTeaser,
};

/**
 * Section 3 positions, placed at the six vertices of a pointy-top hexagon
 * (one vertex straight up, one straight down, four at the sides) — each
 * value is that vertex's (x, y) as a percentage of the hexagon container.
 * Winding order below is the geometric order around the hexagon (for
 * drawing the outline), which is deliberately NOT the doc's reading order.
 */
const HEX_VERTEX: Record<SphereNodeId, { left: number; top: number }> = {
  basecamp: { left: 50, top: 12 },
  recovery: { left: 83, top: 31 },
  reflection: { left: 83, top: 69 },
  coach: { left: 50, top: 88 },
  community: { left: 17, top: 69 },
  ascension: { left: 17, top: 31 },
};

const HEX_WINDING_ORDER: SphereNodeId[] = [
  "basecamp",
  "recovery",
  "reflection",
  "coach",
  "community",
  "ascension",
];

function HexagonOutline() {
  const polygonPoints = HEX_WINDING_ORDER.map((id) => {
    const vertex = HEX_VERTEX[id];
    return `${vertex.left},${vertex.top}`;
  }).join(" ");

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full text-border opacity-60"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <polygon points={polygonPoints} fill="none" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/**
 * Section 3 (STRATOS Sphere Architecture) and section 1 ("The center of the
 * STRATOS Sphere represents current STRATOS context and is not a seventh
 * destination"): on md and up, the center context card and the six nodes
 * are laid out on a hexagon around it. Section 15 (Accessibility) still
 * governs the geometry: the DOM order below never changes — Ascension,
 * Basecamp, Recovery, Community, Coach, Reflection, the doc's own reading
 * order — so keyboard and assistive-tech navigation stays predictable
 * regardless of where a tile lands visually. Below md there isn't room to
 * lay out a hexagon legibly (section 15's touch-target requirement), so the
 * same markup collapses to a plain stacked list instead of being hidden.
 */
export function SphereGrid({ landingState }: SphereGridProps) {
  return (
    <div className="flex flex-col gap-4 md:relative md:block md:aspect-[16/12] md:gap-0">
      <div
        className="md:absolute md:w-72 md:-translate-x-1/2 md:-translate-y-1/2"
        style={{ left: "50%", top: "50%" }}
      >
        <CenterContextCard landingState={landingState} />
      </div>

      <div className="hidden md:block">
        <HexagonOutline />
      </div>

      {SPHERE_NODES.map((node) => {
        const Teaser = teaserByNode[node.id];
        const vertex = HEX_VERTEX[node.id];

        return (
          <div
            key={node.id}
            className="md:absolute md:w-52 md:-translate-x-1/2 md:-translate-y-1/2"
            style={{ left: `${vertex.left}%`, top: `${vertex.top}%` }}
          >
            <SphereNodeTile node={node} teaser={<Teaser landingState={landingState} />} />
          </div>
        );
      })}
    </div>
  );
}
