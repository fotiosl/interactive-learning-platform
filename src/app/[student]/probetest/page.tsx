import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getStudentMetaList,
  getStudentMetaBySlug,
  getProbetestDTO,
} from '@/data/students';
import { ProbetestClient } from '@/components/ProbetestClient';
import { APP_FOOTER_TEXT, IS_PUBLIC_MODE } from '@/lib/appMode';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return getStudentMetaList().map((m) => ({
    student: m.slug,
  }));
}

interface ProbetestPageProps {
  params: Promise<{
    student: string;
  }>;
}

export async function generateMetadata({ params }: ProbetestPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const meta = getStudentMetaBySlug(resolvedParams.student);

  if (!meta) {
    return { title: IS_PUBLIC_MODE ? 'Probetest | Interactive Learning Platform' : 'Probetest | Lernplattform' };
  }

  return {
    title: IS_PUBLIC_MODE
      ? `Probetest – ${meta.name} | Interactive Learning Platform`
      : `Probetest – ${meta.name} | Lernplattform`,
    description: IS_PUBLIC_MODE
      ? `Interaktiver Probetest mit 10 zufälligen Fragen im Modul ${meta.name}`
      : `Interaktiver Probetest mit 10 zufälligen Fragen für ${meta.name}`,
  };
}

export default async function ProbetestPage({ params }: ProbetestPageProps) {
  const resolvedParams = await params;
  const dto = getProbetestDTO(resolvedParams.student);

  if (!dto) {
    notFound();
  }

  const { meta, topics } = dto;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/${meta.slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{IS_PUBLIC_MODE ? `Zurück zu ${meta.name}` : `Zurück zur Übersicht von ${meta.name}`}</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold text-xs">
              {meta.avatarLetter}
            </span>
            <span>{meta.name} • 10-Fragen Probetest</span>
          </div>
        </div>

        {/* Probetest Runner */}
        <ProbetestClient
          studentName={meta.name}
          studentSlug={meta.slug}
          backHref={`/${meta.slug}`}
          topics={topics}
        />

        <footer className="mt-16 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          {APP_FOOTER_TEXT}
        </footer>
      </div>
    </main>
  );
}
