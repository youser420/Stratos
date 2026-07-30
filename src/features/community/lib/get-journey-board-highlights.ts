import "server-only";

import { journeyBoardHighlights } from "@/features/community/content/community";
import type { JourneyBoardHighlight } from "@/features/community/types";

export function getJourneyBoardHighlights(): JourneyBoardHighlight[] {
  return [...journeyBoardHighlights];
}
