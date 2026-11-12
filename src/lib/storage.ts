import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';

/**
 * Local storage persistence helper for student progress and exercise answers.
 * Provides namespaced, reactive, SSR-hydration-safe access (via useSyncExternalStore)
 * with in-memory fallback when browser storage is restricted or full.
 */

const memoryFallbackStore = new Map<string, string>();
const listenersByKey = new Map<string, Set<() => void>>();

const noopSubscribe = () => () => {};
const getTrue = () => true;
const getFalse = () => false;
const getNull = () => null;

function notifyKey(key: string): void {
  const listeners = listenersByKey.get(key);
  if (listeners) {
    for (const cb of listeners) cb();
  }
}

function readRawValue(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) return raw;
  } catch {
    // Private browsing or blocked storage
  }
  return memoryFallbackStore.get(key) ?? null;
}

export function subscribeStorageKey(key: string, onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  let set = listenersByKey.get(key);
  if (!set) {
    set = new Set();
    listenersByKey.set(key, set);
  }
  set.add(onChange);

  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === null || event.key === key) {
      onChange();
    }
  };
  window.addEventListener('storage', handleStorageEvent);

  return () => {
    window.removeEventListener('storage', handleStorageEvent);
    const current = listenersByKey.get(key);
    if (current) {
      current.delete(onChange);
      if (current.size === 0) listenersByKey.delete(key);
    }
  };
}

/**
 * Hydration-safe flag indicating whether client-side state has mounted.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(noopSubscribe, getTrue, getFalse);
}

/**
 * Reactive, SSR-hydration-safe JSON state backed by localStorage (with in-memory fallback).
 * When `key` is null, falls back cleanly to local component state without storage persistence.
 */
export function useStoredJson<T>(key: string | null, fallback: T): [T, (next: T | null) => void] {
  const [ephemeral, setEphemeral] = useState<T>(fallback);

  const subscribe = useCallback(
    (onStoreChange: () => void) => (key ? subscribeStorageKey(key, onStoreChange) : () => {}),
    [key]
  );
  const getSnapshot = useCallback(() => (key ? readRawValue(key) : null), [key]);

  const rawValue = useSyncExternalStore(subscribe, getSnapshot, getNull);

  const storedValue = useMemo<T>(() => {
    if (!key || !rawValue) return fallback;
    try {
      return JSON.parse(rawValue) as T;
    } catch {
      return fallback;
    }
  }, [key, rawValue, fallback]);

  const setValue = useCallback(
    (next: T | null) => {
      if (!key) {
        setEphemeral(next === null ? fallback : next);
        return;
      }
      if (next === null) {
        clearStoredData(key);
      } else {
        saveStoredData(key, next);
      }
    },
    [key, fallback]
  );

  return [key ? storedValue : ephemeral, setValue];
}

export function getQuestionStorageKey(studentSlug: string, questionId: string): string {
  return `learning_ans_${studentSlug}_${questionId}`;
}

export function getChecklistStorageKey(studentSlug: string, taskId: string): string {
  return `learning_chk_${studentSlug}_${taskId}`;
}

export function getCodeStorageKey(studentSlug: string, questionId: string): string {
  return `learning_code_${studentSlug}_${questionId}`;
}

export function loadStoredData<T>(key: string, fallback: T): T {
  const raw = readRawValue(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveStoredData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  const serialized = JSON.stringify(data);
  memoryFallbackStore.set(key, serialized);
  try {
    localStorage.setItem(key, serialized);
  } catch {
    // Quota exceeded or private browsing restrictions; memoryFallbackStore still holds data
  }
  notifyKey(key);
}

export function clearStoredData(key: string): void {
  if (typeof window === 'undefined') return;
  memoryFallbackStore.delete(key);
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore
  }
  notifyKey(key);
}
