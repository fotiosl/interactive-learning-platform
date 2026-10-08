'use client';

import { useState, useEffect } from 'react';
import { InputQuestion } from '@/types/student';
import {
  normalizeAnswer,
  formatSentenceTiles,
  getQuestionStorageKey,
  loadStoredData,
  saveStoredData,
  clearStoredData,
} from '@/lib';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  EyeOff,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  MousePointerClick,
  Layers,
  PenTool,
  Terminal,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import dynamic from 'next/dynamic';

const JavaCodeRunner = dynamic(
  () => import('./JavaCodeRunner').then((mod) => mod.JavaCodeRunner),
  {
    loading: () => (
      <div className="flex h-36 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-slate-400">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          <span>Lade Programmierumgebung...</span>
        </div>
      </div>
    ),
    ssr: false,
  }
);

interface InputQuestionItemProps {
  question: InputQuestion;
  studentSlug: string;
  taskId: string;
  isTeacherMode?: boolean;
  hideSampleSolution?: boolean;
}

export function InputQuestionItem({
  question,
  studentSlug,
  taskId: _taskId,
  isTeacherMode,
  hideSampleSolution,
}: InputQuestionItemProps) {
  const interactionType = question.interactionType || 'input';

  // --- Storage Key & Persistence ---
  const storageKey = studentSlug && question.id ? getQuestionStorageKey(studentSlug, question.id) : null;

  // --- Input State ---
  const [value, setValue] = useState('');

  // --- Sentence Builder State ---
  const [tilesOrder, setTilesOrder] = useState<string[]>(() =>
    interactionType === 'sentence_builder'
      ? formatSentenceTiles(question.tiles)
      : question.tiles || []
  );
  const [draggedTileIdx, setDraggedTileIdx] = useState<number | null>(null);
  const [selectedTileIdx, setSelectedTileIdx] = useState<number | null>(null);

  // --- Word Select State ---
  const [selectedWordIndices, setSelectedWordIndices] = useState<number[]>([]);

  // --- Common State ---
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Restore saved state on client mount
  useEffect(() => {
    if (!storageKey) return;
    const saved = loadStoredData<{
      value?: string;
      status?: 'idle' | 'correct' | 'incorrect';
      tilesOrder?: string[];
      selectedWordIndices?: number[];
    } | null>(storageKey, null);

    if (saved) {
      if (typeof saved.value === 'string') setValue(saved.value);
      if (saved.status) setStatus(saved.status);
      if (Array.isArray(saved.tilesOrder) && saved.tilesOrder.length > 0) setTilesOrder(saved.tilesOrder);
      if (Array.isArray(saved.selectedWordIndices)) setSelectedWordIndices(saved.selectedWordIndices);
    }
  }, [storageKey]);

  const persistState = (updates: {
    value?: string;
    status?: 'idle' | 'correct' | 'incorrect';
    tilesOrder?: string[];
    selectedWordIndices?: number[];
  }) => {
    if (!storageKey) return;
    const current = loadStoredData<Record<string, unknown>>(storageKey, {});
    saveStoredData(storageKey, { ...current, ...updates });
  };

  // Normalized text helper imported from shared @/lib
  const normalize = normalizeAnswer;

  // --- Text Input Handlers ---
  const handleInputChange = (val: string) => {
    setValue(val);
    setStatus('idle');
    persistState({ value: val, status: 'idle' });
  };

  const handleCheckInput = () => {
    if (!question.correctAnswers || question.correctAnswers.length === 0) return;

    const isChoice = Boolean(question.options && question.options.length > 0);
    const normalizedInput = normalize(value);

    const isMatch = question.correctAnswers.some((ans) => {
      if (isChoice) {
        // Choice options must match exact string to strictly evaluate punctuation/comma questions
        return ans.trim() === value.trim();
      }
      return normalize(ans) === normalizedInput;
    });

    const newStatus = isMatch ? 'correct' : 'incorrect';
    setStatus(newStatus);
    persistState({ value, status: newStatus });

    if (isMatch) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  };

  // --- Sentence Builder Handlers ---
  const handleLiveReorder = (fromIdx: number, toIdx: number) => {
    if (fromIdx === toIdx || fromIdx < 0 || toIdx < 0 || fromIdx >= tilesOrder.length || toIdx >= tilesOrder.length) return;
    setStatus('idle');
    const newOrder = [...tilesOrder];
    const [moved] = newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, moved);
    setTilesOrder(newOrder);
    setDraggedTileIdx(toIdx);
    persistState({ tilesOrder: newOrder, status: 'idle' });
  };

  const handleTileClickToSwap = (idx: number) => {
    setStatus('idle');
    if (selectedTileIdx === null) {
      setSelectedTileIdx(idx);
    } else if (selectedTileIdx === idx) {
      setSelectedTileIdx(null);
    } else {
      // Swap tiles
      const newOrder = [...tilesOrder];
      const temp = newOrder[selectedTileIdx];
      newOrder[selectedTileIdx] = newOrder[idx];
      newOrder[idx] = temp;
      setTilesOrder(newOrder);
      setSelectedTileIdx(null);
      persistState({ tilesOrder: newOrder, status: 'idle' });
    }
  };

  const handleCheckSentence = () => {
    if (!question.correctAnswers || question.correctAnswers.length === 0) return;

    const constructedSentence = tilesOrder.join(' ');
    const normalizedConstructed = normalize(constructedSentence);

    const isMatch = question.correctAnswers.some((ans) => {
      const normAns = normalize(ans);
      return normAns === normalizedConstructed;
    });

    const newStatus = isMatch ? 'correct' : 'incorrect';
    setStatus(newStatus);
    persistState({ tilesOrder, status: newStatus });

    if (isMatch) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  };

  // --- Word Select Handlers ---
  const wordsList = question.words || [];

  const handleToggleWord = (idx: number) => {
    setStatus('idle');
    let nextIndices: number[];
    if (selectedWordIndices.includes(idx)) {
      nextIndices = selectedWordIndices.filter((i) => i !== idx);
    } else {
      // Support selecting up to 2 words (e.g. split verbs)
      nextIndices = [...selectedWordIndices, idx].sort((a, b) => a - b);
    }
    setSelectedWordIndices(nextIndices);
    persistState({ selectedWordIndices: nextIndices, status: 'idle' });
  };

  const handleCheckWordSelect = () => {
    if (!question.correctAnswers || question.correctAnswers.length === 0 || selectedWordIndices.length === 0) return;

    const chosenWords = selectedWordIndices.map((i) => wordsList[i]);
    const chosenJoined = chosenWords.map((w) => normalize(w)).join(' ');

    const isMatch = question.correctAnswers.some((ans) => {
      const normAns = normalize(ans).replace(/\.\.\./g, ' ').replace(/\s+/g, ' ');
      return normAns === chosenJoined || normAns === chosenJoined.replace(' ', '');
    });

    const newStatus = isMatch ? 'correct' : 'incorrect';
    setStatus(newStatus);
    persistState({ selectedWordIndices, status: newStatus });

    if (isMatch) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  };

  // Reset all
  const handleReset = () => {
    setValue('');
    if (question.tiles) {
      setTilesOrder(
        interactionType === 'sentence_builder'
          ? formatSentenceTiles(question.tiles)
          : [...question.tiles]
      );
    }
    setSelectedTileIdx(null);
    setSelectedWordIndices([]);
    setStatus('idle');
    setShowSolution(false);
    setShowHint(false);
    if (storageKey) {
      clearStoredData(storageKey);
    }
  };

  const canShowSolution = isTeacherMode || (!hideSampleSolution && Boolean(question.sampleSolution));
  const isPlainPlayground = interactionType === 'code' && !question.prompt;

  if (isPlainPlayground) {
    return (
      <div className="w-full">
        <JavaCodeRunner
          initialCode={question.initialCode}
          expectedOutput={question.expectedOutput}
          correctAnswers={question.correctAnswers}
          hint={question.hint}
          sampleSolution={question.sampleSolution}
          hideSampleSolution={hideSampleSolution}
          stdin={question.stdin}
        />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4.5 shadow-xs transition-all hover:border-slate-300">
      {/* Question Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          {interactionType === 'sentence_builder' && (
            <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 mb-1.5">
              <Layers className="h-3 w-3" />
              Satzbausteine anordnen (Ziehen oder Klicken)
            </span>
          )}
          {interactionType === 'word_select' && (
            <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-0.5 text-[11px] font-semibold text-purple-700 mb-1.5">
              <MousePointerClick className="h-3 w-3" />
              Wort im Satz anklicken
            </span>
          )}
          {(interactionType === 'choice' || Boolean(question.options && question.options.length > 0)) && (
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 mb-1.5">
              <CheckCircle2 className="h-3 w-3" />
              Auswahlfrage
            </span>
          )}
          {interactionType === 'code' && (
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800 mb-1.5 border border-amber-200">
              <Terminal className="h-3 w-3 text-amber-600" />
              Java-Programmierung
            </span>
          )}
          {interactionType === 'input' && !question.options && (
            <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 mb-1.5">
              <PenTool className="h-3 w-3" />
              Eingabe
            </span>
          )}
          <p className="font-semibold text-slate-900 text-sm leading-snug">{question.prompt}</p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          title="Zurücksetzen"
          className="text-xs text-slate-400 hover:text-slate-600 transition-colors shrink-0"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>

      {question.context && (
        <p className="mt-1 text-xs text-slate-600 italic">{question.context}</p>
      )}

      {/* ================= 0. CODE (INTERACTIVE JAVA ENVIRONMENT) ================= */}
      {interactionType === 'code' && (
        <JavaCodeRunner
          initialCode={question.initialCode}
          expectedOutput={question.expectedOutput}
          correctAnswers={question.correctAnswers}
          hint={question.hint}
          sampleSolution={question.sampleSolution}
          hideSampleSolution={hideSampleSolution}
          stdin={question.stdin}
        />
      )}

      {/* ================= 1. SENTENCE BUILDER (DRAGGABLE/CLICKABLE TILES) ================= */}
      {interactionType === 'sentence_builder' && tilesOrder.length > 0 && (
        <div className="mt-4 space-y-3.5">
          <p className="text-xs text-slate-500 font-medium">
            Bringe die Bausteine in die richtige Reihenfolge:
          </p>

          {/* Interactive Tiles Container */}
          <div className="flex flex-wrap items-center gap-2.5 min-h-[50px] p-2 rounded-2xl bg-slate-100/60 border border-dashed border-slate-300/80">
            {tilesOrder.map((tile, idx) => {
              const isSelected = selectedTileIdx === idx;
              const isDragging = draggedTileIdx === idx;

              return (
                <div
                  key={tile}
                  draggable
                  onDragStart={(e) => {
                    setDraggedTileIdx(idx);
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/plain', String(idx));
                  }}
                  onDragEnter={(e) => {
                    e.preventDefault();
                    if (draggedTileIdx !== null && draggedTileIdx !== idx) {
                      handleLiveReorder(draggedTileIdx, idx);
                    }
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                  }}
                  onDragEnd={() => {
                    setDraggedTileIdx(null);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (draggedTileIdx !== null && draggedTileIdx !== idx) {
                      handleLiveReorder(draggedTileIdx, idx);
                    }
                    setDraggedTileIdx(null);
                  }}
                  onClick={() => handleTileClickToSwap(idx)}
                  className={`group relative flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-semibold shadow-2xs transition-all duration-200 ease-out cursor-grab active:cursor-grabbing select-none ${
                    isDragging
                      ? 'opacity-40 scale-95 border-dashed border-indigo-400 bg-indigo-50/60 shadow-inner'
                      : isSelected
                      ? '-translate-y-1 border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-400 shadow-md scale-105'
                      : 'border-slate-300 bg-white text-slate-800 hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-xs'
                  }`}
                  title="Ziehen zum Verschieben, oder anklicken zum Tauschen"
                >
                  <GripVertical className="h-4 w-4 text-slate-400 group-hover:text-slate-600 shrink-0" />
                  <span>{tile}</span>

                  {/* Left / Right nudge buttons for touch devices */}
                  <div className="flex items-center gap-0.5 ml-1 pl-1.5 border-l border-slate-200">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLiveReorder(idx, idx - 1);
                      }}
                      title="Nach links schieben"
                      className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20 cursor-pointer transition-colors"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === tilesOrder.length - 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLiveReorder(idx, idx + 1);
                      }}
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

          {selectedTileIdx !== null && (
            <p className="text-xs text-indigo-700 font-medium bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-1.5">
              1. Kachel ausgewählt: Klicke jetzt auf eine zweite Kachel, um die beiden Plätze zu tauschen.
            </p>
          )}

          {/* Live Preview of Sentence */}
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-xs shadow-2xs">
            <span className="text-slate-400 font-medium">Dein zusammengesetzter Satz:</span>
            <p className="mt-1 text-base font-bold text-slate-900 tracking-wide">
              {(() => {
                const sentence = tilesOrder.join(' ');
                return /[.?!]$/.test(sentence) ? sentence : `${sentence}.`;
              })()}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCheckSentence}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 cursor-pointer"
            >
              Satz prüfen
            </button>
            <span className="text-[11px] text-slate-400">
              Tipp: Kacheln können gezogen oder mit den Pfeilen verschoben werden.
            </span>
          </div>
        </div>
      )}

      {/* ================= 2. WORD SELECT (CLICK WORDS IN SENTENCE) ================= */}
      {interactionType === 'word_select' && wordsList.length > 0 && (
        <div className="mt-4 space-y-3">
          <p className="text-xs text-slate-500 font-medium">
            Klicke auf das oder die gesuchten Wörter im Satz:
          </p>

          <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50/60">
            {wordsList.map((word, idx) => {
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
            <button
              type="button"
              onClick={handleCheckWordSelect}
              disabled={selectedWordIndices.length === 0}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
            >
              Auswahl prüfen
            </button>
            {selectedWordIndices.length > 0 && (
              <span className="text-xs text-slate-600 font-medium">
                Ausgewählt:{' '}
                <span className="font-bold text-blue-700">
                  {selectedWordIndices.map((i) => wordsList[i]).join(' ')}
                </span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* ================= 3. CHOICE (SINGLE SELECT OPTIONS) ================= */}
      {(interactionType === 'choice' || Boolean(question.options && question.options.length > 0)) &&
        question.options && (
          <div className="mt-4 space-y-3">
            <p className="text-xs text-slate-500 font-medium">
              Wähle die passende Antwort aus:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {question.options.map((option, optIdx) => {
                const isSelected = value === option;
                return (
                  <button
                    key={`${option}-${optIdx}`}
                    type="button"
                    onClick={() => handleInputChange(option)}
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

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleCheckInput}
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
          </div>
        )}

      {/* ================= 4. STANDARD TEXT INPUT / TEXTAREA ================= */}
      {interactionType === 'input' && !question.options && (
        <div className="mt-3">
          {question.isOpenEnded ? (
            <textarea
              value={value}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={question.placeholder || 'Schreibe hier deine Antwort / Begründung...'}
              rows={3}
              className="w-full rounded-lg border border-slate-300 bg-slate-50/70 p-2.5 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:bg-white focus:outline-hidden"
            />
          ) : (
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCheckInput();
                }}
                placeholder={question.placeholder || 'Antwort eingeben...'}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-hidden ${
                  status === 'correct'
                    ? 'border-emerald-500 bg-emerald-50/60 text-emerald-950 font-medium'
                    : status === 'incorrect'
                    ? 'border-rose-400 bg-rose-50/50 text-rose-950 font-medium'
                    : 'border-slate-300 bg-slate-50/70 text-slate-900 focus:border-blue-500 focus:bg-white'
                }`}
              />
              {question.correctAnswers && question.correctAnswers.length > 0 && (
                <button
                  type="button"
                  onClick={handleCheckInput}
                  disabled={!value.trim()}
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                >
                  Prüfen
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Validation feedback & Action Buttons for non-code items */}
      {interactionType !== 'code' && (
        <>
          {status === 'correct' && (
            <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Richtig! Sehr gut gelöst!</span>
            </div>
          )}

          {status === 'incorrect' && (
            <div className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-rose-700">
              <XCircle className="h-4 w-4 shrink-0" />
              <span>Noch nicht ganz richtig. Überprüfe deine Anordnung oder Eingabe noch einmal!</span>
            </div>
          )}

          {/* Action Buttons: Hint & Solution */}
          <div className="mt-3 flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
            {question.hint && (
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 hover:text-amber-800 cursor-pointer"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                {showHint ? 'Tipp verbergen' : 'Tipp anzeigen'}
              </button>
            )}

            {canShowSolution && question.sampleSolution && (
              <button
                type="button"
                onClick={() => setShowSolution(!showSolution)}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                {showSolution ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                {showSolution ? 'Musterlösung ausblenden' : 'Musterlösung ansehen'}
              </button>
            )}
          </div>

          {/* Hint content */}
          {showHint && question.hint && (
            <div className="mt-2.5 rounded-lg bg-amber-50 p-3 text-xs text-amber-900 border border-amber-200">
              <span className="font-semibold">Tipp: </span>
              {question.hint}
            </div>
          )}

          {/* Solution content */}
          {(showSolution || isTeacherMode) && question.sampleSolution && canShowSolution && (
            <div className="mt-2.5 rounded-lg bg-blue-50/80 p-3 text-xs text-blue-950 border border-blue-200">
              <p className="font-semibold text-blue-900 mb-1">
                Musterlösung {isTeacherMode && <span className="text-[10px] font-normal uppercase bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded-sm ml-1">Lehrer-Ansicht</span>}:
              </p>
              <p className="leading-relaxed whitespace-pre-wrap">{question.sampleSolution}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
