import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getStudentBySlug, getAllStudents, getDailyUnit, getStudentDailyUnits } from '@/data/students';
import { TaskCard } from '@/components/TaskCard';
import { ArrowLeft, ArrowRight, Folder } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  const params: { student: string; date: string; topic: string }[] = [];
  const students = getAllStudents();

  for (const s of students) {
    const units = getStudentDailyUnits(s);
    for (const u of units) {
      for (const t of u.tasks) {
        params.push({
          student: s.slug,
          date: u.date,
          topic: t.topicSlug,
        });
      }
    }
  }

  return params;
}

interface TopicPageProps {
  params: Promise<{
    student: string;
    date: string;
    topic: string;
  }>;
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const student = getStudentBySlug(resolvedParams.student);
  const unit = student ? getDailyUnit(student, resolvedParams.date) : undefined;
  const task = unit?.tasks.find(
    (t) => t.topicSlug.toLowerCase() === resolvedParams.topic.toLowerCase()
  );

  if (!student || !task) {
    return { title: 'Thema | Lernplattform' };
  }

  return {
    title: `${task.title} – ${student.name} (${resolvedParams.date}) | Lernplattform`,
    description: task.description,
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const resolvedParams = await params;
  const student = getStudentBySlug(resolvedParams.student);

  if (!student) {
    notFound();
  }

  const unit = getDailyUnit(student, resolvedParams.date);
  if (!unit) {
    notFound();
  }

  const currentIndex = unit.tasks.findIndex(
    (t) => t.topicSlug.toLowerCase() === resolvedParams.topic.toLowerCase()
  );

  if (currentIndex === -1) {
    notFound();
  }

  const task = unit.tasks[currentIndex];
  const prevTask = currentIndex > 0 ? unit.tasks[currentIndex - 1] : null;
  const nextTask = currentIndex < unit.tasks.length - 1 ? unit.tasks[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Navigation Breadcrumb / Top Bar */}
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
              {student.name} • {unit.date} • Thema {currentIndex + 1} von {unit.tasks.length}
            </span>
          </div>
        </div>

        {/* Task Component */}
        <TaskCard
          task={task}
          studentSlug={student.slug}
        />

        {/* Bottom Pagination Between Topics of this day */}
        <div className="mt-8 flex items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs">
          {prevTask ? (
            <Link
              href={`/${student.slug}/${unit.date}/${prevTask.topicSlug}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Vorheriges Thema: {prevTask.topic}</span>
            </Link>
          ) : (
            <div />
          )}

          {nextTask ? (
            <Link
              href={`/${student.slug}/${unit.date}/${nextTask.topicSlug}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
            >
              <span>Nächstes Thema: {nextTask.topic}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <Link
              href={`/${student.slug}/${unit.date}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors"
            >
              <span>Zurück zur Lerneinheit ({unit.date})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        <footer className="mt-16 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          Lernplattform • Individuelle Nachhilfe & Aufgabenbetreuung
        </footer>
      </div>
    </main>
  );
}
