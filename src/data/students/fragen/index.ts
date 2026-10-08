import { Student } from '@/types/student';
import { unit07102026, fragenTasks } from './unit-07-10-2026';

export const fragen: Student = {
  slug: 'englisch-fragen-satzbau',
  name: 'Englisch: Fragenbildung & Satzbau',
  grade: 'Sekundarstufe I (Klasse 6)',
  schoolType: 'Grammatik & Syntax',
  subject: 'Englisch',
  avatarLetter: 'F',
  notesForTeacher:
    'Didaktischer Schwerpunkt: 1. Fragenbildung im Englischen (Entscheidungsfragen, W-Fragen, QuASV-Regel: Question word - Auxiliary - Subject - Verb, do/does/did, be, can, Subjekt- vs. Objektfragen), 2. Satzstellung (SPO-Grundregel, Häufigkeitsadverbien vor Vollverb / nach be, Ort vor Zeit / Place before Time) mit 40 abwechslungsreichen Übungen.',
  tasks: fragenTasks,
  dailyUnits: [unit07102026],
};
