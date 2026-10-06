import { Badge } from "@/components/ui/badge";
import { SphereNodeTile } from "@/components/common/sphere-node-tile";
import { Typography } from "@/components/common/typography";
import { ASCENSION_DISCIPLINES, RECOVERY_DISCIPLINES, SPHERE_NODES, type SphereNodeId } from "@/config/sphere";
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
 * Section 3 (STRATOS Sphere Architecture). Laid out as a plain responsive
 * grid rather than literal circular geometry — section 15 requires a
 * predictable semantic order independent of circular geometry, which a
 * grid gives for free. Reading order matches the doc's own listing:
 * Ascension, Basecamp, Recovery, Community, Coach, Reflection.
 */
export function SphereGrid({ landingState }: SphereGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SPHERE_NODES.map((node) => {
        const Teaser = teaserByNode[node.id];
        return <SphereNodeTile key={node.id} node={node} teaser={<Teaser landingState={landingState} />} />;
      })}
    </div>
  );
}
