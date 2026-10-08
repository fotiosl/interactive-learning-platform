import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getStudentBySlug, getAllStudents, getDailyUnit, getStudentDailyUnits } from '@/data/students';
import { ProbetestClient } from '@/components/ProbetestClient';
import { ArrowLeft, Folder } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  const params: { student: string; date: string }[] = [];
  const students = getAllStudents();

  for (const s of students) {
    const units = getStudentDailyUnits(s);
    for (const u of units) {
      params.push({
        student: s.slug,
        date: u.date,
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
  const student = getStudentBySlug(resolvedParams.student);

  if (!student) {
    return { title: 'Probetest | Lernplattform' };
  }

  return {
    title: `Probetest (${resolvedParams.date}) – ${student.name} | Lernplattform`,
    description: `Interaktiver Probetest für ${student.name} zur Lerneinheit vom ${resolvedParams.date}`,
  };
}

export default async function DateProbetestPage({ params }: DateProbetestPageProps) {
  const resolvedParams = await params;
  const student = getStudentBySlug(resolvedParams.student);

  if (!student) {
    notFound();
  }

  const unit = getDailyUnit(student, resolvedParams.date);
  if (!unit) {
    notFound();
  }

  // Scoped student object with only this date's tasks
  const scopedStudent = {
    ...student,
    tasks: unit.tasks,
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/${student.slug}/${unit.date}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <Folder className="h-3.5 w-3.5 text-blue-600" />
            <span>Zurück zur Lerneinheit ({unit.date})</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold text-xs">
              {student.avatarLetter}
            </span>
            <span>
              {student.name} • Probetest • {unit.date}
            </span>
          </div>
        </div>

        <ProbetestClient student={scopedStudent} />

        <footer className="mt-16 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          Lernplattform • Individuelle Nachhilfe & Aufgabenbetreuung
        </footer>
      </div>
    </main>
  );
}
