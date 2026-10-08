'use client';
 
import { useEffect } from 'react';

/**
 * Automatically purges any legacy stored answers or checklist entries
 * so that no prior user answers linger in local storage.
 */
export function ClientStorageCleaner() {
  useEffect(() => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('answer_') || key.startsWith('checklist_'))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => {
        try {
          localStorage.removeItem(key);
        } catch {
          // ignore
        }
      });
    } catch {
      // ignore
    }
  }, []);

  return null;
}
