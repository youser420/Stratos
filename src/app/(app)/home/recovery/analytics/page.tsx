import { redirect } from "next/navigation";

import { RecoveryAnalyticsContent, recoveryAnalyticsMetadata } from "@/features/recovery";
import { getServerSession } from "@/server/auth/session";
import { getRecoveryAnalytics } from "@/server/services/recovery";

export const metadata = recoveryAnalyticsMetadata;

export default async function RecoveryAnalyticsPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/home/recovery/analytics");
  }

  const analytics = await getRecoveryAnalytics(session.user.id);

  return <RecoveryAnalyticsContent analytics={analytics} />;
}
