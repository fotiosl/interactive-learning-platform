'use client';

import { useState, useEffect } from 'react';
import { Student } from '@/types/student';
import { getStudentDailyUnits } from '@/data/students';
import { StudentHeader } from './StudentHeader';
import { DailyUnitsList } from './DailyUnitsList';
import Link from 'next/link';
import { BookOpen, ClipboardCheck, ArrowRight } from 'lucide-react';

interface StudentPageClientProps {
  student: Student;
  allStudents: { name: string; slug: string; avatarLetter: string }[];
}

export function StudentPageClient({ student, allStudents }: StudentPageClientProps) {
  const [isTeacherMode, setIsTeacherMode] = useState(false);

  useEffect(() => {
    fetch('/api/auth')
      .then((res) => res.json())
      .then((data) => {
        if (data?.isAuthenticated) setIsTeacherMode(true);
      })
      .catch(() => {});
  }, []);

  const dailyUnits = getStudentDailyUnits(student);
  const hasCheckableQuestions = student.tasks.some((t) =>
    (t.inputQuestions || []).some((q) => q.correctAnswers && q.correctAnswers.length > 0)
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <StudentHeader
        student={student}
        allStudents={allStudents}
        isTeacherMode={isTeacherMode}
      />

      {/* Featured Probetest Card */}
      {hasCheckableQuestions && (
        <Link
          href={`/${student.slug}/probetest`}
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
        <DailyUnitsList dailyUnits={dailyUnits} studentSlug={student.slug} />
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
        Lernplattform • Individuelle Nachhilfe & Aufgabenbetreuung
      </footer>
    </div>
  );
}

