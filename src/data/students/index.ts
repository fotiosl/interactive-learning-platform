import fs from 'fs';
import path from 'path';
import type {
  Student,
  DailyLearningUnit,
  Task,
  StudentMeta,
  DailyUnitSummaryDTO,
  TopicBranchSummaryDTO,
  ProbetestTopicDTO,
  ProbetestQuestionDTO,
  TeacherStudentSummaryDTO,
} from '../../types/student.ts';

if (typeof window !== 'undefined') {
  throw new Error('src/data/students is a server-only data layer and must never be imported in Client Components.');
}

function resolveDataDir(): string {
  const cwd = process.cwd();
  if (process.env.NEXT_PUBLIC_APP_MODE === 'public') {
    const pubDir = path.join(cwd, 'src', 'data', 'public-modules');
    if (fs.existsSync(path.join(pubDir, 'manifest.json'))) {
      return pubDir;
    }
  }
  return path.join(cwd, 'src', 'data', 'students');
}

function parseGermanDateTs(dateStr?: string): number {
  if (!dateStr) return 0;
  const parts = dateStr.trim().split('.');
  if (parts.length !== 3) return 0;
  const day = Number(parts[0]);
  const month = Number(parts[1]);
  const year = Number(parts[2]);
  if (!Number.isFinite(day) || !Number.isFinite(month) || !Number.isFinite(year)) return 0;
  return Date.UTC(year, month - 1, day);
}

interface CachedMetaIndex {
  dataDir: string;
  manifestMtimeMs: number;
  metaMtimes: Map<string, number>;
  list: StudentMeta[];
  bySlug: Map<string, StudentMeta>;
}

let cachedMetaIndex: CachedMetaIndex | null = null;
const unitCache = new Map<string, { mtimeMs: number; unit: DailyLearningUnit }>();

function getSafeMtimeMs(filePath: string): number {
  try {
    return fs.statSync(filePath).mtimeMs;
  } catch {
    return -1;
  }
}

function isMetaIndexFresh(cache: CachedMetaIndex, dataDir: string): boolean {
  if (cache.dataDir !== dataDir) return false;
  const manifestMtime = getSafeMtimeMs(path.join(dataDir, 'manifest.json'));
  if (manifestMtime !== cache.manifestMtimeMs) return false;

  for (const [metaPath, recordedMtime] of cache.metaMtimes) {
    if (getSafeMtimeMs(metaPath) !== recordedMtime) return false;
  }
  return true;
}

