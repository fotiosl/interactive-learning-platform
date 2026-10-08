import { Student, Task } from '@/types/student';
import { unit03102026, eroerterungTasks } from './unit-03-10-2026';
import { unit05102026, eroerterungTasksDay2 } from './unit-05-10-2026';

const allEroerterungTasks: Task[] = [...eroerterungTasks, ...eroerterungTasksDay2];

export const eroerterung: Student = {
  slug: 'deutsch-eroerterung',
  name: 'Deutsch: Argumentation & Erörterung',
  grade: 'Sekundarstufe I/II (Klasse 9-10)',
  schoolType: 'Argumentation & Textanalyse',
  subject: 'Deutsch',
  avatarLetter: 'E',
  notesForTeacher:
    'Didaktischer Schwerpunkt: Lineare & dialektische Erörterung – Thesen, Argumente und empirische Belege (Studien) im Text unterscheiden, Problemfragen in der Einleitung, Sanduhr-Prinzip im Hauptteil sowie begründete eigene Meinung im Schlussteil.',
  tasks: allEroerterungTasks,
  dailyUnits: [unit03102026, unit05102026],
};
