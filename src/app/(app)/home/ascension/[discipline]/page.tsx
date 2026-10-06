import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { getAscensionDisciplineBySlug } from "@/config/sphere";
import { DisciplineDetailContent } from "@/features/ascension";
import { buildPageMetadata } from "@/features/seo/build-page-metadata";
import { getServerSession } from "@/server/auth/session";
import { getActiveAscensionSession } from "@/server/services/ascension";

type AscensionDisciplinePageProps = {
  params: Promise<{ discipline: string }>;
};

export async function generateMetadata({
  params,
}: AscensionDisciplinePageProps): Promise<Metadata> {
  const { discipline: slug } = await params;
  const discipline = getAscensionDisciplineBySlug(slug);

  if (!discipline) {
    return {};
  }

  return buildPageMetadata({
    title: discipline.label,
    description: discipline.description,
    path: `/home/ascension/${discipline.slug}`,
    noIndex: true,
  });
}

export default async function AscensionDisciplinePage({ params }: AscensionDisciplinePageProps) {
  const { discipline: slug } = await params;
  const discipline = getAscensionDisciplineBySlug(slug);

  if (!discipline) {
    notFound();
  }

  const session = await getServerSession();

  if (!session?.user) {
    redirect(`/login?callbackUrl=/home/ascension/${slug}`);
  }

  const activeSession = await getActiveAscensionSession(session.user.id);
  const activeForThisDiscipline =
    activeSession && activeSession.discipline === discipline.id ? activeSession : null;

  return <DisciplineDetailContent discipline={discipline} activeSession={activeForThisDiscipline} />;
}
