export type TaskType = 'input' | 'checklist' | 'quiz' | 'worksheet';

export type QuestionInteractionType = 'input' | 'word_select' | 'sentence_builder' | 'choice' | 'code';

export interface InputQuestion {
  id: string;
  prompt: string;
  context?: string;
  correctAnswers?: string[];
  placeholder?: string;
  sampleSolution?: string;
  hint?: string;
  isOpenEnded?: boolean;
  interactionType?: QuestionInteractionType;
  words?: string[]; // Clickable words in sentence for word_select
  tiles?: string[]; // Draggable and clickable tiles for sentence_builder
  options?: string[]; // Clickable choices for choice interaction
  initialCode?: string; // Starter code / template for code runner
  expectedOutput?: string; // Expected console output to check if answer is right!
  language?: 'java'; // Programming language (default: 'java')
  stdin?: string; // Standard input (e.g. for Scanner inputs)
}

export interface ChecklistItem {
  id: string;
  text: string;
  category?: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  explanation?: string;
}

export interface Task {
  id: string;
  topicSlug: string; // Used in URL branch: /[student]/[date]/[topicSlug]
  date?: string; // e.g. '03.10.2026'
  title: string;
  subject: string;
  topic: string;
  dateBadge?: string;
  description: string;
  type: TaskType;
  hideSampleSolution?: boolean; // When true, no sample solution is displayed to students
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  inputQuestions?: InputQuestion[];
  checklistItems?: ChecklistItem[];
  quizQuestions?: QuizQuestion[];
  teacherNotes?: string;
  teacherSolutionImage?: {
    src: string;
    alt: string;
    title: string;
  };
  readingText?: {
    title?: string;
    content: string;
    source?: string;
  };
}

export interface DailyLearningUnit {
  id: string;
  date: string; // e.g. '03.10.2026'
  title: string;
  description?: string;
  tasks: Task[];
}

export interface Student {
  slug: string;
  name: string;
  grade: string;
  schoolType?: string;
  subject: string;
  avatarLetter: string;
  notesForTeacher?: string;
  tasks: Task[];
  dailyUnits?: DailyLearningUnit[];
}

