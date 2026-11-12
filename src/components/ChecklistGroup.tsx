'use client';

import { useMemo } from 'react';
import { ChecklistItem } from '@/types/student';
import { Check, RotateCcw, FolderCheck } from 'lucide-react';
import { fireConfetti } from '@/lib/confetti';
import { getChecklistStorageKey, useStoredJson } from '@/lib/storage';

const EMPTY_CHECKED: Record<string, boolean> = {};

interface ChecklistGroupProps {
  items: ChecklistItem[];
  studentSlug?: string;
  taskId?: string;
}

export function ChecklistGroup({ items, studentSlug, taskId }: ChecklistGroupProps) {
  const storageKey = studentSlug && taskId ? getChecklistStorageKey(studentSlug, taskId) : null;
  const [checkedIds, setCheckedIds] = useStoredJson<Record<string, boolean>>(
    storageKey,
    EMPTY_CHECKED
  );

  const toggleItem = (id: string) => {
    const next = { ...checkedIds, [id]: !checkedIds[id] };
    setCheckedIds(next);

    const totalChecked = items.filter((item) => next[item.id]).length;
    if (totalChecked === items.length && items.length > 0) {
      fireConfetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const handleReset = () => {
    setCheckedIds(null);
  };

  const completedCount = items.filter((item) => checkedIds[item.id]).length;
  const progressPercent = Math.round((completedCount / (items.length || 1)) * 100);

  // Group by category if present
  const hasCategories = items.some((item) => !!item.category);
  const groupedCategories = useMemo(() => {
    if (!hasCategories) return null;
    const map = new Map<string, ChecklistItem[]>();
    for (const item of items) {
      const cat = item.category || 'Allgemein';
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(item);
    }
    return Array.from(map.entries());
  }, [items, hasCategories]);

  const renderItemCard = (item: ChecklistItem) => {
    const isChecked = !!checkedIds[item.id];
    return (
      <button
        key={item.id}
        type="button"
        role="checkbox"
        aria-checked={isChecked}
        onClick={() => toggleItem(item.id)}
        className={`flex w-full cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-left transition-all focus:outline-hidden focus:ring-2 focus:ring-emerald-400 ${
          isChecked
            ? 'border-emerald-300 bg-emerald-50/70 text-emerald-950 shadow-2xs'
            : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
        }`}
      >
        <span
          aria-hidden="true"
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
            isChecked
              ? 'border-emerald-600 bg-emerald-600 text-white'
              : 'border-slate-300 bg-white'
          }`}
        >
          {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
        </span>
        <span
          className={`text-sm select-none ${
            isChecked ? 'line-through text-slate-500' : 'text-slate-800'
          }`}
        >
          {item.text}
        </span>
      </button>
    );
  };

  return (
    <div className="space-y-4">
      {/* Overall Progress Bar */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
        <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
          <span className="font-semibold text-slate-800">
            Gesamtfortschritt: {completedCount} von {items.length} Kompetenzen abgehakt ({progressPercent}%)
          </span>
          {completedCount > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" /> Zurücksetzen
            </button>
          )}
        </div>
        <div
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Kompetenzen-Fortschritt"
          className="h-2 w-full overflow-hidden rounded-full bg-slate-200"
        >
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${(completedCount / (items.length || 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Grouped or Flat List */}
      {groupedCategories ? (
        <div className="space-y-5">
          {groupedCategories.map(([category, catItems]) => {
            const catDone = catItems.filter((it) => checkedIds[it.id]).length;
            const isCatComplete = catDone === catItems.length && catItems.length > 0;
            return (
              <div key={category} className="space-y-2 rounded-2xl border border-slate-200/80 bg-slate-50/30 p-3.5">
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-2">
                    <FolderCheck className={`h-4 w-4 ${isCatComplete ? 'text-emerald-600' : 'text-indigo-600'}`} />
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {category}
                    </h5>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    isCatComplete
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {catDone} / {catItems.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {catItems.map((item) => renderItemCard(item))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => renderItemCard(item))}
        </div>
      )}
    </div>
  );
}
