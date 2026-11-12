'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { InputQuestion } from '@/types/student';
import { isAnswerMatch } from '@/lib/normalize';
import { getQuestionStorageKey, useStoredJson } from '@/lib/storage';
import { fireConfetti } from '@/lib/confetti';
import {
  QuestionInteractionFields,
  TileItem,
  createTileItems,
  reconstructTileItemsFromSaved,
} from './QuestionInteractionFields';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  EyeOff,
  RotateCcw,
  MousePointerClick,
  Layers,
  PenTool,
  Terminal,
  Calculator,
} from 'lucide-react';

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
  taskId?: string;
  isTeacherMode?: boolean;
  teacherSampleSolution?: string;
  hideSampleSolution?: boolean;
}

interface StoredQuestionState {
  value?: string;
  rechenweg?: string;
  status?: 'idle' | 'correct' | 'incorrect';
  tilesOrder?: string[];
  selectedWordIndices?: number[];
}

const EMPTY_STORED_STATE: StoredQuestionState = {};
const EMPTY_WORD_INDICES: number[] = [];

export function InputQuestionItem({
  question,
  studentSlug,
  isTeacherMode,
  teacherSampleSolution,
  hideSampleSolution,
}: InputQuestionItemProps) {
  const interactionType = question.interactionType || 'input';
  const effectiveSampleSolution = teacherSampleSolution || question.sampleSolution;
  const storageKey =
    studentSlug && question.id ? getQuestionStorageKey(studentSlug, question.id) : null;

  const [savedData, setSavedData] = useStoredJson<StoredQuestionState>(
    storageKey,
    EMPTY_STORED_STATE
  );

  const value = typeof savedData.value === 'string' ? savedData.value : '';
  const rechenweg = typeof savedData.rechenweg === 'string' ? savedData.rechenweg : '';
  const selectedWordIndices = useMemo(
    () => (Array.isArray(savedData.selectedWordIndices) ? savedData.selectedWordIndices : EMPTY_WORD_INDICES),
    [savedData.selectedWordIndices]
  );
  const status = savedData.status || 'idle';

  const defaultTiles = useMemo(
    () => createTileItems(question.tiles, question.id),
    [question.tiles, question.id]
  );
  const tilesList = useMemo(() => {
    if (Array.isArray(savedData.tilesOrder) && savedData.tilesOrder.length > 0) {
      return reconstructTileItemsFromSaved(savedData.tilesOrder, defaultTiles);
    }
    return defaultTiles;
  }, [savedData.tilesOrder, defaultTiles]);

  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const persistState = (updates: Partial<StoredQuestionState>) => {
    setSavedData({ ...savedData, ...updates });
  };

  const handleValueChange = (val: string) => {
    persistState({ value: val, status: 'idle' });
  };

  const handleTilesChange = (next: TileItem[]) => {
    persistState({ tilesOrder: next.map((t) => t.text), status: 'idle' });
  };

  const handleSelectedWordsChange = (next: number[]) => {
    persistState({ selectedWordIndices: next, status: 'idle' });
  };

  const handleRechenwegChange = (nextRechenweg: string) => {
    persistState({ rechenweg: nextRechenweg });
  };

  const handleCheck = () => {
    if (!question.correctAnswers || question.correctAnswers.length === 0) return;

    let isMatch = false;
    if (interactionType === 'sentence_builder') {
      const sentence = tilesList.map((t) => t.text).join(' ');
      isMatch = isAnswerMatch(sentence, question.correctAnswers);
      const newStatus = isMatch ? 'correct' : 'incorrect';
      persistState({ tilesOrder: tilesList.map((t) => t.text), status: newStatus });
    } else if (interactionType === 'word_select') {
      if (selectedWordIndices.length === 0) return;
      const wordsList = question.words || [];
      const chosen = selectedWordIndices.map((i) => wordsList[i]).join(' ');
      isMatch = isAnswerMatch(chosen, question.correctAnswers, { isWordSelect: true });
      const newStatus = isMatch ? 'correct' : 'incorrect';
      persistState({ selectedWordIndices, status: newStatus });
    } else {
      const isChoice = Boolean(question.options && question.options.length > 0);
      isMatch = isAnswerMatch(value, question.correctAnswers, { isChoice });
      const newStatus = isMatch ? 'correct' : 'incorrect';
      persistState({ value, status: newStatus });
    }

    if (isMatch) {
      fireConfetti();
    }
  };

  const handleReset = () => {
    setSavedData(null);
    setShowSolution(false);
    setShowHint(false);
  };

  const canShowSolution = isTeacherMode || (!hideSampleSolution && Boolean(effectiveSampleSolution));
  const isPlainPlayground = interactionType === 'code' && !question.prompt;

  if (isPlainPlayground) {
    return (
      <div className="w-full">
        <JavaCodeRunner
          studentSlug={studentSlug}
          questionId={question.id}
          initialCode={question.initialCode}
          expectedOutput={question.expectedOutput}
          correctAnswers={question.correctAnswers}
          hint={question.hint}
          sampleSolution={effectiveSampleSolution}
          hideSampleSolution={hideSampleSolution && !isTeacherMode}
          stdin={question.stdin}
        />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4.5 shadow-xs transition-all hover:border-slate-300">
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
          {interactionType === 'rechnung' && (
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800 mb-1.5 border border-amber-200">
              <Calculator className="h-3 w-3 text-amber-600" />
              Mathematische Rechnung
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

      {interactionType === 'code' ? (
        <JavaCodeRunner
          studentSlug={studentSlug}
          questionId={question.id}
          initialCode={question.initialCode}
          expectedOutput={question.expectedOutput}
          correctAnswers={question.correctAnswers}
          hint={question.hint}
          sampleSolution={effectiveSampleSolution}
          hideSampleSolution={hideSampleSolution && !isTeacherMode}
          stdin={question.stdin}
        />
      ) : (
        <>
          <QuestionInteractionFields
            interactionType={interactionType}
            value={value}
            onValueChange={handleValueChange}
            tilesList={tilesList}
            onTilesChange={handleTilesChange}
            words={question.words}
            selectedWordIndices={selectedWordIndices}
            onSelectedWordsChange={handleSelectedWordsChange}
            options={question.options}
            placeholder={question.placeholder}
            isOpenEnded={question.isOpenEnded}
            status={status}
            showCheckButtons={true}
            hasCheckableAnswer={Boolean(question.correctAnswers && question.correctAnswers.length > 0)}
            onSubmit={handleCheck}
            rechenweg={rechenweg}
            onRechenwegChange={handleRechenwegChange}
          />

          {status === 'correct' && (
            <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Richtig! Sehr gut gelöst!</span>
            </div>
          )}

          {status === 'incorrect' && (
            <div className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-rose-700">
              <XCircle className="h-4 w-4 shrink-0" />
              <span>
                {interactionType === 'rechnung'
                  ? 'Noch nicht ganz richtig. Überprüfe Rechenweg, Vorzeichen oder Einheit noch einmal!'
                  : 'Noch nicht ganz richtig. Überprüfe deine Anordnung oder Eingabe noch einmal!'}
              </span>
            </div>
          )}

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

            {canShowSolution && effectiveSampleSolution && (
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

          {showHint && question.hint && (
            <div className="mt-2.5 rounded-lg bg-amber-50 p-3 text-xs text-amber-900 border border-amber-200">
              <span className="font-semibold">Tipp: </span>
              {question.hint}
            </div>
          )}

          {(showSolution || isTeacherMode) && effectiveSampleSolution && canShowSolution && (
            <div className="mt-2.5 rounded-lg bg-blue-50/80 p-3 text-xs text-blue-950 border border-blue-200">
              <p className="font-semibold text-blue-900 mb-1">
                Musterlösung{' '}
                {isTeacherMode && (
                  <span className="text-[10px] font-normal uppercase bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded-sm ml-1">
                    Lehrer-Ansicht
                  </span>
                )}
                :
              </p>
              <p className="leading-relaxed whitespace-pre-wrap">{effectiveSampleSolution}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
