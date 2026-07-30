import {
  CommunityPageContent,
  communityMetadata,
  getJourneyBoardHighlights,
} from "@/features/community";

export const metadata = communityMetadata;

export default function CommunityPage() {
  const highlights = getJourneyBoardHighlights();

  return <CommunityPageContent highlights={highlights} />;
}
