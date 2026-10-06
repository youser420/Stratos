import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { getRecoveryDisciplineBySlug } from "@/config/sphere";
import { RecoveryDisciplineDetailContent } from "@/features/recovery";
import { buildPageMetadata } from "@/features/seo/build-page-metadata";
import { getServerSession } from "@/server/auth/session";
import { getActiveRecoverySession } from "@/server/services/recovery";

type RecoveryDisciplinePageProps = {
  params: Promise<{ discipline: string }>;
};

export async function generateMetadata({
  params,
}: RecoveryDisciplinePageProps): Promise<Metadata> {
  const { discipline: slug } = await params;
  const discipline = getRecoveryDisciplineBySlug(slug);

  if (!discipline) {
    return {};
  }

  return buildPageMetadata({
    title: discipline.label,
    description: discipline.description,
    path: `/home/recovery/${discipline.slug}`,
    noIndex: true,
  });
}

export default async function RecoveryDisciplinePage({ params }: RecoveryDisciplinePageProps) {
  const { discipline: slug } = await params;
  const discipline = getRecoveryDisciplineBySlug(slug);

  if (!discipline) {
    notFound();
  }

  const session = await getServerSession();

  if (!session?.user) {
    redirect(`/login?callbackUrl=/home/recovery/${slug}`);
  }

  const activeSession = await getActiveRecoverySession(session.user.id);
  const activeForThisDiscipline =
    activeSession && activeSession.discipline === discipline.id ? activeSession : null;

  return (
    <RecoveryDisciplineDetailContent discipline={discipline} activeSession={activeForThisDiscipline} />
  );
}
