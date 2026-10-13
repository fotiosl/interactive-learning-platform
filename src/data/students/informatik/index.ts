import { Student } from '@/types/student';
import { unit04102026, informatikTasks } from './unit-04-10-2026';

export const informatik: Student = {
  slug: 'informatik-java',
  name: 'Informatik: Java Programmierung',
  grade: 'Informatik Grundlagen & Programmierung',
  schoolType: 'Softwareentwicklung',
  subject: 'Informatik',
  avatarLetter: 'J',
  notesForTeacher:
    'Didaktischer Schwerpunkt: Schrittweiser Einstieg in die Java-Programmierung – Bildschirmausgaben, Variablen, einfache Berechnungen, Verzweigungen (if), while-Schleifen (Zählschleifen & Akkumulatoren) mit interaktivem Live-Compiler und Konsolenausgabe.',
  tasks: informatikTasks,
  dailyUnits: [unit04102026],
};
