import { Student } from '@/types/student';
import { unit06102026, conditionalsTasks } from './unit-06-10-2026';

export const conditionals: Student = {
  slug: 'englisch-conditionals',
  name: 'Englisch: Conditional Sentences (Type 1 & 2)',
  grade: 'Sekundarstufe I (Klasse 7-8)',
  schoolType: 'Grammatik & Satzbau',
  subject: 'Englisch',
  avatarLetter: 'C',
  notesForTeacher:
    'Didaktischer Schwerpunkt: If-Clauses (Conditional Sentences) – Reale Bedingungen (Type 1: Simple Present + will-future/can/must) vs. hypothetische Bedingungen (Type 2: Simple Past + would/could), Ratschläge mit "If I were you", Satzstellungsregeln und Fehlerkorrektur.',
  tasks: conditionalsTasks,
  dailyUnits: [unit06102026],
};
