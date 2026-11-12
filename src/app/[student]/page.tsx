import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getStudentMetaList,
  getStudentMetaBySlug,
  getStudentOverviewDTO,
} from '@/data/students';
import { StudentHeader } from '@/components/StudentHeader';
import { DailyUnitsList } from '@/components/DailyUnitsList';
import { APP_FOOTER_TEXT, IS_PUBLIC_MODE } from '@/lib/appMode';
import { BookOpen, ClipboardCheck, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return getStudentMetaList().map((m) => ({
    student: m.slug,
  }));
}

interface StudentPageProps {
  params: Promise<{
    student: string;
  }>;
}

export async function generateMetadata({ params }: StudentPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const meta = getStudentMetaBySlug(resolvedParams.student);

  if (!meta) {
    return { title: IS_PUBLIC_MODE ? 'Interactive Learning Platform' : 'Lernplattform' };
  }

  return {
    title: IS_PUBLIC_MODE
      ? `${meta.name} | Interactive Learning Platform`
      : `${meta.name} | Lernplattform`,
    description: IS_PUBLIC_MODE
      ? `Interaktive Übungen und Lerneinheiten im Modul ${meta.name}`
      : `Aufgaben und Lernmaterialien für ${meta.name}`,
  };
}

export default async function StudentPage({ params }: StudentPageProps) {
  const resolvedParams = await params;
  const overview = getStudentOverviewDTO(resolvedParams.student);

  if (!overview) {
    notFound();
  }

  const { meta, totalTopics, hasCheckableQuestions, dailyUnits } = overview;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <StudentHeader
          slug={meta.slug}
          name={meta.name}
          grade={meta.grade}
          schoolType={meta.schoolType}
          subject={meta.subject}
          avatarLetter={meta.avatarLetter}
          totalTopics={totalTopics}
        />

        {hasCheckableQuestions && (
          <Link
            href={`/${meta.slug}/probetest`}
            className="group mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border-2 border-indigo-200 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-white p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xs">
                <ClipboardCheck className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-indigo-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Probetest
                  </span>
                  <span className="text-xs font-semibold text-indigo-700">10 zufällige Aufgaben</span>
                </div>
                <h3 className="mt-1 text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Interaktiver Probetest & Wissens-Check
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Prüfe dein Wissen über alle Einheiten mit automatischer Auswertung nach Themen.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs group-hover:bg-indigo-700 transition-colors">
              <span>Probetest starten</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        )}

        {dailyUnits.length > 0 ? (
          <DailyUnitsList dailyUnits={dailyUnits} studentSlug={meta.slug} />
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center bg-white">
            <BookOpen className="mx-auto h-12 w-12 text-slate-400 mb-3" />
            <h2 className="text-lg font-semibold text-slate-800">
              Noch keine neuen Aufgaben eingetragen
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Neue Übungen und Arbeitsblätter werden in Kürze für dich freigeschaltet!
            </p>
          </div>
        )}

        <footer className="mt-16 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          {APP_FOOTER_TEXT}
        </footer>
      </div>
    </main>
  );
}
