'use client';

import { useState, useMemo, useEffect } from 'react';
import { ChecklistItem } from '@/types/student';
import { Check, RotateCcw, FolderCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  getChecklistStorageKey,
  loadStoredData,
  saveStoredData,
  clearStoredData,
} from '@/lib/storage';

interface ChecklistGroupProps {
  items: ChecklistItem[];
  studentSlug?: string;
  taskId?: string;
}

export function ChecklistGroup({ items, studentSlug, taskId }: ChecklistGroupProps) {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const storageKey = studentSlug && taskId ? getChecklistStorageKey(studentSlug, taskId) : null;

  useEffect(() => {
    if (storageKey) {
      const saved = loadStoredData<Record<string, boolean>>(storageKey, {});
      setCheckedIds(saved);
    }
  }, [storageKey]);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (storageKey) {
        saveStoredData(storageKey, next);
      }

      const totalChecked = items.filter((item) => next[item.id]).length;
      if (totalChecked === items.length && items.length > 0) {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
        });
      }

      return next;
    });
  };

  const handleReset = () => {
    setCheckedIds({});
    if (storageKey) {
      clearStoredData(storageKey);
    }
  };

  const completedCount = items.filter((item) => checkedIds[item.id]).length;

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
      <div
        key={item.id}
        onClick={() => toggleItem(item.id)}
        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all ${
          isChecked
            ? 'border-emerald-300 bg-emerald-50/70 text-emerald-950 shadow-2xs'
            : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
        }`}
      >
        <div
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
            isChecked
              ? 'border-emerald-600 bg-emerald-600 text-white'
              : 'border-slate-300 bg-white'
          }`}
        >
          {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
        </div>
        <span
          className={`text-sm select-none ${
            isChecked ? 'line-through text-slate-500' : 'text-slate-800'
          }`}
        >
          {item.text}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Overall Progress Bar */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
        <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
          <span className="font-semibold text-slate-800">
            Gesamtfortschritt: {completedCount} von {items.length} Kompetenzen abgehakt ({Math.round((completedCount / (items.length || 1)) * 100)}%)
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
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
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
