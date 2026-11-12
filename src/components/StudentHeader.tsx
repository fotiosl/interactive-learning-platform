import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { IS_PUBLIC_MODE } from '@/lib/appMode';
import { TeacherStudentBar } from './TeacherModeBar';

interface StudentHeaderProps {
  slug: string;
  name: string;
  grade: string;
  schoolType?: string;
  subject: string;
  avatarLetter: string;
  totalTopics: number;
}

export function StudentHeader({
  slug,
  name,
  grade,
  schoolType,
  subject,
  avatarLetter,
  totalTopics,
}: StudentHeaderProps) {
  return (
    <header className="mb-8">
      <TeacherStudentBar currentSlug={slug} />

      {IS_PUBLIC_MODE && (
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Alle Lernmodule</span>
          </Link>
        </div>
      )}

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-2xl font-bold shadow-md text-white">
              {avatarLetter}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  {IS_PUBLIC_MODE ? name : `Hallo ${name}!`}
                </h1>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-600">
                {grade} {schoolType ? `• ${schoolType}` : ''} •{' '}
                <span className="text-blue-600 font-semibold">{subject}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/70 px-3.5 py-1.5 text-xs font-semibold text-blue-700 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>
              {totalTopics} {totalTopics === 1 ? 'Themenbereich' : 'Themenbereiche'}
            </span>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-500 max-w-2xl leading-relaxed">
          {IS_PUBLIC_MODE
            ? 'Wähle unten eine Lerneinheit aus, um direkt mit den interaktiven Übungen oder dem Probetest zu starten!'
            : 'Hier findest du deine Übungsbereiche. Wähle unten ein Thema aus, um direkt mit den Aufgaben zu starten!'}
        </p>
      </div>
    </header>
  );
}
