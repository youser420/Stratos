import { redirect } from "next/navigation";

import { AscensionLandingContent, ascensionMetadata } from "@/features/ascension";
import { getServerSession } from "@/server/auth/session";
import { getActiveAscensionSession, getSuggestedAscensionDiscipline } from "@/server/services/ascension";

export const metadata = ascensionMetadata;

export default async function AscensionPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/home/ascension");
  }

  const [activeSession, suggestion] = await Promise.all([
    getActiveAscensionSession(session.user.id),
    getSuggestedAscensionDiscipline(session.user.id),
  ]);

  return <AscensionLandingContent activeSession={activeSession} suggestion={suggestion} />;
}
