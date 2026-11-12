'use client';

import { useState, useRef } from 'react';
import { QuestionInteractionType } from '@/types/student';
import { formatSentenceTiles } from '@/lib/normalize';
import { GripVertical, ChevronLeft, ChevronRight, Calculator, FileEdit } from 'lucide-react';

export interface TileItem {
  id: string;
  text: string;
}

export function createTileItems(tiles?: string[], prefix = 'tile'): TileItem[] {
  if (!tiles) return [];
  return formatSentenceTiles(tiles).map((text, idx) => ({
    id: `${prefix}-${idx}-${text}`,
    text,
  }));
}

export function reconstructTileItemsFromSaved(
  savedTexts: string[],
  initialItems: TileItem[]
): TileItem[] {
  if (!Array.isArray(savedTexts) || savedTexts.length !== initialItems.length) {
    return initialItems;
  }
  const pool = [...initialItems];
  const reconstructed: TileItem[] = [];
  for (const text of savedTexts) {
    const idx = pool.findIndex((item) => item.text === text);
    if (idx === -1) return initialItems;
    reconstructed.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return reconstructed;
}

interface QuestionInteractionFieldsProps {
  interactionType: QuestionInteractionType;
  value: string;
  onValueChange: (val: string) => void;
  tilesList: TileItem[];
  onTilesChange: (next: TileItem[]) => void;
  words?: string[];
  selectedWordIndices: number[];
  onSelectedWordsChange: (indices: number[]) => void;
  options?: string[];
  placeholder?: string;
  isOpenEnded?: boolean;
  status?: 'idle' | 'correct' | 'incorrect';
  showCheckButtons?: boolean;
  hasCheckableAnswer?: boolean;
  onSubmit?: () => void;
  autoFocusInput?: boolean;
  rechenweg?: string;
  onRechenwegChange?: (val: string) => void;
}

export function QuestionInteractionFields({
  interactionType,
  value,
  onValueChange,
  tilesList,
  onTilesChange,
  words = [],
  selectedWordIndices,
  onSelectedWordsChange,
  options,
  placeholder,
  isOpenEnded,
  status = 'idle',
  showCheckButtons = false,
  hasCheckableAnswer = true,
  onSubmit,
  autoFocusInput = false,
  rechenweg = '',
  onRechenwegChange,
}: QuestionInteractionFieldsProps) {
  const [activeField, setActiveField] = useState<'result' | 'rechenweg'>('result');
  const rechenwegRef = useRef<HTMLTextAreaElement | null>(null);
  const resultInputRef = useRef<HTMLInputElement | null>(null);
  const draggedTileIdRef = useRef<string | null>(null);
  const [draggedTileId, setDraggedTileId] = useState<string | null>(null);
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);

  const reorderTilesById = (fromId: string, toId: string) => {
    if (fromId === toId) return;
    const fromIdx = tilesList.findIndex((t) => t.id === fromId);
    const toIdx = tilesList.findIndex((t) => t.id === toId);
    if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return;

    const next = [...tilesList];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    onTilesChange(next);
  };

  const nudgeTile = (idx: number, delta: -1 | 1) => {
    const targetIdx = idx + delta;
    if (targetIdx < 0 || targetIdx >= tilesList.length) return;
    const next = [...tilesList];
    const [moved] = next.splice(idx, 1);
    next.splice(targetIdx, 0, moved);
    onTilesChange(next);
  };

  const handleTileClickToSwap = (id: string) => {
    if (selectedTileId === null) {
      setSelectedTileId(id);
    } else if (selectedTileId === id) {
      setSelectedTileId(null);
    } else {
      const idxA = tilesList.findIndex((t) => t.id === selectedTileId);
      const idxB = tilesList.findIndex((t) => t.id === id);
      if (idxA !== -1 && idxB !== -1) {
        const next = [...tilesList];
        [next[idxA], next[idxB]] = [next[idxB], next[idxA]];
        onTilesChange(next);
      }
      setSelectedTileId(null);
    }
  };

  const handleToggleWord = (idx: number) => {
    const next = selectedWordIndices.includes(idx)
      ? selectedWordIndices.filter((i) => i !== idx)
      : [...selectedWordIndices, idx].sort((a, b) => a - b);
    onSelectedWordsChange(next);
  };

  const isChoice = interactionType === 'choice' || Boolean(options && options.length > 0);

  // 1. SENTENCE BUILDER
  if (interactionType === 'sentence_builder' && tilesList.length > 0) {
    const sentence = tilesList
      .map((t) => t.text)
      .join(' ')
      .replace(/,\s*$/, '');
    const displaySentence = /[.?!]$/.test(sentence) ? sentence : `${sentence}.`;

    return (
      <div className="mt-4 space-y-3.5">
        <p className="text-xs text-slate-500 font-medium">
          Bringe die Bausteine in die richtige Reihenfolge:
        </p>

        <div
          className="flex flex-wrap items-center gap-2.5 min-h-[50px] p-2 rounded-2xl bg-slate-100/60 border border-dashed border-slate-300/80"
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
          }}
          onDrop={(e) => {
            e.preventDefault();
            draggedTileIdRef.current = null;
            setDraggedTileId(null);
          }}
        >
          {tilesList.map((tile, idx) => {
            const isSelected = selectedTileId === tile.id;
            const isDragging = draggedTileId === tile.id;

            return (
              <div
                key={tile.id}
                draggable
                onDragStart={(e) => {
                  draggedTileIdRef.current = tile.id;
                  setDraggedTileId(tile.id);
                  e.dataTransfer.effectAllowed = 'move';
                  e.dataTransfer.setData('text/plain', tile.id);
                }}
                onDragEnter={(e) => {
                  e.preventDefault();
                  const draggedId = draggedTileIdRef.current;
                  if (draggedId && draggedId !== tile.id) {
                    reorderTilesById(draggedId, tile.id);
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                }}
                onDragEnd={() => {
                  draggedTileIdRef.current = null;
                  setDraggedTileId(null);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const draggedId = draggedTileIdRef.current;
                  if (draggedId && draggedId !== tile.id) {
                    reorderTilesById(draggedId, tile.id);
                  }
                  draggedTileIdRef.current = null;
                  setDraggedTileId(null);
                }}
                className={`group relative flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-semibold shadow-2xs transition-all duration-200 ease-out select-none ${
                  isDragging
                    ? 'opacity-40 scale-95 border-dashed border-indigo-400 bg-indigo-50/60 shadow-inner'
                    : isSelected
                    ? '-translate-y-1 border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-400 shadow-md scale-105'
                    : 'border-slate-300 bg-white text-slate-800 hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-xs'
                }`}
              >
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleTileClickToSwap(tile.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowLeft' && idx > 0) {
                      e.preventDefault();
                      nudgeTile(idx, -1);
                    } else if (e.key === 'ArrowRight' && idx < tilesList.length - 1) {
                      e.preventDefault();
                      nudgeTile(idx, 1);
                    }
                  }}
                  title="Ziehen oder klicken zum Tauschen, Pfeiltasten links/rechts zum Verschieben"
                  className="flex items-center gap-2 cursor-grab active:cursor-grabbing text-left focus:outline-hidden focus-visible:underline"
                >
                  <GripVertical className="h-4 w-4 text-slate-400 group-hover:text-slate-600 shrink-0 pointer-events-none" />
                  <span className="select-none">{tile.text}</span>
                </button>

                <div className="flex items-center gap-0.5 ml-1 pl-1.5 border-l border-slate-200">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => nudgeTile(idx, -1)}
                    aria-label={`${tile.text} nach links schieben`}
                    title="Nach links schieben"
                    className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20 cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === tilesList.length - 1}
                    onClick={() => nudgeTile(idx, 1)}
                    aria-label={`${tile.text} nach rechts schieben`}
                    title="Nach rechts schieben"
                    className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20 cursor-pointer transition-colors"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {selectedTileId !== null && (
          <p className="text-xs text-indigo-700 font-medium bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-1.5">
            1. Kachel ausgewählt: Klicke jetzt auf eine zweite Kachel, um die beiden Plätze zu tauschen.
          </p>
        )}

        <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-xs shadow-2xs">
          <span className="text-slate-400 font-medium">Dein zusammengesetzter Satz:</span>
          <p className="mt-1 text-base font-bold text-slate-900 tracking-wide">{displaySentence}</p>
        </div>

        {showCheckButtons && onSubmit && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSubmit}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 cursor-pointer"
            >
              Satz prüfen
            </button>
            <span className="text-[11px] text-slate-400">
              Tipp: Kacheln können gezogen oder mit den Pfeilen verschoben werden.
            </span>
          </div>
        )}
      </div>
    );
  }

  // 2. WORD SELECT
  if (interactionType === 'word_select' && words.length > 0) {
    return (
      <div className="mt-4 space-y-3">
        <p className="text-xs text-slate-500 font-medium">
          Klicke auf das oder die gesuchten Wörter im Satz:
        </p>

        <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50/60">
          {words.map((word, idx) => {
            const isSelected = selectedWordIndices.includes(idx);
            return (
              <button
                key={`${word}-${idx}`}
                type="button"
                onClick={() => handleToggleWord(idx)}
                className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                    : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-100'
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {showCheckButtons && onSubmit && (
            <button
              type="button"
              onClick={onSubmit}
              disabled={selectedWordIndices.length === 0}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
            >
              Auswahl prüfen
            </button>
          )}
          {selectedWordIndices.length > 0 && (
            <span className="text-xs text-slate-600 font-medium">
              Ausgewählt:{' '}
              <span className="font-bold text-blue-700">
                {selectedWordIndices.map((i) => words[i]).join(' ')}
              </span>
            </span>
          )}
        </div>
      </div>
    );
  }

  // 3. CHOICE
  if (isChoice && options) {
    return (
      <div className="mt-4 space-y-3">
        <p className="text-xs text-slate-500 font-medium">Wähle die passende Antwort aus:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {options.map((option, optIdx) => {
            const isSelected = value === option;
            return (
              <button
                key={`${option}-${optIdx}`}
                type="button"
                onClick={() => onValueChange(option)}
                className={`flex items-start gap-3 p-3.5 rounded-xl border text-left text-sm font-semibold transition-all cursor-pointer select-none ${
                  isSelected
                    ? status === 'correct'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-400 shadow-xs'
                      : status === 'incorrect'
                      ? 'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-400 shadow-xs'
                      : 'border-blue-600 bg-blue-50 text-blue-950 ring-2 ring-blue-500 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors mt-0.5 ${
                    isSelected
                      ? status === 'correct'
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : status === 'incorrect'
                        ? 'border-rose-500 bg-rose-500 text-white'
                        : 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-300 text-slate-400 bg-white'
                  }`}
                >
                  {String.fromCharCode(65 + optIdx)}
                </div>
                <span className="leading-snug">{option}</span>
              </button>
            );
          })}
        </div>

        {showCheckButtons && onSubmit && (
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onSubmit}
              disabled={!value}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
            >
              Antwort prüfen
            </button>
            {value && (
              <span className="text-xs text-slate-500">
                Ausgewählt: <strong className="text-slate-800">{value}</strong>
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  // 4. STANDARD TEXT INPUT / TEXTAREA
  if (interactionType === 'input' && !options) {
    return (
      <div className="mt-3">
        {isOpenEnded ? (
          <textarea
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder={placeholder || 'Schreibe hier deine Antwort / Begründung...'}
            rows={3}
            className="w-full rounded-lg border border-slate-300 bg-slate-50/70 p-2.5 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:bg-white focus:outline-hidden"
          />
        ) : (
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              autoFocus={autoFocusInput}
              value={value}
              onChange={(e) => onValueChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && onSubmit) onSubmit();
              }}
              placeholder={placeholder || 'Antwort eingeben...'}
              className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-hidden ${
                status === 'correct'
                  ? 'border-emerald-500 bg-emerald-50/60 text-emerald-950 font-medium'
                  : status === 'incorrect'
                  ? 'border-rose-400 bg-rose-50/50 text-rose-950 font-medium'
                  : 'border-slate-300 bg-slate-50/70 text-slate-900 focus:border-blue-500 focus:bg-white'
              }`}
            />
            {showCheckButtons && hasCheckableAnswer && onSubmit && (
              <button
                type="button"
                onClick={onSubmit}
                disabled={!value.trim()}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
              >
                Prüfen
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // 5. MATHEMATICAL CALCULATION (rechnung)
  if (interactionType === 'rechnung') {
    const mathSymbols = [
      { label: '√', insert: '√' },
      { label: '²', insert: '²' },
      { label: '³', insert: '³' },
      { label: '·', insert: '·' },
      { label: ':', insert: ':' },
      { label: '+', insert: '+' },
      { label: '−', insert: '-' },
      { label: '±', insert: '±' },
      { label: 'π', insert: 'π' },
      { label: '(', insert: '(' },
      { label: ')', insert: ')' },
      { label: '=', insert: '=' },
    ];
    const mathUnits = ['cm', 'm', 'dm', 'mm', 'cm²', 'm²'];

    const handleInsertSymbol = (sym: string, isUnit = false) => {
      const targetField = activeField === 'rechenweg' && onRechenwegChange ? 'rechenweg' : 'result';
      const el = targetField === 'rechenweg' ? rechenwegRef.current : resultInputRef.current;
      const currentVal = targetField === 'rechenweg' ? rechenweg : value;
      const updateFn = targetField === 'rechenweg' ? onRechenwegChange : onValueChange;
      if (!updateFn) return;

      const isFocused = el !== null && document.activeElement === el;
      const start =
        isFocused && typeof el.selectionStart === 'number' ? el.selectionStart : currentVal.length;
      const end =
        isFocused && typeof el.selectionEnd === 'number' ? el.selectionEnd : currentVal.length;

      const before = currentVal.slice(0, start);
      const needsLeadingSpace = isUnit && before.length > 0 && !/\s$/.test(before);
      const insertion = needsLeadingSpace ? ` ${sym}` : sym;

      updateFn(before + insertion + currentVal.slice(end));

      if (el) {
        const nextCursor = start + insertion.length;
        requestAnimationFrame(() => {
          el.focus();
          el.setSelectionRange(nextCursor, nextCursor);
        });
      }
    };

    return (
      <div className="mt-4 space-y-3.5">
        {/* Math Symbol Helper Toolbar */}
        <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-2.5">
          <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
            <span className="text-[11px] font-semibold text-amber-900 flex items-center gap-1.5">
              <Calculator className="h-3.5 w-3.5 text-amber-600" />
              Mathematische Symbole & Einheiten:
            </span>
            <span className="text-[10px] text-amber-700/80">
              Klicken zum Einfügen
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {mathSymbols.map((sym) => (
              <button
                key={sym.label}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleInsertSymbol(sym.insert)}
                className="h-7 min-w-[28px] px-2 rounded-md border border-amber-300/80 bg-white text-xs font-bold text-amber-950 shadow-2xs hover:bg-amber-100/70 active:scale-95 transition-all cursor-pointer font-mono"
              >
                {sym.label}
              </button>
            ))}
            <span className="h-4 w-px bg-amber-300 mx-0.5" />
            {mathUnits.map((u) => (
              <button
                key={u}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleInsertSymbol(u, true)}
                className="h-7 px-2 rounded-md border border-amber-300/80 bg-white text-[11px] font-semibold text-amber-900 shadow-2xs hover:bg-amber-100/70 active:scale-95 transition-all cursor-pointer"
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* Rechenweg / Intermediate Scratchpad */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <FileEdit className="h-3.5 w-3.5 text-blue-600" />
              <span>Rechenweg & Zwischenschritte (Notizfeld):</span>
            </label>
          </div>
          <textarea
            ref={rechenwegRef}
            value={rechenweg}
            onFocus={() => setActiveField('rechenweg')}
            onChange={(e) => onRechenwegChange?.(e.target.value)}
            placeholder="Hier Rechenweg, Formeln und Zwischenschritte notieren..."
            rows={2}
            className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-xs sm:text-sm text-slate-900 font-mono transition-colors focus:border-amber-500 focus:outline-hidden"
          />
        </div>

        {/* Result Input Field */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            Endergebnis eingeben:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                ref={resultInputRef}
                type="text"
                autoFocus={autoFocusInput}
                value={value}
                onFocus={() => setActiveField('result')}
                onChange={(e) => onValueChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && onSubmit) onSubmit();
                }}
                placeholder={placeholder || 'Ergebnis mit Einheit eingeben...'}
                className={`w-full rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus:outline-hidden ${
                  status === 'correct'
                    ? 'border-emerald-500 bg-emerald-50/60 text-emerald-950 font-bold'
                    : status === 'incorrect'
                    ? 'border-rose-400 bg-rose-50/50 text-rose-950'
                    : 'border-slate-300 bg-slate-50/70 text-slate-900 focus:border-amber-500 focus:bg-white'
                }`}
              />
            </div>
            {showCheckButtons && hasCheckableAnswer && onSubmit && (
              <button
                type="button"
                onClick={onSubmit}
                disabled={!value.trim()}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-amber-700 disabled:opacity-50 cursor-pointer"
              >
                <Calculator className="h-3.5 w-3.5" />
                <span>Ergebnis prüfen</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
