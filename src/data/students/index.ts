import { Student, DailyLearningUnit } from '@/types/student';
import { grammatik } from './grammatik';
import { balladen } from './balladen';
import { eroerterung } from './eroerterung';
import { rechnungswesen } from './rechnungswesen';
import { informatik } from './informatik';
import { englisch } from './englisch';
import { mathematik } from './mathematik';
import { conditionals } from './conditionals';
import { epochen } from './epochen';
import { kurzgeschichten } from './kurzgeschichten';
import { fragen } from './fragen';
import { bericht } from './bericht';

export const allStudents: Student[] = [
  balladen,
  bericht,
  eroerterung,
  grammatik,
  rechnungswesen,
  informatik,
  englisch,
  mathematik,
  conditionals,
  epochen,
  kurzgeschichten,
  fragen,
];

export function getAllStudents(): Student[] {
  return allStudents;
}

export function getStudentBySlug(slug: string): Student | undefined {
  return allStudents.find((s) => s.slug.toLowerCase() === slug.toLowerCase());
}

export function getStudentDailyUnits(student: Student): DailyLearningUnit[] {
  if (student.dailyUnits && student.dailyUnits.length > 0) {
    return student.dailyUnits;
  }

  const map = new Map<string, typeof student.tasks>();
  for (const t of student.tasks) {
    const d = t.date || '03.10.2026';
    if (!map.has(d)) map.set(d, []);
    map.get(d)!.push(t);
  }

  return Array.from(map.entries()).map(([date, tasks]) => ({
    id: `${student.slug}-${date}`,
    date,
    title: `Lerneinheit ${date}`,
    description: `Themenbereiche und Aufgaben vom ${date}`,
    tasks,
  }));
}

export function getDailyUnit(student: Student, date: string): DailyLearningUnit | undefined {
  const units = getStudentDailyUnits(student);
  const normalized = date.trim().toLowerCase().replace(/-/g, '.');
  return units.find(
    (u) =>
      u.date.toLowerCase() === normalized ||
      u.date.toLowerCase().replace(/\./g, '-') === date.toLowerCase()
  );
}
