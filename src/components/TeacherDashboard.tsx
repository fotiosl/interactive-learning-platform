'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Student } from '@/types/student';
import {
  LogOut,
  ExternalLink,
  Copy,
  Check,
  GraduationCap,
  Sparkles,
  Search,
  Layers,
} from 'lucide-react';

interface TeacherDashboardProps {
  students: Student[];
}

export function TeacherDashboard({ students }: TeacherDashboardProps) {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  const handleCopyLink = (slug: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const url = `${origin}/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => {
      setCopiedSlug(null);
    }, 2000);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      window.location.reload();
    } catch {
      setLoggingOut(false);
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalTasks = students.reduce((acc, curr) => acc + curr.tasks.length, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navbar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3.5 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xs">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">
                Lehrer-Kommandozentrale
              </h1>
              <p className="text-xs text-slate-500">
                GoStudent Aufgaben- & Schülerverwaltung
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>{loggingOut ? 'Abmelden...' : 'Abmelden'}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        {/* Quick Stats Banner */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <p className="text-xs font-semibold text-slate-400">Aktive Schüler</p>
            <p className="mt-2 text-3xl font-extrabold text-blue-600">
              {students.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">Persönliche Schüler-Links</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <p className="text-xs font-semibold text-slate-400">Themenbereiche (Branches)</p>
            <p className="mt-2 text-3xl font-extrabold text-indigo-600">
              {totalTasks}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Aufgaben, Checklisten & Materialien
            </p>
          </div>

          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-800">
              <Sparkles className="h-4 w-4" />
              <span>Antigravity Workflow</span>
            </div>
            <p className="mt-2 text-xs text-indigo-950 leading-relaxed">
              Aufgaben und Themenbranches werden direkt im Code gepflegt. Änderungen gehen nach einem Commit in Sekunden live!
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Schüler oder Fach suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-hidden shadow-2xs"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Zeige {filteredStudents.length} von {students.length} Schülern
          </span>
        </div>

        {/* Student Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredStudents.map((student) => {
            const isCopied = copiedSlug === student.slug;

            return (
              <div
                key={student.slug}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:border-blue-300 hover:shadow-sm"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-lg font-bold shadow-xs text-white">
                        {student.avatarLetter}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg font-bold text-slate-900">
                            {student.name}
                          </h2>
                          <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-mono font-medium text-slate-600">
                            /{student.slug}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          {student.grade} {student.schoolType ? `• ${student.schoolType}` : ''}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      {student.subject}
                    </span>
                  </div>

                  {/* Teacher notes */}
                  {student.notesForTeacher && (
                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-950">
                      <span className="font-bold">Notiz: </span>
                      {student.notesForTeacher}
                    </div>
                  )}

                  {/* Task list preview */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Themenbereiche ({student.tasks.length}):
                      </p>
                      {student.dailyUnits && student.dailyUnits.length > 0 ? (
                        <Link
                          href={`/${student.slug}/${student.dailyUnits[0].date}`}
                          className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          Ordner {student.dailyUnits[0].date} →
                        </Link>
                      ) : student.tasks.length > 0 ? (
                        <Link
                          href={`/${student.slug}/${student.tasks[0].date || '03.10.2026'}`}
                          className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          Ordner {student.tasks[0].date || '03.10.2026'} →
                        </Link>
                      ) : null}
                    </div>
                    {student.tasks.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {student.tasks.map((t) => (
                          <Link
                            key={t.id}
                            href={`/${student.slug}/${t.date || '03.10.2026'}/${t.topicSlug}`}
                            className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          >
                            <Layers className="h-3 w-3 text-slate-400" />
                            <span>{t.topic}</span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">Noch keine Aufgaben angelegt.</p>
                    )}
                  </div>
                </div>

                {/* Actions at bottom */}
                <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleCopyLink(student.slug)}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Link kopiert!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-slate-500" />
                        <span>Link kopieren (/{student.slug})</span>
                      </>
                    )}
                  </button>

                  <Link
                    href={`/${student.slug}`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-blue-700"
                  >
                    <span>Zur Schüleransicht</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
