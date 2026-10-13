/**
 * Local storage persistence helper for student progress and exercise answers.
 * Provides namespaced, safe access that prevents SSR hydration mismatches
 * and gracefully handles browser quota limits.
 */

export function getQuestionStorageKey(studentSlug: string, questionId: string): string {
  return `gostudent_ans_${studentSlug}_${questionId}`;
}

export function getChecklistStorageKey(studentSlug: string, taskId: string): string {
  return `gostudent_chk_${studentSlug}_${taskId}`;
}

export function getCodeStorageKey(studentSlug: string, questionId: string): string {
  return `gostudent_code_${studentSlug}_${questionId}`;
}

export function loadStoredData<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveStoredData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Quota exceeded or private browsing restrictions
  }
}

export function clearStoredData(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore
  }
}
