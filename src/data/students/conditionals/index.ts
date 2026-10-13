import { Student, Task } from '@/types/student';
import { unit06102026, conditionalsTasksDay3 } from './unit-06-10-2026';
import { unit12102026, conditionalsTasksDay4 } from './unit-12-10-2026';

const allConditionalsTasks: Task[] = [...conditionalsTasksDay3, ...conditionalsTasksDay4];

export const conditionals: Student = {
  slug: 'englisch-conditionals',
  name: 'Englisch: Conditional Sentences (Type 1 & 2)',
  grade: 'Sekundarstufe I (Klasse 7-8)',
  schoolType: 'Grammatik & Satzbau',
  subject: 'Englisch',
  avatarLetter: 'C',
  notesForTeacher:
    'Didaktischer Schwerpunkt: If-Clauses (Conditional Sentences) – Reale Bedingungen (Type 1: Simple Present + will-future/can/must) vs. hypothetische Bedingungen (Type 2: Simple Past + would/could), Ratschläge mit "If I were you", Satzstellungsregeln und Fehlerkorrektur mit über 150 abwechslungsreichen Übungen.',
  tasks: allConditionalsTasks,
  dailyUnits: [unit06102026, unit12102026],
};
