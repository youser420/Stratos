import { Section } from "@/components/common/section";
import { SphereGrid } from "@/features/landing/components/sphere-grid";
import type { LandingState } from "@/server/services/landing";

type LandingContentProps = {
  landingState: LandingState;
};

/**
 * The STRATOS Landing Page itself (sections 1, 3, 4): the primary
 * orientation layer, showing where the Individual is and what's relevant,
 * with direct access preserved to every primary experience — no node
 * requires passing through Basecamp or any other node first. SphereGrid
 * renders both the center context and the six nodes, since on md+ they
 * share one hexagon layout (section 3).
 */
export function LandingContent({ landingState }: LandingContentProps) {
  return (
    <Section containerSize="default" className="py-10 md:py-16">
      <SphereGrid landingState={landingState} />
    </Section>
  );
}
