'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Student } from '@/types/student';
import { Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';

interface StudentHeaderProps {
  student: Student;
  allStudents?: { name: string; slug: string; avatarLetter: string }[];
  isTeacherMode?: boolean;
}

export function StudentHeader({
  student,
  allStudents = [],
  isTeacherMode = false,
}: StudentHeaderProps) {
  const router = useRouter();

  return (
    <header className="mb-8">
      {/* Teacher Bar if teacher is browsing */}
      {isTeacherMode && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-xs text-indigo-950">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>
            <span className="font-semibold">Lehrer-Modus aktiv:</span>
            <span>Musterlösungen & didaktische Hinweise sind eingeblendet.</span>
          </div>

          <div className="flex items-center gap-2">
            {allStudents.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">Schüler wechseln:</span>
                <select
                  value={student.slug}
                  onChange={(e) => {
                    router.push(`/${e.target.value}`);
                  }}
                  className="rounded-md border border-indigo-200 bg-white px-2 py-1 text-xs font-medium text-slate-800 shadow-2xs cursor-pointer"
                >
                  {allStudents.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name} ({s.avatarLetter})
                    </option>
                  ))}
                </select>
              </div>
            )}
            <Link
              href="/"
              className="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-2.5 py-1 font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              <ArrowLeft className="h-3 w-3" /> Zentrale
            </Link>
          </div>
        </div>
      )}

      {/* Main Student Card Header */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-2xl font-bold shadow-md text-white">
              {student.avatarLetter}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  Hallo {student.name}!
                </h1>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-600">
                {student.grade} {student.schoolType ? `• ${student.schoolType}` : ''} •{' '}
                <span className="text-blue-600 font-semibold">
                  {student.subject}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/70 px-3.5 py-1.5 text-xs font-semibold text-blue-700 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>{student.tasks.length} {student.tasks.length === 1 ? 'Themenbereich' : 'Themenbereiche'}</span>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-500 max-w-2xl leading-relaxed">
          Hier findest du deine Übungsbereiche. Wähle unten ein Thema aus, um direkt mit den Aufgaben zu starten!
        </p>
      </div>
    </header>
  );
}
