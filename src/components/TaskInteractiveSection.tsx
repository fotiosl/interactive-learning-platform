'use client';

import { useState, useEffect } from 'react';
import { InputQuestion, Task, TaskType } from '@/types/student';
import { InputQuestionItem } from './InputQuestionItem';
import { ImageModal } from './ImageModal';
import { hasTeacherHintCookie } from './TeacherModeBar';
import { GraduationCap } from 'lucide-react';

interface TaskInteractiveSectionProps {
  taskId: string;
  taskType: TaskType;
  studentSlug: string;
  hideSampleSolution?: boolean;
  inputQuestions?: InputQuestion[];
}

interface TeacherSecrets {
  teacherNotes?: string;
  teacherSolutionImage?: Task['teacherSolutionImage'];
  sampleSolutions: Record<string, string>;
}

export function TaskInteractiveSection({
  taskId,
  taskType,
  studentSlug,
  hideSampleSolution,
  inputQuestions,
}: TaskInteractiveSectionProps) {
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [secrets, setSecrets] = useState<TeacherSecrets | null>(null);

  useEffect(() => {
    if (!hasTeacherHintCookie()) return;

    fetch(`/api/auth?student=${encodeURIComponent(studentSlug)}&task=${encodeURIComponent(taskId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.isAuthenticated) {
          setIsTeacherMode(true);
          if (data.taskSecrets) {
            setSecrets(data.taskSecrets);
          }
        }
      })
      .catch(() => {});
  }, [studentSlug, taskId]);

  const showHeader =
    inputQuestions &&
    inputQuestions.length > 0 &&
    (taskType === 'checklist' ||
      taskType === 'rechnung' ||
      inputQuestions.length > 1 ||
      (Boolean(inputQuestions[0].prompt) && inputQuestions[0].interactionType !== 'code'));

  return (
    <>
      {inputQuestions && inputQuestions.length > 0 && (
        <div className="space-y-4">
          {showHeader && (
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {taskType === 'checklist'
                ? `Wissens-Check (${inputQuestions.length} Fragen)`
                : taskType === 'rechnung'
                ? `Mathematische Aufgaben & Rechnungen (${inputQuestions.length} ${
                    inputQuestions.length === 1 ? 'Rechnung' : 'Rechnungen'
                  })`
                : `Aufgaben (${inputQuestions.length} ${
                    inputQuestions.length === 1 ? 'Übung' : 'Übungen'
                  })`}
            </h4>
          )}
          <div className="space-y-3">
            {inputQuestions.map((q) => (
              <InputQuestionItem
                key={q.id}
                question={q}
                studentSlug={studentSlug}
                taskId={taskId}
                isTeacherMode={isTeacherMode}
                teacherSampleSolution={secrets?.sampleSolutions?.[q.id]}
                hideSampleSolution={hideSampleSolution}
              />
            ))}
          </div>
        </div>
      )}

      {isTeacherMode && (secrets?.teacherNotes || secrets?.teacherSolutionImage) && (
        <div className="rounded-xl border border-amber-300 bg-amber-50/80 p-4 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-2">
            <GraduationCap className="h-4 w-4" />
            <span>Lehrer-Hinweis & Erwartungshorizont (Nur für dich sichtbar)</span>
          </div>
          {secrets.teacherNotes && (
            <p className="text-amber-900 leading-relaxed">{secrets.teacherNotes}</p>
          )}
          {secrets.teacherSolutionImage && (
            <div className="mt-3">
              <p className="font-semibold text-amber-900 mb-1">
                {secrets.teacherSolutionImage.title}:
              </p>
              <ImageModal
                src={secrets.teacherSolutionImage.src}
                alt={secrets.teacherSolutionImage.alt}
                caption={secrets.teacherSolutionImage.title}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
