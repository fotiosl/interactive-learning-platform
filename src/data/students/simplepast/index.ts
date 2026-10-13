import { Student } from '@/types/student';
import { unit12102026, simplePastTasks } from './unit-12-10-2026';

export const simplepast: Student = {
  slug: 'englisch-simple-past',
  name: 'Englisch: Simple Past & Pronomen',
  grade: 'Sekundarstufe I (Klasse 6)',
  schoolType: 'Grammatik & Satzverknüpfung',
  subject: 'Englisch',
  avatarLetter: 'P',
  notesForTeacher:
    'Didaktischer Schwerpunkt: 1. Simple Past (regelmäßige Verben mit Rechtschreibregeln, unregelmäßige Verben, be was/were, Verneinung mit didn’t + Infinitiv, Fragen und Kurzantworten mit did), 2. Demonstrative Pronouns (this, that, these, those), 3. Connectives (and, but, or, so, because – logische Satzverknüpfungen und Unterschied zwischen Ursache und Folge).',
  tasks: simplePastTasks,
  dailyUnits: [unit12102026],
};
