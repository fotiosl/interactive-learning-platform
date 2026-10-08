'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Student, QuestionInteractionType } from '@/types/student';
import { normalizeAnswer, formatSentenceTiles } from '@/lib';
import {
  ClipboardCheck,
  Check,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Layers,
  Award,
  AlertCircle,
  HelpCircle,
  GripVertical,
  ChevronLeft,
  ChevronRight,
  MousePointerClick,
  PenTool,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProbetestClientProps {
  student: Student;
}

interface FlattenedQuestion {
  id: string;
  topicTitle: string;
  topicSlug: string;
  prompt: string;
  context?: string;
  placeholder?: string;
  correctAnswers: string[];
  hint?: string;
  interactionType?: QuestionInteractionType;
  words?: string[];
  tiles?: string[];
  options?: string[];
}

type Stage = 'select_topics' | 'testing' | 'results';

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function ProbetestClient({ student }: ProbetestClientProps) {
  // 1. Gather all tasks that have auto-checkable questions
  const availableTopics = useMemo(() => {
    return student.tasks
      .map((t) => {
        const checkableQuestions = (t.inputQuestions || []).filter(
          (q) => q.correctAnswers && q.correctAnswers.length > 0
        );
        return {
          task: t,
          count: checkableQuestions.length,
          questions: checkableQuestions,
        };
      })
      .filter((item) => item.count > 0);
  }, [student.tasks]);

  // Selected topic slugs (default: all up to 5)
  const [selectedTopicSlugs, setSelectedTopicSlugs] = useState<string[]>(() => {
    return availableTopics.slice(0, 5).map((t) => t.task.topicSlug);
  });

  const [selectionError, setSelectionError] = useState<string | null>(null);

  // Test state
  const [stage, setStage] = useState<Stage>('select_topics');
  const [testQuestions, setTestQuestions] = useState<FlattenedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showCurrentHint, setShowCurrentHint] = useState(false);

  // Dynamic state for interactive questions during test
  const [activeTiles, setActiveTiles] = useState<string[]>([]);
  const [userTileOrders, setUserTileOrders] = useState<Record<number, string[]>>({});
  const [draggedTileIdx, setDraggedTileIdx] = useState<number | null>(null);
  const [selectedTileIdx, setSelectedTileIdx] = useState<number | null>(null);
  const [selectedWordIndices, setSelectedWordIndices] = useState<number[]>([]);

  // Toggle topic selection
  const handleToggleTopic = (slug: string) => {
    setSelectionError(null);
    if (selectedTopicSlugs.includes(slug)) {
      if (selectedTopicSlugs.length === 1) {
        setSelectionError('Mindestens ein Thema muss ausgewählt sein.');
        return;
      }
      setSelectedTopicSlugs((prev) => prev.filter((s) => s !== slug));
    } else {
      if (selectedTopicSlugs.length >= 5) {
        setSelectionError('Es können maximal 5 Themen für den Probetest ausgewählt werden.');
        return;
      }
      setSelectedTopicSlugs((prev) => [...prev, slug]);
    }
  };

  // Start the 10-question test
  const handleStartTest = () => {
    if (selectedTopicSlugs.length === 0) {
      setSelectionError('Bitte wähle mindestens ein Thema aus.');
      return;
    }

    // Pool all questions from chosen topics
    const pool: FlattenedQuestion[] = [];
    for (const top of availableTopics) {
      if (selectedTopicSlugs.includes(top.task.topicSlug)) {
        for (const q of top.questions) {
          pool.push({
            id: q.id,
            topicTitle: top.task.topic,
            topicSlug: top.task.topicSlug,
            prompt: q.prompt,
            context: q.context,
            placeholder: q.placeholder,
            correctAnswers: q.correctAnswers || [],
            hint: q.hint,
            interactionType: q.interactionType || 'input',
            words: q.words,
            tiles: q.tiles,
            options: q.options,
          });
        }
      }
    }

    if (pool.length === 0) {
      setSelectionError('In den gewählten Themen sind keine prüfbaren Aufgaben vorhanden.');
      return;
    }

    // Shuffle using Fisher-Yates
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Always take up to 10 questions and shuffle options if multiple choice
    const selected10 = shuffled.slice(0, 10).map((q) => {
      if (q.options && q.options.length > 1) {
        return {
          ...q,
          options: shuffleArray(q.options),
        };
      }
      return q;
    });

    setTestQuestions(selected10);
    setCurrentIndex(0);
    setUserAnswers({});
    setShowCurrentHint(false);

    // Initialize first question's interactive state
    const firstQ = selected10[0];
    if (firstQ.interactionType === 'sentence_builder' && firstQ.tiles) {
      const formatted = formatSentenceTiles(firstQ.tiles);
      setActiveTiles([...formatted]);
      setUserTileOrders({ 0: [...formatted] });
      setUserAnswers({ 0: formatted.join(' ') });
    } else {
      setActiveTiles([]);
      setUserTileOrders({});
    }
    setSelectedWordIndices([]);
    setSelectedTileIdx(null);

    setStage('testing');
  };

  // Setup interactive state when switching question index
  const setupQuestionState = (idx: number, questions = testQuestions) => {
    const q = questions[idx];
    setShowCurrentHint(false);
    setSelectedTileIdx(null);

    if (q.interactionType === 'sentence_builder' && q.tiles) {
      const savedTiles = userTileOrders[idx];
      if (savedTiles) {
        setActiveTiles(savedTiles);
      } else {
        const initialTiles = formatSentenceTiles(q.tiles);
        setActiveTiles(initialTiles);
        setUserTileOrders((prev) => ({ ...prev, [idx]: initialTiles }));
        setUserAnswers((prev) => ({ ...prev, [idx]: initialTiles.join(' ') }));
      }
    } else {
      setActiveTiles([]);
    }

    setSelectedWordIndices([]);
  };

  // Answer handler
  const handleAnswerChange = (val: string) => {
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: val }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < testQuestions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setupQuestionState(nextIdx);
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setupQuestionState(prevIdx);
    }
  };

  // Move tile in sentence_builder test mode
  const handleLiveReorderTestTile = (fromIdx: number, toIdx: number) => {
    if (fromIdx === toIdx || fromIdx < 0 || toIdx < 0 || fromIdx >= activeTiles.length || toIdx >= activeTiles.length) return;
    const newTiles = [...activeTiles];
    const [moved] = newTiles.splice(fromIdx, 1);
    newTiles.splice(toIdx, 0, moved);
    setActiveTiles(newTiles);
    setDraggedTileIdx(toIdx);
    setUserTileOrders((prev) => ({ ...prev, [currentIndex]: newTiles }));
    handleAnswerChange(newTiles.join(' '));
  };

  const handleTestTileClickToSwap = (idx: number) => {
    if (selectedTileIdx === null) {
      setSelectedTileIdx(idx);
    } else if (selectedTileIdx === idx) {
      setSelectedTileIdx(null);
    } else {
      const newTiles = [...activeTiles];
      const temp = newTiles[selectedTileIdx];
      newTiles[selectedTileIdx] = newTiles[idx];
      newTiles[idx] = temp;
      setActiveTiles(newTiles);
      setSelectedTileIdx(null);
      setUserTileOrders((prev) => ({ ...prev, [currentIndex]: newTiles }));
      handleAnswerChange(newTiles.join(' '));
    }
  };

  // Word select click during test
  const handleToggleTestWord = (wIdx: number, wordsList: string[]) => {
    let nextIndices: number[];
    if (selectedWordIndices.includes(wIdx)) {
      nextIndices = selectedWordIndices.filter((i) => i !== wIdx);
    } else {
      nextIndices = [...selectedWordIndices, wIdx].sort((a, b) => a - b);
    }
    setSelectedWordIndices(nextIndices);
    const chosen = nextIndices.map((i) => wordsList[i]).join(' ');
    handleAnswerChange(chosen);
  };

  const normalize = normalizeAnswer;

  const getDistinctAnswers = (answers: string[]) => {
    const seen = new Set<string>();
    const distinct: string[] = [];
    for (const ans of answers) {
      const key = ans.trim().toLowerCase().replace(/[.,!?;:]+$/, '');
      if (!seen.has(key)) {
        seen.add(key);
        distinct.push(ans.trim());
      }
    }
    return distinct;
  };

  // Submit test and evaluate
  const handleSubmitTest = () => {
    setStage('results');

    // Calculate score
    let correctCount = 0;
    testQuestions.forEach((q, idx) => {
      const rawUserVal = userAnswers[idx] || '';
      const isChoice = Boolean(q.options && q.options.length > 0);
      const isMatch = q.correctAnswers.some((ans) => {
        if (isChoice) {
          return ans.trim() === rawUserVal.trim();
        }
        const userVal = normalize(rawUserVal);
        const normAns = normalize(ans).replace(/\.\.\./g, ' ').replace(/\s+/g, ' ');
        return normAns === userVal || normAns === userVal.replace(' ', '');
      });
      if (isMatch) correctCount++;
    });

    if (correctCount >= 7) {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  // Reset to initial config
  const handleRestart = () => {
    setStage('select_topics');
    setCurrentIndex(0);
    setUserAnswers({});
    setShowCurrentHint(false);
    setActiveTiles([]);
    setUserTileOrders({});
    setSelectedWordIndices([]);
  };

  // Diagnostics breakdown for results stage
  const resultsData = useMemo(() => {
    if (stage !== 'results') return null;

    let totalCorrect = 0;
    const topicStats: Record<string, { topicTitle: string; topicSlug: string; total: number; correct: number }> = {};

    testQuestions.forEach((q, idx) => {
      const rawUserVal = userAnswers[idx] || '';
      const isChoice = Boolean(q.options && q.options.length > 0);
      const isCorrect = q.correctAnswers.some((ans) => {
        if (isChoice) {
          return ans.trim() === rawUserVal.trim();
        }
        const userVal = normalize(rawUserVal);
        const normAns = normalize(ans).replace(/\.\.\./g, ' ').replace(/\s+/g, ' ');
        return normAns === userVal || normAns === userVal.replace(' ', '');
      });

      if (isCorrect) totalCorrect++;

      if (!topicStats[q.topicTitle]) {
        topicStats[q.topicTitle] = {
          topicTitle: q.topicTitle,
          topicSlug: q.topicSlug,
          total: 0,
          correct: 0,
        };
      }

      topicStats[q.topicTitle].total += 1;
      if (isCorrect) {
        topicStats[q.topicTitle].correct += 1;
      }
    });

    return {
      totalQuestions: testQuestions.length,
      totalCorrect,
      topicBreakdown: Object.values(topicStats),
    };
  }, [stage, testQuestions, userAnswers]);

  // If no checkable questions exist at all
  if (availableTopics.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
        <HelpCircle className="mx-auto h-12 w-12 text-slate-400 mb-3" />
        <h2 className="text-lg font-bold text-slate-800">Keine Probetest-Aufgaben verfügbar</h2>
        <p className="mt-1 text-sm text-slate-500">
          Für diesen Schüler sind derzeit noch keine automatisch auswertbaren Übungsaufgaben hinterlegt.
        </p>
        <Link
          href={`/${student.slug}`}
          className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Zurück zur Übersicht
        </Link>
      </div>
    );
  }

  // ================= STAGE 1: TOPIC SELECTION =================
  if (stage === 'select_topics') {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
            <ClipboardCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Probetest für {student.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              10 zufällige Fragen aus deinen gewählten Themenbereichen
            </p>
          </div>
        </div>

        {/* Selection prompt */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-900">
              Welche Themen möchtest du abfragen?
            </h2>
            <span className="text-xs font-medium text-slate-500">
              (maximal 5 Themen wählbar)
            </span>
          </div>

          {selectionError && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{selectionError}</span>
            </div>
          )}

          <div className="space-y-2.5">
            {availableTopics.map(({ task, count }) => {
              const isSelected = selectedTopicSlugs.includes(task.topicSlug);
              return (
                <div
                  key={task.topicSlug}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleToggleTopic(task.topicSlug)}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      handleToggleTopic(task.topicSlug);
                    }
                  }}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all select-none ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/70 shadow-2xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{task.topic}</p>
                      <p className="text-xs text-slate-500 line-clamp-1">{task.title}</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 border border-slate-200">
                    <Layers className="h-3 w-3 text-blue-600" />
                    {count} {count === 1 ? 'Aufgabe im Pool' : 'Aufgaben im Pool'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info callout */}
        <div className="mt-6 rounded-2xl bg-slate-50 p-4 border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <p className="font-semibold text-slate-800 mb-1">Ablauf des Probetests:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Aus deinen gewählten Themen werden genau 10 Aufgaben zufällig zusammengestellt.</li>
            <li>Du beantwortest die Fragen nacheinander durch Eintippen, Kacheln ordnen oder Wörter anklicken.</li>
            <li>Am Ende erhältst du eine Gesamtwertung sowie eine Themen-Aufschlüsselung, damit du genau siehst, wo noch Wiederholungsbedarf besteht.</li>
          </ul>
        </div>

        {/* Start button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <Link
            href={`/${student.slug}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Zurück zur Themenübersicht
          </Link>

          <button
            type="button"
            onClick={handleStartTest}
            disabled={selectedTopicSlugs.length === 0}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-50 transition-all cursor-pointer"
          >
            <span>Probetest jetzt starten (10 Fragen)</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // ================= STAGE 2: TEST RUNNER (10 QUESTIONS) =================
  if (stage === 'testing') {
    const currentQ = testQuestions[currentIndex];
    const currentAnswer = userAnswers[currentIndex] || '';
    const progressPercent = Math.round(((currentIndex + 1) / testQuestions.length) * 100);
    const isLastQuestion = currentIndex === testQuestions.length - 1;
    const interactionType = currentQ.interactionType || 'input';

    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        {/* Top bar: Question indicator & topic */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
              Frage {currentIndex + 1} von {testQuestions.length}
            </span>
            <span className="text-xs font-medium text-slate-500">
              Thema: <span className="font-semibold text-slate-800">{currentQ.topicTitle}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={handleRestart}
            className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors"
          >
            Test abbrechen
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Current Question Box */}
        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
            <div className="flex items-center gap-2 mb-2">
              {interactionType === 'sentence_builder' && (
                <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">
                  <Layers className="h-3 w-3" />
                  Satzbausteine anordnen
                </span>
              )}
              {interactionType === 'word_select' && (
                <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-0.5 text-[11px] font-semibold text-purple-700">
                  <MousePointerClick className="h-3 w-3" />
                  Wort anklicken
                </span>
              )}
              {(interactionType === 'choice' || Boolean(currentQ.options && currentQ.options.length > 0)) && (
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="h-3 w-3" />
                  Auswahlfrage
                </span>
              )}
              {interactionType === 'input' && !currentQ.options && (
                <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                  <PenTool className="h-3 w-3" />
                  Antwort eintippen
                </span>
              )}
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQ.prompt}
            </h2>
            {currentQ.context && (
              <p className="mt-2 text-xs sm:text-sm text-slate-600 italic">
                {currentQ.context}
              </p>
            )}

            {/* INTERACTIVE COMPONENT 1: SENTENCE BUILDER TILES */}
            {interactionType === 'sentence_builder' && activeTiles.length > 0 && (
              <div className="mt-6 space-y-3">
                <p className="text-xs text-slate-500 font-medium">
                  Ordne die Kacheln durch Ziehen oder Klicken in die richtige Reihenfolge:
                </p>

                <div className="flex flex-wrap items-center gap-2.5 min-h-[50px] p-2 rounded-2xl bg-slate-100/60 border border-dashed border-slate-300/80">
                  {activeTiles.map((tile, idx) => {
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
                            handleLiveReorderTestTile(draggedTileIdx, idx);
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
                            handleLiveReorderTestTile(draggedTileIdx, idx);
                          }
                          setDraggedTileIdx(null);
                        }}
                        onClick={() => handleTestTileClickToSwap(idx)}
                        className={`group flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-semibold shadow-2xs transition-all duration-200 ease-out cursor-grab active:cursor-grabbing select-none ${
                          isDragging
                            ? 'opacity-40 scale-95 border-dashed border-indigo-400 bg-indigo-50/60 shadow-inner'
                            : isSelected
                            ? '-translate-y-1 border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-400 shadow-md scale-105'
                            : 'border-slate-300 bg-white text-slate-800 hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-xs'
                        }`}
                        title="Ziehen zum Verschieben, oder anklicken zum Tauschen"
                      >
                        <GripVertical className="h-4 w-4 text-slate-400 shrink-0" />
                        <span>{tile}</span>

                        <div className="flex items-center gap-0.5 ml-1 pl-1.5 border-l border-slate-200">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLiveReorderTestTile(idx, idx - 1);
                            }}
                            title="Nach links"
                            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20 cursor-pointer transition-colors"
                          >
                            <ChevronLeft className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === activeTiles.length - 1}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLiveReorderTestTile(idx, idx + 1);
                            }}
                            title="Nach rechts"
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

                <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-xs shadow-2xs">
                  <span className="text-slate-400 font-medium">Dein zusammengesetzter Satz:</span>
                  <p className="mt-1 text-base font-bold text-slate-900 tracking-wide">
                    {(() => {
                      const sentence = activeTiles.join(' ');
                      return /[.?!]$/.test(sentence) ? sentence : `${sentence}.`;
                    })()}
                  </p>
                </div>
              </div>
            )}

            {/* INTERACTIVE COMPONENT 2: WORD SELECT BUTTONS */}
            {interactionType === 'word_select' && currentQ.words && (
              <div className="mt-6 space-y-3">
                <p className="text-xs text-slate-500 font-medium">
                  Klicke auf das oder die gesuchten Wörter im Satz:
                </p>

                <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl border border-slate-200 bg-white">
                  {currentQ.words.map((word, wIdx) => {
                    const isSelected = selectedWordIndices.includes(wIdx);
                    return (
                      <button
                        key={`${word}-${wIdx}`}
                        type="button"
                        onClick={() => handleToggleTestWord(wIdx, currentQ.words || [])}
                        className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition-all cursor-pointer select-none ${
                          isSelected
                            ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                            : 'border-slate-300 bg-slate-50 text-slate-800 hover:border-slate-400 hover:bg-white'
                        }`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>

                {selectedWordIndices.length > 0 && (
                  <p className="text-xs text-slate-600 font-medium">
                    Ausgewählt:{' '}
                    <span className="font-bold text-blue-700">
                      {selectedWordIndices.map((i) => currentQ.words?.[i]).join(' ')}
                    </span>
                  </p>
                )}
              </div>
            )}

            {/* INTERACTIVE COMPONENT 3: CHOICE OPTIONS */}
            {(interactionType === 'choice' || Boolean(currentQ.options && currentQ.options.length > 0)) &&
              currentQ.options && (
                <div className="mt-6 space-y-3">
                  <p className="text-xs text-slate-500 font-medium">
                    Wähle die passende Antwort aus:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentQ.options.map((option, optIdx) => {
                      const isSelected = currentAnswer === option;
                      return (
                        <button
                          key={`${option}-${optIdx}`}
                          type="button"
                          onClick={() => handleAnswerChange(option)}
                          className={`flex items-start gap-3 p-3.5 rounded-xl border text-left text-sm font-semibold transition-all cursor-pointer select-none ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50 text-blue-950 ring-2 ring-blue-500 shadow-xs'
                              : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors mt-0.5 ${
                              isSelected
                                ? 'border-blue-600 bg-blue-600 text-white'
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
                </div>
              )}

            {/* INTERACTIVE COMPONENT 4: STANDARD TEXT INPUT */}
            {interactionType === 'input' && !currentQ.options && (
              <div className="mt-6">
                <input
                  type="text"
                  autoFocus
                  key={currentIndex}
                  value={currentAnswer}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (isLastQuestion) {
                        handleSubmitTest();
                      } else {
                        handleNextQuestion();
                      }
                    }
                  }}
                  placeholder={currentQ.placeholder || 'Deine Antwort eingeben...'}
                  className="w-full rounded-xl border border-slate-300 bg-white p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-hidden shadow-2xs"
                />
              </div>
            )}

            {/* Optional hint toggle during test */}
            {currentQ.hint && (
              <div className="mt-4 pt-3 border-t border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setShowCurrentHint(!showCurrentHint)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 hover:text-amber-800 cursor-pointer"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  {showCurrentHint ? 'Tipp verbergen' : 'Tipp anzeigen'}
                </button>
                {showCurrentHint && (
                  <p className="mt-2 rounded-lg bg-amber-50 border border-amber-200 p-2.5 text-xs text-amber-900">
                    <span className="font-semibold">Tipp: </span>
                    {currentQ.hint}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handlePrevQuestion}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Vorherige
          </button>

          {isLastQuestion ? (
            <button
              type="button"
              onClick={handleSubmitTest}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              <span>Test abschließen & auswerten</span>
              <CheckCircle2 className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextQuestion}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <span>Nächste Frage</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ================= STAGE 3: DIAGNOSTIC RESULTS =================
  if (!resultsData) return null;

  const { totalQuestions, totalCorrect, topicBreakdown } = resultsData;
  const scorePercent = Math.round((totalCorrect / totalQuestions) * 100);

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-white shadow-md ${
                scorePercent >= 70
                  ? 'bg-gradient-to-tr from-emerald-600 to-teal-500'
                  : scorePercent >= 40
                  ? 'bg-gradient-to-tr from-amber-500 to-orange-500'
                  : 'bg-gradient-to-tr from-rose-500 to-red-600'
              }`}
            >
              <Award className="h-8 w-8" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Ergebnis Probetest
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {totalCorrect} von {totalQuestions} richtig ({scorePercent}%)
              </h1>
              <p className="mt-1 text-xs text-slate-600">
                {scorePercent >= 80
                  ? 'Klasse Leistung! Du hast die gewählten Themen sehr sicher im Griff.'
                  : scorePercent >= 50
                  ? 'Gutes Ergebnis! Bei manchen Aufgaben lohnt sich ein zweiter Blick.'
                  : 'Nicht entmutigen lassen! Nutze die Themenübersicht unten, um gezielt zu wiederholen.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Neuen Probetest starten
          </button>
        </div>

        {/* THEMATIC BREAKDOWN (Exact requested format: X/Y Thema) */}
        <div className="mt-8 space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Themen-Auswertung (Wo musst du noch einmal nachschauen?)
            </h2>
            <p className="text-xs text-slate-500">
              Hier siehst du genau aufgeschlüsselt, wie du in den einzelnen Themengebieten abgeschnitten hast:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topicBreakdown.map((t) => {
              const topicRatio = t.total > 0 ? t.correct / t.total : 0;
              const isPerfect = t.correct === t.total;
              const isWeak = topicRatio < 0.5;

              return (
                <div
                  key={t.topicTitle}
                  className={`flex flex-col justify-between rounded-2xl border p-4.5 transition-all shadow-2xs ${
                    isPerfect
                      ? 'border-emerald-200 bg-emerald-50/50'
                      : isWeak
                      ? 'border-rose-200 bg-rose-50/40'
                      : 'border-amber-200 bg-amber-50/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-slate-700 truncate max-w-[70%]">
                        {t.topicTitle}
                      </span>
                      <span
                        className={`text-sm font-extrabold px-2 py-0.5 rounded-md ${
                          isPerfect
                            ? 'bg-emerald-200 text-emerald-900'
                            : isWeak
                            ? 'bg-rose-200 text-rose-900'
                            : 'bg-amber-200 text-amber-900'
                        }`}
                      >
                        {t.correct}/{t.total}
                      </span>
                    </div>

                    {/* Ratio indicator */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/80 border border-slate-200/50">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isPerfect ? 'bg-emerald-600' : isWeak ? 'bg-rose-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.round(topicRatio * 100)}%` }}
                      />
                    </div>

                    <p className="mt-2.5 text-[11px] leading-snug text-slate-600">
                      {isPerfect
                        ? 'Vollständig richtig gelöst.'
                        : isWeak
                        ? 'Hier solltest du noch einmal hingucken und üben.'
                        : 'Solide, aber noch etwas Festigungsbedarf.'}
                    </p>
                  </div>

                  {/* Direct Link to Topic for practice */}
                  <Link
                    href={`/${student.slug}/${t.topicSlug}`}
                    className="mt-4 inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    <span>Zurück zu {t.topicTitle}</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* DETAILED QUESTION REVIEW */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-1">
          Alle 10 Fragen im Detail
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Überprüfe deine Antworten und sieh dir die richtigen Lösungen an:
        </p>

        <div className="space-y-4">
          {testQuestions.map((q, idx) => {
            const rawUserVal = userAnswers[idx] || '';
            const isChoice = Boolean(q.options && q.options.length > 0);
            const isMatch = q.correctAnswers.some((ans) => {
              if (isChoice) {
                return ans.trim() === rawUserVal.trim();
              }
              const userVal = normalize(rawUserVal);
              const normAns = normalize(ans).replace(/\.\.\./g, ' ').replace(/\s+/g, ' ');
              return normAns === userVal || normAns === userVal.replace(' ', '');
            });

            return (
              <div
                key={q.id}
                className={`rounded-2xl border p-4.5 transition-all ${
                  isMatch
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-rose-200 bg-rose-50/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-slate-600">
                      Aufgabe {idx + 1}
                    </span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                      {q.topicTitle}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      isMatch
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {isMatch ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        Richtig
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3.5 w-3.5 text-rose-600" />
                        Falsch
                      </>
                    )}
                  </span>
                </div>

                <p className="mt-2 text-sm font-semibold text-slate-900 leading-snug">
                  {q.prompt}
                </p>
                {q.context && (
                  <p className="mt-1 text-xs text-slate-600 italic">{q.context}</p>
                )}

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 pt-3 border-t border-slate-100 text-xs">
                  <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                    <span className="text-slate-400 font-medium block text-[11px]">
                      Deine Antwort / Anordnung:
                    </span>
                    <span
                      className={`font-semibold ${
                        isMatch ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {userAnswers[idx]?.trim() ? userAnswers[idx] : '(Keine Eingabe)'}
                    </span>
                  </div>

                  <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                    <span className="text-slate-400 font-medium block text-[11px] mb-1">
                      {q.interactionType === 'sentence_builder'
                        ? 'Mögliche richtige Sätze:'
                        : 'Richtige Antwort(en):'}
                    </span>
                    <div className="space-y-1">
                      {getDistinctAnswers(q.correctAnswers).map((ans, aIdx) => (
                        <div key={aIdx} className="font-semibold text-slate-800 leading-snug">
                          {ans}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <Link
            href={`/${student.slug}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Zurück zur Themenübersicht
          </Link>

          <button
            type="button"
            onClick={handleRestart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Neuen Probetest starten</span>
          </button>
        </div>
      </div>
    </div>
  );
}
