import Link from 'next/link';
import { DailyUnitSummaryDTO } from '@/types/student';
import { formatUnitBadgeLabel, IS_PUBLIC_MODE } from '@/lib/appMode';
import {
  Folder,
  FolderOpen,
  Calendar,
  Layers,
  ArrowRight,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface DailyUnitsListProps {
  dailyUnits: DailyUnitSummaryDTO[];
  studentSlug: string;
}

export function DailyUnitsList({ dailyUnits, studentSlug }: DailyUnitsListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pt-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Folder className="h-5 w-5 text-blue-600" />
            <span>{IS_PUBLIC_MODE ? 'Lerneinheiten & Module' : 'Tages-Lerneinheiten (Ordner)'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {IS_PUBLIC_MODE
              ? 'Wähle eine Lerneinheit aus, um die zugehörigen Themenbereiche und Aufgaben zu bearbeiten:'
              : 'Wähle einen Tag / Ordner aus, um die zugehörigen Themenbereiche und Aufgaben zu bearbeiten:'}
          </p>
        </div>
        <span className="text-xs font-semibold rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
          {dailyUnits.length} {dailyUnits.length === 1 ? 'Lerneinheit' : 'Lerneinheiten'}
        </span>
      </div>

      {dailyUnits.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-8 sm:p-12 text-center shadow-xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
            <Folder className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Noch keine Lerneinheit angelegt</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            Sobald Themen und Schwerpunkte feststehen, erscheinen hier die Tages-Ordner und interaktiven Aufgaben.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {dailyUnits.map((unit) => (
            <div
              key={unit.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-7 shadow-xs transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xs group-hover:scale-105 transition-transform">
                      <FolderOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatUnitBadgeLabel(unit.id, unit.date)}
                      </span>
                      <h3 className="mt-1 text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {unit.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      <Layers className="h-3.5 w-3.5 text-blue-600" />
                      {unit.topics.length} {unit.topics.length === 1 ? 'Thema' : 'Themenbereiche'}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      <HelpCircle className="h-3.5 w-3.5 text-indigo-600" />
                      {unit.totalQuestions} Aufgaben
                    </span>
                  </div>
                </div>

                {unit.description && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {unit.description}
                  </p>
                )}

                <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-amber-500" />
                    Enthaltene Themenbereiche ({unit.topics.length}):
                  </p>
                  {unit.topics.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">
                      Noch keine Themenbereiche hinterlegt. Neue Aufgaben folgen in Kürze.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {unit.topics.map((task, idx) => (
                        <span
                          key={task.id}
                          className="inline-flex items-center gap-1 rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs"
                        >
                          <span className="text-[10px] font-extrabold text-blue-600">{idx + 1}.</span>
                          <span>{task.topic}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  {IS_PUBLIC_MODE
                    ? 'Öffne diese Lerneinheit, um die Themen und den Probetest zu starten.'
                    : 'Klicke auf den Ordner, um die Einheiten und den Probetest zu öffnen.'}
                </span>

                <Link
                  href={`/${studentSlug}/${unit.date}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs group-hover:bg-blue-700 transition-colors"
                >
                  <span>{IS_PUBLIC_MODE ? 'Einheit öffnen' : `Ordner öffnen (${unit.date})`}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
