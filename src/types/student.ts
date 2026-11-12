export type TaskType = 'input' | 'checklist' | 'rechnung';

export type QuestionInteractionType = 'input' | 'word_select' | 'sentence_builder' | 'choice' | 'code' | 'rechnung';

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

export interface Task {
  id: string;
  topicSlug: string; // Used in URL branch: /[student]/[date]/[topicSlug]
  date?: string; // e.g. '01.01.2026'
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
  images?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  inputQuestions?: InputQuestion[];
  checklistItems?: ChecklistItem[];
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
  date: string; // e.g. '01.01.2026'
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

// ============================================================================
// Lightweight Server-to-Client DTOs (prevents RSC over-serialization & leaks)
// ============================================================================

export interface StudentMeta {
  dirName: string;
  slug: string;
  aliases?: string[];
  name: string;
  grade: string;
  schoolType?: string;
  subject: string;
  avatarLetter: string;
  notesForTeacher?: string;
  units: string[];
}

export interface DailyUnitSummaryDTO {
  id: string;
  date: string;
  title: string;
  description?: string;
  totalQuestions: number;
  topics: { id: string; topic: string; topicSlug: string }[];
}

export interface TopicBranchSummaryDTO {
  id: string;
  topicSlug: string;
  topic: string;
  title: string;
  description: string;
  dateBadge?: string;
  type: TaskType;
  questionCount: number;
}

export interface ProbetestQuestionDTO {
  id: string;
  taskId: string;
  topicTitle: string;
  topicSlug: string;
  date: string;
  prompt: string;
  context?: string;
  placeholder?: string;
  correctAnswers: string[];
  sampleSolution?: string;
  hideSampleSolution?: boolean;
  hint?: string;
  interactionType?: QuestionInteractionType;
  words?: string[];
  tiles?: string[];
  options?: string[];
}

export interface ProbetestTopicDTO {
  taskId: string;
  topicSlug: string;
  date: string;
  topic: string;
  title: string;
  readingText?: Task['readingText'];
  images?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  questions: ProbetestQuestionDTO[];
}

export interface TeacherStudentSummaryDTO {
  slug: string;
  name: string;
  grade: string;
  schoolType?: string;
  subject: string;
  avatarLetter: string;
  notesForTeacher?: string;
  latestUnitDate?: string;
  topics: { id: string; date: string; topicSlug: string; topic: string }[];
}
