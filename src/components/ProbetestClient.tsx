'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ProbetestTopicDTO, ProbetestQuestionDTO } from '@/types/student';
import { isAnswerMatch, normalizeAnswer } from '@/lib/normalize';
import { fireConfetti } from '@/lib/confetti';
import {
  QuestionInteractionFields,
  TileItem,
  createTileItems,
} from './QuestionInteractionFields';
import { ImageModal } from './ImageModal';
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
  MousePointerClick,
  PenTool,
  Calculator,
  BookOpen,
} from 'lucide-react';

interface ProbetestClientProps {
  studentName: string;
  studentSlug: string;
  backHref: string;
  topics: ProbetestTopicDTO[];
}

type Stage = 'select_topics' | 'testing' | 'results';

function getTopicKey(t: { taskId: string; date: string; topicSlug: string }): string {
  return `${t.taskId}::${t.date}::${t.topicSlug}`;
}

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getDistinctAnswers(answers: string[]) {
  const seen = new Set<string>();
  const distinct: string[] = [];
  for (const ans of answers) {
    const key = normalizeAnswer(ans)
      .replace(/(?<=\d)\s+(?=[a-zäöüß%€²³°])/g, '')
      .replace(/\s*=\s*/g, '=');
    if (!seen.has(key)) {
      seen.add(key);
      distinct.push(ans.trim());
    }
  }
  return distinct.slice(0, 4);
}

function evaluateTestQuestion(q: ProbetestQuestionDTO, rawUserVal: string): boolean {
  const isChoice = Boolean(q.options && q.options.length > 0);
  const isWordSelect = q.interactionType === 'word_select';
  return isAnswerMatch(rawUserVal, q.correctAnswers, { isChoice, isWordSelect });
}

