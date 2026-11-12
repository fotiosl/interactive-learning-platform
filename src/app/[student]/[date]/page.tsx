import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import {
  getStudentMetaList,
  getStudentMetaBySlug,
  getLatestUnitSummary,
  getDailyUnitOverviewDTO,
  findLegacyTopicRedirect,
} from '@/data/students';
import { TopicBranchesList } from '@/components/TopicBranchesList';
import { TeacherStudentBar } from '@/components/TeacherModeBar';
import { APP_FOOTER_TEXT, formatUnitBadgeLabel, IS_PUBLIC_MODE } from '@/lib/appMode';
import { ArrowLeft, Calendar, FolderOpen, Layers } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  const params: { student: string; date: string }[] = [];

  for (const meta of getStudentMetaList()) {
    const latestUnit = getLatestUnitSummary(meta);
    if (latestUnit) {
      params.push({
        student: meta.slug,
        date: latestUnit.date,
      });
    }
  }

  return params;
}

interface DailyUnitPageProps {
  params: Promise<{
    student: string;
    date: string;
  }>;
}

export async function generateMetadata({ params }: DailyUnitPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const dto = getDailyUnitOverviewDTO(resolvedParams.student, resolvedParams.date);

  if (dto) {
    return {
      title: IS_PUBLIC_MODE
        ? `${dto.unit.title} – ${dto.meta.name} | Interactive Learning Platform`
        : `${dto.unit.title} – ${dto.meta.name} | Lernplattform`,
      description:
        dto.unit.description ||
        (IS_PUBLIC_MODE
          ? `Themenbereiche zu ${dto.unit.title}`
          : `Themenbereiche vom ${dto.unit.date} für ${dto.meta.name}`),
    };
  }

  const meta = getStudentMetaBySlug(resolvedParams.student);
  if (!meta) {
    return { title: IS_PUBLIC_MODE ? 'Lerneinheit | Interactive Learning Platform' : 'Lerneinheit | Lernplattform' };
  }

  return {
    title: IS_PUBLIC_MODE
      ? `${meta.name} | Interactive Learning Platform`
      : `${meta.name} | Lernplattform`,
  };
}

export default async function DailyUnitPage({ params }: DailyUnitPageProps) {
  const resolvedParams = await params;
  const dto = getDailyUnitOverviewDTO(resolvedParams.student, resolvedParams.date);

  if (!dto) {
    const legacy = findLegacyTopicRedirect(resolvedParams.student, resolvedParams.date);
    if (legacy) {
      redirect(`/${legacy.canonicalSlug}/${legacy.date}/${legacy.topicSlug}`);
    }
    notFound();
  }

  const { meta, unit } = dto;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
        <TeacherStudentBar currentSlug={meta.slug} />

        {/* Navigation Breadcrumb / Top Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/${meta.slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{IS_PUBLIC_MODE ? `Zurück zu ${meta.name}` : `Alle Lerneinheiten von ${meta.name}`}</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold text-xs">
              {meta.avatarLetter}
            </span>
            <span>
              {meta.name} • {meta.grade}
              {!IS_PUBLIC_MODE ? ` • ${unit.date}` : ''}
            </span>
          </div>
        </div>

        {/* Daily Learning Unit Banner */}
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md">
                <FolderOpen className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700">
                    <Calendar className="h-3 w-3" />
                    {formatUnitBadgeLabel(unit.id, unit.date)}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {IS_PUBLIC_MODE ? 'Lerneinheit' : 'Tages-Lerneinheit'}
                  </span>
                </div>
                <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  {unit.title}
                </h1>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/70 px-3.5 py-1.5 text-xs font-semibold text-blue-700">
              <Layers className="h-3.5 w-3.5 text-blue-600" />
              <span>{unit.topics.length} Themenbereiche</span>
            </span>
          </div>

          {unit.description && (
            <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
              {unit.description}
            </p>
          )}
        </div>

        {/* Topic Branches for this day */}
        <TopicBranchesList
          topics={unit.topics}
          hasCheckableQuestions={unit.hasCheckableQuestions}
          studentSlug={meta.slug}
          date={unit.date}
        />

        <footer className="mt-16 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          {APP_FOOTER_TEXT}
        </footer>
      </div>
    </main>
  );
}