function ensureMetaIndex(): { list: StudentMeta[]; bySlug: Map<string, StudentMeta>; dataDir: string } {
  const dataDir = resolveDataDir();
  if (cachedMetaIndex && isMetaIndexFresh(cachedMetaIndex, dataDir)) {
    return {
      list: cachedMetaIndex.list,
      bySlug: cachedMetaIndex.bySlug,
      dataDir,
    };
  }

  const manifestPath = path.join(dataDir, 'manifest.json');
  const manifestMtimeMs = getSafeMtimeMs(manifestPath);
  let dirs: string[];
  if (manifestMtimeMs >= 0) {
    const parsed = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as { students?: string[] };
    dirs = parsed.students || [];
  } else {
    dirs = fs
      .readdirSync(dataDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  }

  const list: StudentMeta[] = [];
  const bySlug = new Map<string, StudentMeta>();
  const metaMtimes = new Map<string, number>();

  for (const dirName of dirs) {
    const metaPath = path.join(dataDir, dirName, 'meta.json');
    const metaMtime = getSafeMtimeMs(metaPath);
    if (metaMtime < 0) continue;
    metaMtimes.set(metaPath, metaMtime);

    const raw = JSON.parse(fs.readFileSync(metaPath, 'utf8')) as Omit<StudentMeta, 'dirName'>;
    const meta: StudentMeta = { ...raw, dirName };
    list.push(meta);
    bySlug.set(meta.slug.toLowerCase(), meta);
    if (meta.aliases) {
      for (const alias of meta.aliases) {
        bySlug.set(alias.toLowerCase(), meta);
      }
    }
  }

  cachedMetaIndex = { dataDir, manifestMtimeMs, metaMtimes, list, bySlug };
  return { list, bySlug, dataDir };
}

function loadUnitFile(dataDir: string, dirName: string, unitFile: string): DailyLearningUnit {
  const fullPath = path.join(dataDir, dirName, unitFile);
  const mtimeMs = getSafeMtimeMs(fullPath);
  const cacheKey = `${dataDir}:${dirName}/${unitFile}`;
  const hit = unitCache.get(cacheKey);
  if (hit && hit.mtimeMs === mtimeMs) {
    return hit.unit;
  }

  const unit = JSON.parse(fs.readFileSync(fullPath, 'utf8')) as DailyLearningUnit;
  unitCache.set(cacheKey, { mtimeMs, unit });
  return unit;
}

// ============================================================================
// Fast On-Demand Server Queries & Minimal DTO Builders
// ============================================================================

export function getStudentMetaList(): StudentMeta[] {
  return ensureMetaIndex().list;
}

export function getStudentMetaBySlug(slug: string): StudentMeta | undefined {
  return ensureMetaIndex().bySlug.get(slug.trim().toLowerCase());
}

export function getStudentRosterDTO(): { name: string; slug: string; avatarLetter: string }[] {
  return getStudentMetaList().map((m) => ({
    name: m.name,
    slug: m.slug,
    avatarLetter: m.avatarLetter,
  }));
}

export function getDailyUnitBySlug(slug: string, dateParam: string): DailyLearningUnit | undefined {
  const { bySlug, dataDir } = ensureMetaIndex();
  const meta = bySlug.get(slug.trim().toLowerCase());
  if (!meta) return undefined;

  const normalizedDot = dateParam.trim().toLowerCase().replace(/-/g, '.');
  const normalizedDash = dateParam.trim().toLowerCase().replace(/\./g, '-');
  const expectedFile = `unit-${normalizedDash}.json`;

  // Fast path: O(1) direct file read without loading any other units
  if (meta.units.some((u) => u.toLowerCase() === expectedFile)) {
    const exactName = meta.units.find((u) => u.toLowerCase() === expectedFile)!;
    return loadUnitFile(dataDir, meta.dirName, exactName);
  }

  // Fallback scan across this single student's units
  for (const unitFile of meta.units) {
    const u = loadUnitFile(dataDir, meta.dirName, unitFile);
    if (
      u.date.toLowerCase() === normalizedDot ||
      u.date.toLowerCase().replace(/\./g, '-') === normalizedDash
    ) {
      return u;
    }
  }

  return undefined;
}

const DEFAULT_FALLBACK_DATE =
  process.env.NEXT_PUBLIC_APP_MODE === 'public' ? '01.01.2026' : '01.01.2026';

export function findLegacyTopicRedirect(
  slug: string,
  legacyTopicSlug: string
): { canonicalSlug: string; date: string; topicSlug: string } | undefined {
  const { bySlug, dataDir } = ensureMetaIndex();
  const meta = bySlug.get(slug.trim().toLowerCase());
  if (!meta) return undefined;

  const target = legacyTopicSlug.trim().toLowerCase();
  for (const unitFile of meta.units) {
    const unit = loadUnitFile(dataDir, meta.dirName, unitFile);
    const matched = unit.tasks.find((t) => t.topicSlug.toLowerCase() === target);
    if (matched) {
      return {
        canonicalSlug: meta.slug,
        date: matched.date || unit.date || DEFAULT_FALLBACK_DATE,
        topicSlug: matched.topicSlug,
      };
    }
  }
  return undefined;
}

export function getLatestUnitSummary(meta: StudentMeta): DailyLearningUnit | undefined {
  if (meta.units.length === 0) return undefined;
  const { dataDir } = ensureMetaIndex();
  let latest: DailyLearningUnit | undefined;
  let latestTs = -Infinity;
  for (const unitFile of meta.units) {
    const u = loadUnitFile(dataDir, meta.dirName, unitFile);
    const ts = parseGermanDateTs(u.date);
    if (!latest || ts >= latestTs) {
      latest = u;
      latestTs = ts;
    }
  }
  return latest;
}

export function getStudentOverviewDTO(slug: string): {
  meta: StudentMeta;
  totalTopics: number;
  hasCheckableQuestions: boolean;
  dailyUnits: DailyUnitSummaryDTO[];
} | undefined {
  const { bySlug, dataDir } = ensureMetaIndex();
  const meta = bySlug.get(slug.trim().toLowerCase());
  if (!meta) return undefined;

  let totalTopics = 0;
  let hasCheckableQuestions = false;

  const dailyUnits: DailyUnitSummaryDTO[] = meta.units.map((unitFile) => {
    const u = loadUnitFile(dataDir, meta.dirName, unitFile);
    totalTopics += u.tasks.length;
    let totalQuestions = 0;

    for (const t of u.tasks) {
      totalQuestions += t.inputQuestions?.length || t.checklistItems?.length || 0;
      if (
        !hasCheckableQuestions &&
        t.inputQuestions?.some((q) => q.correctAnswers && q.correctAnswers.length > 0 && q.interactionType !== 'code')
      ) {
        hasCheckableQuestions = true;
      }
    }

    return {
      id: u.id,
      date: u.date,
      title: u.title,
      description: u.description,
      totalQuestions,
      topics: u.tasks.map((t) => ({
        id: t.id,
        topic: t.topic,
        topicSlug: t.topicSlug,
      })),
    };
  });

  return { meta, totalTopics, hasCheckableQuestions, dailyUnits };
}

export function getDailyUnitOverviewDTO(
  slug: string,
  dateParam: string
): {
  meta: StudentMeta;
  unit: {
    id: string;
    date: string;
    title: string;
    description?: string;
    hasCheckableQuestions: boolean;
    topics: TopicBranchSummaryDTO[];
  };
} | undefined {
  const meta = getStudentMetaBySlug(slug);
  if (!meta) return undefined;

  const u = getDailyUnitBySlug(slug, dateParam);
  if (!u) return undefined;

  const hasCheckableQuestions = u.tasks.some((t) =>
    (t.inputQuestions || []).some(
      (q) => q.correctAnswers && q.correctAnswers.length > 0 && q.interactionType !== 'code'
    )
  );

  const topics: TopicBranchSummaryDTO[] = u.tasks.map((t) => ({
    id: t.id,
    topicSlug: t.topicSlug,
    topic: t.topic,
    title: t.title,
    description: t.description,
    dateBadge: t.dateBadge,
    type: t.type,
    questionCount: t.inputQuestions?.length || t.checklistItems?.length || 0,
  }));

  return {
    meta,
    unit: {
      id: u.id,
      date: u.date,
      title: u.title,
      description: u.description,
      hasCheckableQuestions,
      topics,
    },
  };
}

/**
 * Strips private teacher-only notes/images and hidden sample solutions
 * before rendering a Task on a public student route.
 */
export function sanitizeTaskForStudent(task: Task): Task {
  const publicTask: Task = { ...task };
  delete publicTask.teacherNotes;
  delete publicTask.teacherSolutionImage;
  if (publicTask.hideSampleSolution && publicTask.inputQuestions) {
    publicTask.inputQuestions = publicTask.inputQuestions.map((q) => {
      if (!q.sampleSolution) return q;
      const restQ = { ...q };
      delete restQ.sampleSolution;
      return restQ;
    });
  }
  return publicTask;
}

export function getTeacherTaskSecrets(
  slug: string,
  taskId: string
): {
  teacherNotes?: string;
  teacherSolutionImage?: Task['teacherSolutionImage'];
  sampleSolutions: Record<string, string>;
} | undefined {
  const { bySlug, dataDir } = ensureMetaIndex();
  const meta = bySlug.get(slug.trim().toLowerCase());
  if (!meta) return undefined;

  for (const unitFile of meta.units) {
    const unit = loadUnitFile(dataDir, meta.dirName, unitFile);
    const task = unit.tasks.find((t) => t.id === taskId);
    if (task) {
      const sampleSolutions: Record<string, string> = {};
      for (const q of task.inputQuestions || []) {
        if (q.sampleSolution) {
          sampleSolutions[q.id] = q.sampleSolution;
        }
      }
      return {
        teacherNotes: task.teacherNotes,
        teacherSolutionImage: task.teacherSolutionImage,
        sampleSolutions,
      };
    }
  }
  return undefined;
}

export function getProbetestDTO(
  slug: string,
  dateFilter?: string
): {
  meta: StudentMeta;
  unitDate?: string;
  topics: ProbetestTopicDTO[];
} | undefined {
  const { bySlug, dataDir } = ensureMetaIndex();
  const meta = bySlug.get(slug.trim().toLowerCase());
  if (!meta) return undefined;

  let units: DailyLearningUnit[];
  let unitDate: string | undefined;

  if (dateFilter) {
    const u = getDailyUnitBySlug(slug, dateFilter);
    if (!u) return undefined;
    units = [u];
    unitDate = u.date;
  } else {
    // Present newest units/topics first so default selection picks the most recent topics
    units = meta.units
      .map((uf) => loadUnitFile(dataDir, meta.dirName, uf))
      .sort((a, b) => parseGermanDateTs(b.date) - parseGermanDateTs(a.date));
  }

  const topics: ProbetestTopicDTO[] = [];

  for (const u of units) {
    for (const t of u.tasks) {
      const taskImages: { src: string; alt: string; caption?: string }[] = [];
      if (t.image) taskImages.push(t.image);
      if (t.images) taskImages.push(...t.images);

      const checkable: ProbetestQuestionDTO[] = (t.inputQuestions || [])
        .filter((q) => q.correctAnswers && q.correctAnswers.length > 0 && q.interactionType !== 'code')
        .map((q) => ({
          id: q.id,
          taskId: t.id,
          topicTitle: t.topic,
          topicSlug: t.topicSlug,
          date: t.date || u.date,
          prompt: q.prompt,
          ...(q.context ? { context: q.context } : {}),
          ...(q.placeholder ? { placeholder: q.placeholder } : {}),
          correctAnswers: q.correctAnswers!,
          ...(q.sampleSolution && !t.hideSampleSolution ? { sampleSolution: q.sampleSolution } : {}),
          ...(t.hideSampleSolution ? { hideSampleSolution: true } : {}),
          ...(q.hint ? { hint: q.hint } : {}),
          ...(q.interactionType ? { interactionType: q.interactionType } : {}),
          ...(q.words ? { words: q.words } : {}),
          ...(q.tiles ? { tiles: q.tiles } : {}),
          ...(q.options ? { options: q.options } : {}),
        }));

      if (checkable.length > 0) {
        topics.push({
          taskId: t.id,
          topicSlug: t.topicSlug,
          date: t.date || u.date,
          topic: t.topic,
          title: t.title,
          ...(t.readingText ? { readingText: t.readingText } : {}),
          ...(taskImages.length > 0 ? { images: taskImages } : {}),
          questions: checkable,
        });
      }
    }
  }

  return { meta, unitDate, topics };
}

export function getTeacherDashboardDTO(): TeacherStudentSummaryDTO[] {
  const { list, dataDir } = ensureMetaIndex();
  return list.map((meta) => {
    const topics: TeacherStudentSummaryDTO['topics'] = [];
    let latestUnitDate: string | undefined;
    let latestUnitTs = -Infinity;

    for (const unitFile of meta.units) {
      const u = loadUnitFile(dataDir, meta.dirName, unitFile);
      const ts = parseGermanDateTs(u.date);
      if (!latestUnitDate || ts >= latestUnitTs) {
        latestUnitDate = u.date;
        latestUnitTs = ts;
      }
      for (const t of u.tasks) {
        topics.push({
          id: t.id,
          date: t.date || u.date,
          topicSlug: t.topicSlug,
          topic: t.topic,
        });
      }
    }

    return {
      slug: meta.slug,
      name: meta.name,
      grade: meta.grade,
      schoolType: meta.schoolType,
      subject: meta.subject,
      avatarLetter: meta.avatarLetter,
      notesForTeacher: meta.notesForTeacher,
      latestUnitDate,
      topics,
    };
  });
}

// ============================================================================
// Backwards-Compatible Full Hydrators (used by CLI Audit Scripts)
// ============================================================================

function hydrateStudent(meta: StudentMeta, dataDir: string): Student {
  const dailyUnits = meta.units.map((uf) => loadUnitFile(dataDir, meta.dirName, uf));
  const tasks = dailyUnits.flatMap((u) => u.tasks);
  return {
    slug: meta.slug,
    name: meta.name,
    grade: meta.grade,
    schoolType: meta.schoolType,
    subject: meta.subject,
    avatarLetter: meta.avatarLetter,
    notesForTeacher: meta.notesForTeacher,
    tasks,
    dailyUnits,
  };
}

export function getAllStudents(): Student[] {
  const { list, dataDir } = ensureMetaIndex();
  return list.map((m) => hydrateStudent(m, dataDir));
}

export function getStudentBySlug(slug: string): Student | undefined {
  const { bySlug, dataDir } = ensureMetaIndex();
  const meta = bySlug.get(slug.trim().toLowerCase());
  if (!meta) return undefined;
  return hydrateStudent(meta, dataDir);
}

export function getStudentDailyUnits(student: Student): DailyLearningUnit[] {
  if (student.dailyUnits && student.dailyUnits.length > 0) {
    return student.dailyUnits;
  }
  const map = new Map<string, Task[]>();
  for (const t of student.tasks) {
    const d = t.date || DEFAULT_FALLBACK_DATE;
    if (!map.has(d)) map.set(d, []);
    map.get(d)!.push(t);
  }
  return Array.from(map.entries()).map(([date, tasks]) => ({
    id: `${student.slug}-${date}`,
    date,
    title: `Tages-Lerneinheit ${date}`,
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
