import { Section } from "@/components/common/section";
import { CenterContextCard } from "@/features/landing/components/center-context-card";
import { SphereGrid } from "@/features/landing/components/sphere-grid";
import type { LandingState } from "@/server/services/landing";

type LandingContentProps = {
  landingState: LandingState;
};

/**
 * The STRATOS Landing Page itself (sections 1, 3, 4): the primary
 * orientation layer, showing where the Individual is and what's relevant,
 * with direct access preserved to every primary experience — no node
 * requires passing through Basecamp or any other node first.
 */
export function LandingContent({ landingState }: LandingContentProps) {
  return (
    <Section containerSize="default" className="space-y-8 py-10 md:py-12">
      <CenterContextCard landingState={landingState} />
      <SphereGrid landingState={landingState} />
    </Section>
  );
}