export function ProbetestClient({
  studentName,
  studentSlug,
  backHref,
  topics,
}: ProbetestClientProps) {
  const [selectedTopicKeys, setSelectedTopicKeys] = useState<string[]>(() =>
    topics.slice(0, 5).map(getTopicKey)
  );
  const [selectionError, setSelectionError] = useState<string | null>(null);

  const [stage, setStage] = useState<Stage>('select_topics');
  const [testQuestions, setTestQuestions] = useState<ProbetestQuestionDTO[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [userTileOrders, setUserTileOrders] = useState<Record<number, TileItem[]>>({});
  const [userWordSelections, setUserWordSelections] = useState<Record<number, number[]>>({});
  const [userRechenwege, setUserRechenwege] = useState<Record<number, string>>({});
  const [showCurrentHint, setShowCurrentHint] = useState(false);
  const [showContextPanel, setShowContextPanel] = useState(false);

  const handleToggleTopic = (topicKey: string) => {
    setSelectionError(null);
    if (selectedTopicKeys.includes(topicKey)) {
      if (selectedTopicKeys.length === 1) {
        setSelectionError('Mindestens ein Thema muss ausgewählt sein.');
        return;
      }
      setSelectedTopicKeys((prev) => prev.filter((k) => k !== topicKey));
    } else {
      if (selectedTopicKeys.length >= 5) {
        setSelectionError('Es können maximal 5 Themen für den Probetest ausgewählt werden.');
        return;
      }
      setSelectedTopicKeys((prev) => [...prev, topicKey]);
    }
  };

  const handleStartTest = () => {
    if (selectedTopicKeys.length === 0) {
      setSelectionError('Bitte wähle mindestens ein Thema aus.');
      return;
    }

    const pool: ProbetestQuestionDTO[] = [];
    for (const top of topics) {
      if (selectedTopicKeys.includes(getTopicKey(top))) {
        pool.push(...top.questions);
      }
    }

    if (pool.length === 0) {
      setSelectionError('In den gewählten Themen sind keine prüfbaren Aufgaben vorhanden.');
      return;
    }

    const selected10 = shuffleArray(pool)
      .slice(0, 10)
      .map((q) =>
        q.options && q.options.length > 1 ? { ...q, options: shuffleArray(q.options) } : q
      );

    const initialTiles: Record<number, TileItem[]> = {};
    const initialAnswers: Record<number, string> = {};

    selected10.forEach((q, idx) => {
      if (q.interactionType === 'sentence_builder' && q.tiles) {
        const items = createTileItems(q.tiles, `${q.id}-test-${idx}`);
        initialTiles[idx] = items;
        initialAnswers[idx] = items.map((t) => t.text).join(' ');
      }
    });

    setTestQuestions(selected10);
    setCurrentIndex(0);
    setUserTileOrders(initialTiles);
    setUserAnswers(initialAnswers);
    setUserWordSelections({});
    setUserRechenwege({});
    setShowCurrentHint(false);
    setShowContextPanel(false);
    setStage('testing');
  };

  const handleSubmitTest = () => {
    setStage('results');
    let correctCount = 0;
    testQuestions.forEach((q, idx) => {
      if (evaluateTestQuestion(q, userAnswers[idx] || '')) correctCount++;
    });

    if (correctCount >= 7) {
      fireConfetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleRestart = () => {
    setStage('select_topics');
    setCurrentIndex(0);
    setUserAnswers({});
    setUserTileOrders({});
    setUserWordSelections({});
    setUserRechenwege({});
    setShowCurrentHint(false);
    setShowContextPanel(false);
  };

  const resultsData = useMemo(() => {
    if (stage !== 'results') return null;

    let totalCorrect = 0;
    const topicStats: Record<
      string,
      { topicKey: string; topicTitle: string; topicSlug: string; date: string; total: number; correct: number }
    > = {};

    testQuestions.forEach((q, idx) => {
      const isCorrect = evaluateTestQuestion(q, userAnswers[idx] || '');
      if (isCorrect) totalCorrect++;

      const key = getTopicKey(q);
      if (!topicStats[key]) {
        topicStats[key] = {
          topicKey: key,
          topicTitle: q.topicTitle,
          topicSlug: q.topicSlug,
          date: q.date,
          total: 0,
          correct: 0,
        };
      }
      topicStats[key].total += 1;
      if (isCorrect) topicStats[key].correct += 1;
    });

    return {
      totalQuestions: testQuestions.length,
      totalCorrect,
      topicBreakdown: Object.values(topicStats),
    };
  }, [stage, testQuestions, userAnswers]);

  if (topics.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
        <HelpCircle className="mx-auto h-12 w-12 text-slate-400 mb-3" />
        <h2 className="text-lg font-bold text-slate-800">Keine Probetest-Aufgaben verfügbar</h2>
        <p className="mt-1 text-sm text-slate-500">
          Für diesen Bereich sind derzeit noch keine automatisch auswertbaren Übungsaufgaben hinterlegt.
        </p>
        <Link
          href={backHref}
          className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Zurück zur Übersicht
        </Link>
      </div>
    );
  }

  // STAGE 1: TOPIC SELECTION
  if (stage === 'select_topics') {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
            <ClipboardCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Probetest für {studentName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              10 zufällige Fragen aus deinen gewählten Themenbereichen
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-900">Welche Themen möchtest du abfragen?</h2>
            <span className="text-xs font-medium text-slate-500">(maximal 5 Themen wählbar)</span>
          </div>

          {selectionError && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{selectionError}</span>
            </div>
          )}

          <div className="space-y-2.5">
            {topics.map((t) => {
              const topicKey = getTopicKey(t);
              const isSelected = selectedTopicKeys.includes(topicKey);
              const count = t.questions.length;
              return (
                <button
                  key={topicKey}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleToggleTopic(topicKey)}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-xl border p-4 text-left transition-all select-none focus:outline-hidden focus:ring-2 focus:ring-blue-400 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/70 shadow-2xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{t.topic}</p>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {t.title} · {t.date}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 border border-slate-200 shrink-0">
                    <Layers className="h-3 w-3 text-blue-600" />
                    {count} {count === 1 ? 'Aufgabe im Pool' : 'Aufgaben im Pool'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <p className="font-semibold text-slate-800 mb-1">Ablauf des Probetests:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Aus deinen gewählten Themen werden genau 10 Aufgaben zufällig zusammengestellt.</li>
            <li>Du beantwortest die Fragen nacheinander durch Eintippen, Kacheln ordnen oder Wörter anklicken.</li>
            <li>Am Ende erhältst du eine Gesamtwertung sowie eine Themen-Aufschlüsselung, damit du genau siehst, wo noch Wiederholungsbedarf besteht.</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <Link
            href={backHref}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Zurück zur Themenübersicht
          </Link>

          <button
            type="button"
            onClick={handleStartTest}
            disabled={selectedTopicKeys.length === 0}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-50 transition-all cursor-pointer"
          >
            <span>Probetest jetzt starten (10 Fragen)</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // STAGE 2: TEST RUNNER
  if (stage === 'testing') {
    const currentQ = testQuestions[currentIndex];
    const currentTopic = topics.find((t) => getTopicKey(t) === getTopicKey(currentQ));
    const hasTopicMaterial = Boolean(
      currentTopic?.readingText || (currentTopic?.images && currentTopic.images.length > 0)
    );
    const currentAnswer = userAnswers[currentIndex] || '';
    const currentTiles = userTileOrders[currentIndex] || [];
    const currentWordIndices = userWordSelections[currentIndex] || [];
    const progressPercent = Math.round(((currentIndex + 1) / testQuestions.length) * 100);
    const isLastQuestion = currentIndex === testQuestions.length - 1;
    const interactionType = currentQ.interactionType || 'input';

    const goNext = () => {
      if (isLastQuestion) {
        handleSubmitTest();
      } else {
        setShowCurrentHint(false);
        setShowContextPanel(false);
        setCurrentIndex((i) => i + 1);
      }
    };

    const goPrev = () => {
      if (currentIndex > 0) {
        setShowCurrentHint(false);
        setShowContextPanel(false);
        setCurrentIndex((i) => i - 1);
      }
    };

    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
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
            className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            Test abbrechen
          </button>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

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
              {interactionType === 'rechnung' && (
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                  <Calculator className="h-3 w-3 text-amber-600" />
                  Mathematische Rechnung
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
              <p className="mt-2 text-xs sm:text-sm text-slate-600 italic">{currentQ.context}</p>
            )}

            {hasTopicMaterial && currentTopic && (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => setShowContextPanel((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50/70 px-2.5 py-1 text-xs font-semibold text-blue-800 hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>
                    {showContextPanel
                      ? 'Begleitmaterial ausblenden'
                      : 'Lesetext / Abbildung zur Aufgabe anzeigen'}
                  </span>
                </button>
                {showContextPanel && (
                  <div className="mt-2.5 rounded-xl border border-slate-200 bg-white p-3.5 space-y-3 text-xs text-slate-700">
                    {currentTopic.readingText && (
                      <div>
                        {currentTopic.readingText.title && (
                          <p className="font-bold text-slate-900 mb-1">
                            {currentTopic.readingText.title}
                          </p>
                        )}
                        <p className="whitespace-pre-wrap leading-relaxed">
                          {currentTopic.readingText.content}
                        </p>
                      </div>
                    )}
                    {currentTopic.images && currentTopic.images.length > 0 && (
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {currentTopic.images.map((img, i) => (
                          <ImageModal
                            key={`${img.src}-${i}`}
                            src={img.src}
                            alt={img.alt}
                            caption={img.caption}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <QuestionInteractionFields
              key={currentIndex}
              interactionType={interactionType}
              value={currentAnswer}
              onValueChange={(val) => setUserAnswers((prev) => ({ ...prev, [currentIndex]: val }))}
              tilesList={currentTiles}
              onTilesChange={(next) => {
                setUserTileOrders((prev) => ({ ...prev, [currentIndex]: next }));
                setUserAnswers((prev) => ({
                  ...prev,
                  [currentIndex]: next.map((t) => t.text).join(' '),
                }));
              }}
              words={currentQ.words}
              selectedWordIndices={currentWordIndices}
              onSelectedWordsChange={(indices) => {
                setUserWordSelections((prev) => ({ ...prev, [currentIndex]: indices }));
                const wordsList = currentQ.words || [];
                setUserAnswers((prev) => ({
                  ...prev,
                  [currentIndex]: indices.map((i) => wordsList[i]).join(' '),
                }));
              }}
              options={currentQ.options}
              placeholder={currentQ.placeholder || 'Deine Antwort eingeben...'}
              showCheckButtons={false}
              onSubmit={goNext}
              autoFocusInput={true}
              rechenweg={userRechenwege[currentIndex] || ''}
              onRechenwegChange={(val) =>
                setUserRechenwege((prev) => ({ ...prev, [currentIndex]: val }))
              }
            />

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

        <div className="mt-8 flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={goPrev}
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
              onClick={goNext}
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

  // STAGE 3: DIAGNOSTIC RESULTS
  if (!resultsData) return null;

  const { totalQuestions, totalCorrect, topicBreakdown } = resultsData;
  const scorePercent = Math.round((totalCorrect / totalQuestions) * 100);

  return (
    <div className="space-y-6">
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
                  key={t.topicKey}
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

                  <Link
                    href={`/${studentSlug}/${t.date}/${t.topicSlug}`}
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

      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-1">Alle {totalQuestions} Fragen im Detail</h2>
        <p className="text-xs text-slate-500 mb-6">
          Überprüfe deine Antworten und sieh dir die richtigen Lösungen an:
        </p>

        <div className="space-y-4">
          {testQuestions.map((q, idx) => {
            const isMatch = evaluateTestQuestion(q, userAnswers[idx] || '');

            return (
              <div
                key={`${q.id}-${idx}`}
                className={`rounded-2xl border p-4.5 transition-all ${
                  isMatch ? 'border-emerald-200 bg-emerald-50/30' : 'border-rose-200 bg-rose-50/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-slate-600">Aufgabe {idx + 1}</span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                      {q.topicTitle}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      isMatch ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
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

                <p className="mt-2 text-sm font-semibold text-slate-900 leading-snug">{q.prompt}</p>
                {q.context && <p className="mt-1 text-xs text-slate-600 italic">{q.context}</p>}

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 pt-3 border-t border-slate-100 text-xs">
                  <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                    <span className="text-slate-400 font-medium block text-[11px]">
                      Deine Antwort / Anordnung:
                    </span>
                    <span className={`font-semibold ${isMatch ? 'text-emerald-700' : 'text-rose-700'}`}>
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

                {q.sampleSolution && !q.hideSampleSolution && (
                  <div className="mt-2 rounded-lg border border-blue-100 bg-blue-50/70 p-2.5 text-xs text-blue-950">
                    <span className="font-semibold text-blue-900 block mb-0.5">
                      Lösungsweg / Musterlösung:
                    </span>
                    <p className="whitespace-pre-wrap leading-relaxed">{q.sampleSolution}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <Link
            href={backHref}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Zurück zur Themenübersicht
          </Link>

          <button
            type="button"
            onClick={handleRestart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Weiteren Test durchführen
          </button>
        </div>
      </div>
    </div>
  );
}
