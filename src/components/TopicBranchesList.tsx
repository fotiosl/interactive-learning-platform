'use client';

import Link from 'next/link';
import { Task } from '@/types/student';
import { ArrowRight, BookOpen, Calendar, ListChecks, HelpCircle, ClipboardCheck } from 'lucide-react';

interface TopicBranchesListProps {
  tasks: Task[];
  studentSlug: string;
  date?: string;
}

export function TopicBranchesList({ tasks, studentSlug, date }: TopicBranchesListProps) {
  const effectiveDate = date || tasks[0]?.date || '03.10.2026';
  const hasCheckableQuestions = tasks.some((t) =>
    (t.inputQuestions || []).some((q) => q.correctAnswers && q.correctAnswers.length > 0)
  );

  return (
    <div className="space-y-6">
      {/* Featured Probetest Card */}
      {hasCheckableQuestions && (
        <Link
          href={`/${studentSlug}/${effectiveDate}/probetest`}
          className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border-2 border-indigo-200 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-white p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md cursor-pointer"
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
                Wähle deine Themen aus und prüfe dein Wissen mit automatischer Auswertung nach Themen.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs group-hover:bg-indigo-700 transition-colors">
            <span>Probetest starten</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </Link>
      )}

      <div className="flex items-center justify-between pt-2">
        <h2 className="text-base font-bold text-slate-900">
          Wähle ein Thema zum Üben:
        </h2>
        <span className="text-xs font-medium text-slate-500">
          {tasks.length} {tasks.length === 1 ? 'Themenbereich' : 'Themenbereiche'}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-xs">
          <BookOpen className="mx-auto h-8 w-8 text-slate-300 mb-2" />
          <p className="text-sm font-semibold text-slate-700">
            Noch keine Aufgaben oder Themenbereiche hinterlegt
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Hier werden in Kürze die neuen Übungseinheiten für diesen Tag erscheinen.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tasks.map((task, index) => {
          const questionCount = task.inputQuestions?.length || task.checklistItems?.length || 0;

          return (
            <Link
              key={task.id}
              href={`/${studentSlug}/${effectiveDate}/${task.topicSlug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 font-semibold text-blue-700">
                    <BookOpen className="h-3 w-3" />
                    Teil {index + 1}
                  </span>
                  {task.dateBadge && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
                      <Calendar className="h-3 w-3" />
                      {task.dateBadge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {task.title}
                </h3>

                <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {task.description}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="inline-flex items-center gap-1 font-medium text-slate-500">
                  {task.type === 'checklist' ? (
                    <ListChecks className="h-3.5 w-3.5 text-blue-600" />
                  ) : (
                    <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
                  )}
                  {questionCount} {task.type === 'checklist' ? 'Punkte' : 'Übungen'}
                </span>

                <span className="inline-flex items-center gap-1 font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                  Üben starten
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
        </div>
      )}
    </div>
  );
}
