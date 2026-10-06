import { redirect } from "next/navigation";

import { CommunityContent, communityHubMetadata } from "@/features/community-hub";
import { getServerSession } from "@/server/auth/session";
import {
  getJourneyMilestones,
  getNonLocationOpportunities,
  getParticipationSummary,
  getPersonalGoals,
} from "@/server/services/community";

export const metadata = communityHubMetadata;

export default async function CommunityPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/home/community");
  }

  const [participation, goals, milestones] = await Promise.all([
    getParticipationSummary(session.user.id),
    getPersonalGoals(session.user.id),
    getJourneyMilestones(session.user.id),
  ]);

  return (
    <CommunityContent
      nonLocationOpportunities={getNonLocationOpportunities()}
      participation={participation}
      goals={goals}
      milestones={milestones}
    />
  );
}
