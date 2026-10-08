import { Student } from '@/types/student';
import { unit07102026, kurzgeschichtenTasks } from './unit-07-10-2026';

export const kurzgeschichten: Student = {
  slug: 'deutsch-kurzgeschichten',
  name: 'Deutsch: Kurzgeschichten & Inhaltsangabe',
  grade: 'Sekundarstufe I (Klasse 8)',
  schoolType: 'Epik & Sprachbetrachtung',
  subject: 'Deutsch',
  avatarLetter: 'K',
  notesForTeacher:
    'Didaktischer Schwerpunkt: 1. Inhaltsangabe nach TATTE (sachlicher Stil, Präsens, Sinnabschnitte, Konjunktionen), 2. Merkmale der Kurzgeschichte (in medias res, offenes Ende, Wendepunkt, Leerstellen), 3. Figurenanalyse zu „Der höfliche Junge“ (Etgar Keret: direkte/indirekte Charakterisierung, Schutzfunktion von Höflichkeit), 4. Rechtschreibung: das oder dass? mit Ersatzprobe.',
  tasks: kurzgeschichtenTasks,
  dailyUnits: [unit07102026],
};
