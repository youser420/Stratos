import { redirect } from "next/navigation";

import { COACH_SOURCE_IDS, type CoachSourceId } from "@/config/coach";
import { CoachFullContent, coachMetadata } from "@/features/coach";
import { getServerSession } from "@/server/auth/session";

export const metadata = coachMetadata;

type CoachPageProps = {
  searchParams: Promise<{ source?: string; detail?: string }>;
};

function resolveSource(value: string | undefined): CoachSourceId {
  return (COACH_SOURCE_IDS as readonly string[]).includes(value ?? "")
    ? (value as CoachSourceId)
    : "DIRECT";
}

export default async function CoachPage({ searchParams }: CoachPageProps) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/home/coach");
  }

  const { source, detail } = await searchParams;

  return <CoachFullContent source={resolveSource(source)} sourceDetail={detail} />;
}
