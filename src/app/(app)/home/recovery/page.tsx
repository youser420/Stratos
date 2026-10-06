import { redirect } from "next/navigation";

import { RecoveryLandingContent, recoveryMetadata } from "@/features/recovery";
import { getServerSession } from "@/server/auth/session";
import { getActiveRecoverySession, getSuggestedRecoveryDiscipline } from "@/server/services/recovery";

export const metadata = recoveryMetadata;

export default async function RecoveryPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/home/recovery");
  }

  const [activeSession, suggestion] = await Promise.all([
    getActiveRecoverySession(session.user.id),
    getSuggestedRecoveryDiscipline(session.user.id),
  ]);

  return <RecoveryLandingContent activeSession={activeSession} suggestion={suggestion} />;
}
