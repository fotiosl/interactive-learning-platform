export const IS_PUBLIC_MODE = process.env.NEXT_PUBLIC_APP_MODE === 'public';

export const APP_FOOTER_TEXT = IS_PUBLIC_MODE
  ? 'Interactive Learning Platform • Open-Source-Lernmodule & Probetests'
  : 'Lernplattform • Individuelle Nachhilfe & Aufgabenbetreuung';

/**
 * Formats synthetic public dates into readable module labels when running in public showcase mode.
 */
export function formatUnitBadgeLabel(unitIdOrDate: string, fallbackDate: string): string {
  if (!IS_PUBLIC_MODE) return fallbackDate;
  const match = unitIdOrDate.match(/modul-(\d+)$/i);
  if (match) return `Modul ${match[1]}`;
  if (fallbackDate === '01.01.2026') return 'Modul 1';
  if (fallbackDate === '02.01.2026') return 'Modul 2';
  return 'Lerneinheit';
}
