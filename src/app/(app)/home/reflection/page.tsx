import { redirect } from "next/navigation";

import { ReflectionContent, reflectionMetadata } from "@/features/reflection";
import { getServerSession } from "@/server/auth/session";
import {
  getReflectionAnalytics,
  getReflectionHistory,
  getTodaysReflection,
} from "@/server/services/reflection";

export const metadata = reflectionMetadata;

export default async function ReflectionPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/home/reflection");
  }

  const [todaysReflection, history, analytics] = await Promise.all([
    getTodaysReflection(session.user.id),
    getReflectionHistory(session.user.id),
    getReflectionAnalytics(session.user.id),
  ]);

  return (
    <ReflectionContent
      todaysReflection={{
        promptResponse: todaysReflection?.promptResponse ?? "",
        moodTag: todaysReflection?.moodTag ?? null,
        isSubmitted: Boolean(todaysReflection && !todaysReflection.isDraft),
      }}
      history={history}
      analytics={analytics}
    />
  );
}
