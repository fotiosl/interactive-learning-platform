import { Student } from '@/types/student';
import { unit06102026, englischTasks } from './unit-06-10-2026';

export const englisch: Student = {
  slug: 'englisch-new-york',
  name: 'Englisch: New York City (Green Words)',
  grade: 'Sekundarstufe I (Klasse 8)',
  schoolType: 'Wortschatz & Leseverstehen',
  subject: 'Englisch',
  avatarLetter: 'E',
  notesForTeacher:
    'Didaktischer Schwerpunkt: Green Words (New York City) – Wortschatz rund um Reisevorbereitung & Flughafen (papers, dried fruit, packing list, diary), Hotel & Stadtleben (lobby, terrace, loft, fire escapes, skyline) sowie Gefühle, Shopping & Gegenteile (heartbroken, exhausted, Macy\'s department store, opposites).',
  tasks: englischTasks,
  dailyUnits: [unit06102026],
};
