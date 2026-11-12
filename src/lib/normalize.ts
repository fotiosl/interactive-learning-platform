const DECIMAL_SENTINEL = '\u0001';

/**
 * Text normalization utility for student answer evaluation.
 * Preserves decimals (unifying German commas and English dots between digits to `.`),
 * handles German thousands-dot separators before decimal commas (e.g. `2.000,00`),
 * normalizes minus/dash variants, quotes, and whitespace.
 */
export function normalizeAnswer(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/[\u2212\u2013\u2014]/g, '-')
    // Strip German thousands dots preceding a comma decimal (e.g. "2.000,00" -> "2000,00")
    .replace(/(?<=\d)\.(?=\d{3}(?:\.\d{3})*,)/g, '')
    // Preserve decimal separator between digits before general punctuation cleanup
    .replace(/(?<=\d)[.,](?=\d)/g, DECIMAL_SENTINEL)
    .replace(/\.+/g, ' ')
    .replace(/["'„“”«»‚‘]/g, '')
    .replace(/[.,!?;:]+/g, '')
    .replace(new RegExp(DECIMAL_SENTINEL, 'g'), '.')
    .replace(/\s+/g, ' ')
    .trim();
}

function compactUnitsAndEquals(norm: string): string {
  return norm
    .replace(/(?<=\d)\s+(?=[a-zäöüß%€²³°])/g, '')
    .replace(/\s*=\s*/g, '=')
    .trim();
}

function stripThousandsDots(norm: string): string {
  return norm
    .replace(/\b\d{1,3}(?:\.\d{3})+\b/g, (token) => token.replace(/\./g, ''))
    .replace(/\b\d{1,3}(?:\s+\d{3})+\b/g, (token) => token.replace(/\s+/g, ''));
}

/**
 * Checks whether an answer matches any of the accepted solutions,
 * taking into account choice mode (strict string match), word_select
 * (split-verb ellipsis tolerance), unit spacing (`9 m` / `9m`),
 * and optional German thousands-separator equivalence when unambiguous.
 */
export function isAnswerMatch(
  input: string,
  correctAnswers: string[] = [],
  options?: { isChoice?: boolean; isWordSelect?: boolean }
): boolean {
  if (!correctAnswers || correctAnswers.length === 0) return false;

  if (options?.isChoice) {
    const trimmedInput = input.trim();
    return correctAnswers.some((ans) => ans.trim() === trimmedInput);
  }

  const normalizedInput = normalizeAnswer(input);
  if (!normalizedInput) return false;

  const compactInput = compactUnitsAndEquals(normalizedInput);
  const hasCommaDecimalInAnswers = correctAnswers.some((ans) => /\d,\d/.test(ans));

  return correctAnswers.some((ans) => {
    const normAns = normalizeAnswer(ans.replace(/\.\.\./g, ' '));
    if (normAns === normalizedInput) return true;

    const compactAns = compactUnitsAndEquals(normAns);
    if (compactAns === compactInput) return true;

    if (
      !hasCommaDecimalInAnswers &&
      (/\b\d{1,3}(?:\.\d{3})+\b/.test(normAns) || /\b\d{1,3}(?:\.\d{3})+\b/.test(compactInput))
    ) {
      if (stripThousandsDots(compactAns) === stripThousandsDots(compactInput)) {
        return true;
      }
    }

    if (options?.isWordSelect && normAns === normalizedInput.replace(/\s+/g, '')) {
      return true;
    }
    return false;
  });
}

/**
 * Normalizes sentence builder tiles: removes non-decimal periods
 * and converts to lowercase so students cannot guess sentence start/end.
 */
export function formatSentenceTiles(tiles?: string[]): string[] {
  if (!tiles) return [];
  return tiles.map((tile) =>
    tile
      .replace(/(?<!\d)\.+(?!\d)/g, '')
      .toLowerCase()
      .trim()
  );
}
