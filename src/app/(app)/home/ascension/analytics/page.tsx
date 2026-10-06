import { redirect } from "next/navigation";

import { AscensionAnalyticsContent, ascensionAnalyticsMetadata } from "@/features/ascension";
import { getServerSession } from "@/server/auth/session";
import { getAscensionAnalytics } from "@/server/services/ascension";

export const metadata = ascensionAnalyticsMetadata;

export default async function AscensionAnalyticsPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/home/ascension/analytics");
  }

  const analytics = await getAscensionAnalytics(session.user.id);

  return <AscensionAnalyticsContent analytics={analytics} />;
}
