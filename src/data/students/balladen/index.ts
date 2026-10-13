import { Student, Task } from '@/types/student';
import { unit03102026, balladenTasks } from './unit-03-10-2026';
import { unit05102026, balladenTasksDay2 } from './unit-05-10-2026';

const allBalladenTasks: Task[] = [...balladenTasks, ...balladenTasksDay2];

export const balladen: Student = {
  slug: 'deutsch-balladen',
  name: 'Deutsch: Balladen & Gedichtanalyse',
  grade: 'Sekundarstufe I (Klasse 7-8)',
  schoolType: 'Lyrik & Dramatik',
  subject: 'Deutsch',
  avatarLetter: 'B',
  notesForTeacher:
    'Didaktischer Schwerpunkt: Balladenanalyse (Ur-Ei der Dichtung: Lyrik, Epik, Dramatik), Formanalyse (Metrum, Reimschema), Schillers Handschuh, Goethes Erlkönig & Zauberlehrling, Sprachliche Stilmittel & Wirkung sowie TATTZ-Inhaltsangabe.',
  tasks: allBalladenTasks,
  dailyUnits: [unit03102026, unit05102026],
};
