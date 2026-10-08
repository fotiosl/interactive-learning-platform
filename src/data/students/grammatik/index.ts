import { Student } from '@/types/student';
import { unit03102026, grammatikTasks } from './unit-03-10-2026';

export const grammatik: Student = {
  slug: 'deutsch-grammatik',
  name: 'Deutsch: Satzglieder & Wortbildung',
  grade: 'Primar- & Orientierungsstufe',
  schoolType: 'Grammatik & Rechtschreibung',
  subject: 'Deutsch',
  avatarLetter: 'G',
  notesForTeacher:
    'Didaktischer Schwerpunkt: Satzglieder erkennen (Prädikat, Prädikatsklammer, Subjekt), Satzbau aus Satzgliedern sowie Nomenbildung mit Wortbausteinen (-heit, -keit, -ung, -nis, -schaft).',
  tasks: grammatikTasks,
  dailyUnits: [unit03102026],
};
