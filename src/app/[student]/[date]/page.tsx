import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { getStudentBySlug, getAllStudents, getDailyUnit, getStudentDailyUnits } from '@/data/students';
import { TopicBranchesList } from '@/components/TopicBranchesList';
import { ArrowLeft, Calendar, FolderOpen, Layers } from 'lucide-react';
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

    // Also support old URLs /[student]/[topicSlug] for static pre-rendering
    for (const t of s.tasks) {
      params.push({
        student: s.slug,
        date: t.topicSlug,
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
  const student = getStudentBySlug(resolvedParams.student);

  if (!student) {
    return { title: 'Lerneinheit | Lernplattform' };
  }

  // Check if it's an old topicSlug
  const matchedTask = student.tasks.find(
    (t) => t.topicSlug.toLowerCase() === resolvedParams.date.toLowerCase()
  );
  if (matchedTask) {
    return {
      title: `${matchedTask.title} – ${student.name} | Lernplattform`,
    };
  }

  const unit = getDailyUnit(student, resolvedParams.date);
  if (!unit) {
    return { title: `${student.name} | Lernplattform` };
  }

  return {
    title: `${unit.title} – ${student.name} | Lernplattform`,
    description: unit.description || `Themenbereiche vom ${unit.date} für ${student.name}`,
  };
}

export default async function DailyUnitPage({ params }: DailyUnitPageProps) {
  const resolvedParams = await params;
  const student = getStudentBySlug(resolvedParams.student);

  if (!student) {
    notFound();
  }

  // Backward compatibility: If the URL param matches an old topicSlug, redirect to the new branched URL!
  const matchedTask = student.tasks.find(
    (t) => t.topicSlug.toLowerCase() === resolvedParams.date.toLowerCase()
  );
  if (matchedTask) {
    redirect(`/${student.slug}/${matchedTask.date || '03.10.2026'}/${matchedTask.topicSlug}`);
  }

  const unit = getDailyUnit(student, resolvedParams.date);
  if (!unit) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Navigation Breadcrumb / Top Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/${student.slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Alle Lerneinheiten von {student.name}</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold text-xs">
              {student.avatarLetter}
            </span>
            <span>
              {student.name} • {student.grade} • {unit.date}
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
                    {unit.date}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Tages-Lerneinheit
                  </span>
                </div>
                <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  {unit.title}
                </h1>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/70 px-3.5 py-1.5 text-xs font-semibold text-blue-700">
              <Layers className="h-3.5 w-3.5 text-blue-600" />
              <span>{unit.tasks.length} Themenbereiche</span>
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
          tasks={unit.tasks}
          studentSlug={student.slug}
          date={unit.date}
        />

        <footer className="mt-16 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          Lernplattform • Individuelle Nachhilfe & Aufgabenbetreuung
        </footer>
      </div>
    </main>
  );
}
