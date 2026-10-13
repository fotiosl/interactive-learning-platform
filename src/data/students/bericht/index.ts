import { Student } from '@/types/student';
import { unit08102026, berichtTasks } from './unit-08-10-2026';

export const bericht: Student = {
  slug: 'deutsch-bericht',
  name: 'Deutsch: Einen Bericht schreiben',
  grade: 'Sekundarstufe I (Klasse 7)',
  schoolType: 'Aufsatz & Sachtext',
  subject: 'Deutsch',
  avatarLetter: 'B',
  notesForTeacher:
    'Didaktischer Schwerpunkt: Aufbau eines sachlichen Berichts (Überschrift, Einleitung mit den 4 W-Fragen Wer, Was, Wann, Wo; Hauptteil mit Wie und Warum; Schlussteil mit Folgen/Ausblick), sachlicher Stil, Vermeidung von Meinungen/Gefühlen, Zeitformen Präteritum und Plusquamperfekt sowie Umwandlung emotionaler Zeugenaussagen in objektiven Sachtext.',
  tasks: berichtTasks,
  dailyUnits: [unit08102026],
};
