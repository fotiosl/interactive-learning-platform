import { Student } from '@/types/student';
import { unit03102026, rechnungswesenTasks } from './unit-03-10-2026';

export const rechnungswesen: Student = {
  slug: 'rechnungswesen',
  name: 'BWL & Rechnungswesen',
  grade: 'Kaufmännische Bildung & Wirtschaftsgymnasium',
  schoolType: 'Finanzbuchhaltung & BWL',
  subject: 'Rechnungswesen',
  avatarLetter: 'R',
  notesForTeacher:
    'Didaktischer Schwerpunkt: Doppelte Buchführung – Buchungsregeln (Soll an Haben), Inventur & Bilanzaufbau nach HGB, Liquiditätsgliederung, Reinvermögen und praktische Buchungssätze auf T-Konten.',
  tasks: rechnungswesenTasks,
  dailyUnits: [unit03102026],
};
