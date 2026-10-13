import { Student } from '@/types/student';
import { unit12102026, potenzenTasks } from './unit-12-10-2026';

export const potenzen: Student = {
  slug: 'mathematik-potenzen',
  name: 'Mathematik: Potenzen & Zehnerpotenzen',
  grade: 'Sekundarstufe I (Klasse 7-8)',
  schoolType: 'Arithmetik & Potenzgesetze',
  subject: 'Mathematik',
  avatarLetter: 'M',
  notesForTeacher:
    'Didaktischer Schwerpunkt: 1. Grundlagen von Potenzen (Basis, Exponent, Wert, Vorzeichenregeln bei negativer Basis (-a)^n vs. -a^n), 2. Zehnerpotenzen & Stellenwerte (große Zahlen, wissenschaftliche Schreibweise, Potenzen mit Exponent 0), 3. Potenzgesetze & Rechenregeln (Punkt-vor-Strich mit Potenzen, gleiche Basis multiplizieren/dividieren, Potenzen potenzieren).',
  tasks: potenzenTasks,
  dailyUnits: [unit12102026],
};
