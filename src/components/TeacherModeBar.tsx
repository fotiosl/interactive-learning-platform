'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { IS_PUBLIC_MODE } from '@/lib/appMode';

export function hasTeacherHintCookie(): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.split(';').some((c) => c.trim().startsWith('teacher_mode=1'));
}

interface RosterEntry {
  name: string;
  slug: string;
  avatarLetter: string;
}

export function TeacherStudentBar({ currentSlug }: { currentSlug: string }) {
  const router = useRouter();
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [roster, setRoster] = useState<RosterEntry[]>([]);

  useEffect(() => {
    if (!hasTeacherHintCookie()) return;

    fetch('/api/auth?roster=1')
      .then((res) => res.json())
      .then((data) => {
        if (data?.isAuthenticated) {
          setIsTeacherMode(true);
          if (Array.isArray(data.students)) {
            setRoster(data.students);
          }
        }
      })
      .catch(() => {});
  }, []);

  if (!isTeacherMode) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-xs text-indigo-950">
      <div className="flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white">
          <ShieldCheck className="h-3.5 w-3.5" />
        </span>
        <span className="font-semibold">Lehrer-Modus aktiv:</span>
        <span>Musterlösungen & didaktische Hinweise sind eingeblendet.</span>
      </div>

      <div className="flex items-center gap-2">
        {roster.length > 0 && (
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">
              {IS_PUBLIC_MODE ? 'Modul wechseln:' : 'Schüler wechseln:'}
            </span>
            <select
              value={currentSlug}
              onChange={(e) => {
                router.push(`/${e.target.value}`);
              }}
              className="rounded-md border border-indigo-200 bg-white px-2 py-1 text-xs font-medium text-slate-800 shadow-2xs cursor-pointer"
            >
              {roster.map((s) => (
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
  );
}
