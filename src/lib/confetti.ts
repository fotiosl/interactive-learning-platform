/**
 * Lazily imports canvas-confetti only when a celebratory animation is actually triggered,
 * keeping initial page-load JavaScript bundles minimal.
 */
export async function fireConfetti(options?: {
  particleCount?: number;
  spread?: number;
  origin?: { x?: number; y?: number };
}): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const { default: confetti } = await import('canvas-confetti');
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      ...options,
    });
  } catch {
    // Ignore animation errors on restricted devices
  }
}
