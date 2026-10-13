import { Student } from '@/types/student';
import { unit07102026, epochenTasks } from './unit-07-10-2026';

export const epochen: Student = {
  slug: 'deutsch-epochen',
  name: 'Deutsch: Literatur-Epochen & Gedichtanalyse',
  grade: 'Sekundarstufe II / Oberstufe (Klasse 11-13)',
  schoolType: 'Literaturgeschichte & Lyrikanalyse',
  subject: 'Deutsch',
  avatarLetter: 'E',
  notesForTeacher:
    'Didaktischer Schwerpunkt: 5 Kernepochen der deutschen Literaturgeschichte – Aufklärung (Gellert), Sturm und Drang (Goethes Mailied), Weimarer Klassik (Goethes Das Göttliche), Romantik (Eichendorffs Mondnacht) und Expressionismus (Heyms Der Gott der Stadt). Je 3 Aufgabenmodule pro Zeitalter: Epochenwissen, Form- & Stilanalyse, TATTE-Interpretation.',
  tasks: epochenTasks,
  dailyUnits: [unit07102026],
};
