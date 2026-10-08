import { Student } from '@/types/student';
import { unit06102026, matheTasks } from './unit-06-10-2026';

export const mathematik: Student = {
  slug: 'mathematik-statistik-geometrie',
  name: 'Mathematik: Statistik & Geometrie',
  grade: 'Sekundarstufe I (Klasse 8 / 4. Klasse Gymnasium)',
  schoolType: 'Statistik & Pythagoras',
  subject: 'Mathematik',
  avatarLetter: 'M',
  notesForTeacher:
    'Didaktischer Schwerpunkt: Statistische Kennwerte (Minimum, Maximum, Spannweite, Mittelwert, Modalwert & Median), Quantile & Quartilsabstand (Streumaße, Fünf-Punkte-Zusammenfassung & Boxplot-Verständnis), Satz des Pythagoras (Katheten, Hypotenuse, Umkehrung & Textaufgaben) sowie ebene Figuren & Flächen (Quadrate, Trapeze und Dreiecke).',
  tasks: matheTasks,
  dailyUnits: [unit06102026],
};
