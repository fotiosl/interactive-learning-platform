import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getStudentMetaList,
  getStudentMetaBySlug,
  getLatestUnitSummary,
  getProbetestDTO,
} from '@/data/students';
import { ProbetestClient } from '@/components/ProbetestClient';
import { APP_FOOTER_TEXT, formatUnitBadgeLabel, IS_PUBLIC_MODE } from '@/lib/appMode';
import { ArrowLeft, Folder } from 'lucide-react';
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

interface DateProbetestPageProps {
  params: Promise<{
    student: string;
    date: string;
  }>;
}

export async function generateMetadata({ params }: DateProbetestPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const meta = getStudentMetaBySlug(resolvedParams.student);

  if (!meta) {
    return { title: IS_PUBLIC_MODE ? 'Probetest | Interactive Learning Platform' : 'Probetest | Lernplattform' };
  }

  return {
    title: IS_PUBLIC_MODE
      ? `Probetest – ${meta.name} | Interactive Learning Platform`
      : `Probetest (${resolvedParams.date}) – ${meta.name} | Lernplattform`,
    description: IS_PUBLIC_MODE
      ? `Interaktiver Probetest für das Modul ${meta.name}`
      : `Interaktiver Probetest für ${meta.name} zur Lerneinheit vom ${resolvedParams.date}`,
  };
}

export default async function DateProbetestPage({ params }: DateProbetestPageProps) {
  const resolvedParams = await params;
  const dto = getProbetestDTO(resolvedParams.student, resolvedParams.date);

  if (!dto || !dto.unitDate) {
    notFound();
  }

  const { meta, unitDate, topics } = dto;
  const unitLabel = formatUnitBadgeLabel(unitDate, unitDate);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/${meta.slug}/${unitDate}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <Folder className="h-3.5 w-3.5 text-blue-600" />
            <span>Zurück zur Lerneinheit ({unitLabel})</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold text-xs">
              {meta.avatarLetter}
            </span>
            <span>
              {meta.name} • Probetest{!IS_PUBLIC_MODE ? ` • ${unitDate}` : ''}
            </span>
          </div>
        </div>

        <ProbetestClient
          studentName={meta.name}
          studentSlug={meta.slug}
          backHref={`/${meta.slug}/${unitDate}`}
          topics={topics}
        />

        <footer className="mt-16 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          {APP_FOOTER_TEXT}
        </footer>
      </div>
    </main>
  );
}
