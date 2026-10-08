'use client';

import { Task } from '@/types/student';
import { ImageModal } from './ImageModal';
import { InputQuestionItem } from './InputQuestionItem';
import { ChecklistGroup } from './ChecklistGroup';
import { GraduationCap, BookOpen, Calendar, Tag, FileText } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  studentSlug: string;
  isTeacherMode?: boolean;
}

export function TaskCard({ task, studentSlug, isTeacherMode }: TaskCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-shadow hover:shadow-sm">
      {/* Task Header */}
      <div className="border-b border-slate-100 bg-slate-50/80 p-5">
        <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 font-semibold text-blue-700">
            <BookOpen className="h-3 w-3" />
            {task.subject}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 font-medium text-purple-700">
            <Tag className="h-3 w-3" />
            {task.topic}
          </span>
          {task.dateBadge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 font-medium text-amber-800">
              <Calendar className="h-3 w-3" />
              {task.dateBadge}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-slate-900">{task.title}</h3>
        <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">
          {task.description}
        </p>
      </div>

      <div className="p-5 space-y-6">
        {/* Reading Text Box (e.g. for Argumentation & Text Analysis) */}
        {task.readingText && (
          <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5 shadow-2xs">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-blue-900">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>{task.readingText.title || 'Vorgelegter Text zur Analyse'}</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4.5 text-sm sm:text-base leading-relaxed text-slate-800 shadow-2xs whitespace-pre-wrap font-serif">
              {task.readingText.content}
            </div>
            {task.readingText.source && (
              <p className="mt-2 text-[11px] text-slate-500 italic">
                Quelle: {task.readingText.source}
              </p>
            )}
          </div>
        )}

        {/* Attached Worksheet / Material scan (if present) */}
        {task.image && (
          <ImageModal
            src={task.image.src}
            alt={task.image.alt}
            caption={task.image.caption}
          />
        )}

        {/* Checklist for checklist tasks */}
        {task.type === 'checklist' && task.checklistItems && task.checklistItems.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Interaktive Checkliste zum Abhaken
            </h4>
            <ChecklistGroup
              items={task.checklistItems}
              studentSlug={studentSlug}
              taskId={task.id}
            />
          </div>
        )}

        {/* Input Questions / Wissens-Check */}
        {task.inputQuestions && task.inputQuestions.length > 0 && (
          <div className="space-y-4">
            {task.type === 'checklist' ? (
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Wissens-Check zur Klassenarbeit ({task.inputQuestions.length} Fragen)
              </h4>
            ) : task.inputQuestions.length > 1 || (Boolean(task.inputQuestions[0].prompt) && task.inputQuestions[0].interactionType !== 'code') ? (
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Aufgaben ({task.inputQuestions.length} {task.inputQuestions.length === 1 ? 'Übung' : 'Übungen'})
              </h4>
            ) : null}
            <div className="space-y-3">
              {task.inputQuestions.map((q) => (
                <InputQuestionItem
                  key={q.id}
                  question={q}
                  studentSlug={studentSlug}
                  taskId={task.id}
                  isTeacherMode={isTeacherMode}
                  hideSampleSolution={task.hideSampleSolution}
                />
              ))}
            </div>
          </div>
        )}

        {/* Checklist for non-checklist tasks */}
        {task.type !== 'checklist' && task.checklistItems && task.checklistItems.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Checkliste zum Abhaken
            </h4>
            <ChecklistGroup
              items={task.checklistItems}
              studentSlug={studentSlug}
              taskId={task.id}
            />
          </div>
        )}

        {/* Teacher Mode Exclusive Box */}
        {isTeacherMode && (task.teacherNotes || task.teacherSolutionImage) && (
          <div className="rounded-xl border border-amber-300 bg-amber-50/80 p-4 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-2">
              <GraduationCap className="h-4 w-4" />
              <span>Lehrer-Hinweis & Erwartungshorizont (Nur für dich sichtbar)</span>
            </div>
            {task.teacherNotes && (
              <p className="text-amber-900 leading-relaxed">
                {task.teacherNotes}
              </p>
            )}
            {task.teacherSolutionImage && (
              <div className="mt-3">
                <p className="font-semibold text-amber-900 mb-1">
                  {task.teacherSolutionImage.title}:
                </p>
                <ImageModal
                  src={task.teacherSolutionImage.src}
                  alt={task.teacherSolutionImage.alt}
                  caption={task.teacherSolutionImage.title}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
