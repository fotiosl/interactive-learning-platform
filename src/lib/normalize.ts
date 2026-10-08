/**
 * Text normalization utility for student answer evaluation.
 * Strips punctuation, quotes, excess whitespace, and normalizes casing
 * so student answers can be verified flexibly.
 */
export function normalizeAnswer(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/\.+/g, ' ')
    .replace(/["'„“”«»‚‘]/g, '')
    .replace(/[.,!?;:]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks whether an answer matches any of the accepted solutions,
 * taking into account choice mode (strict string match) and
 * open text mode (tolerant normalized match).
 */
export function isAnswerMatch(
  input: string,
  correctAnswers: string[] = [],
  isChoice = false
): boolean {
  if (!correctAnswers || correctAnswers.length === 0) return false;

  const normalizedInput = normalizeAnswer(input);

  return correctAnswers.some((ans) => {
    if (isChoice) {
      return ans.trim() === input.trim();
    }
    return normalizeAnswer(ans) === normalizedInput;
  });
}

/**
 * Normalizes sentence builder tiles: removes trailing and internal periods
 * and converts to lowercase so students cannot guess sentence start/end.
 */
export function formatSentenceTiles(tiles?: string[]): string[] {
  if (!tiles) return [];
  return tiles.map((tile) =>
    tile
      .replace(/\.+/g, '')
      .toLowerCase()
      .trim()
  );
}
