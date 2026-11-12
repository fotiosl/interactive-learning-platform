/**
 * Intelligent console output matching for beginner Java programming exercises.
 * Shared between the browser JavaCodeRunner UI and the CLI rules audit suite.
 */
export function checkOutputMatch(
  actual: string,
  expected?: string,
  additionalValidAnswers?: string[]
): boolean {
  if (!expected && (!additionalValidAnswers || additionalValidAnswers.length === 0)) {
    return true;
  }

  const allExpectedTargets = [
    ...(expected ? [expected] : []),
    ...(additionalValidAnswers || []),
  ];

  const cleanActual = actual.trim();
  if (!cleanActual) return false;

  for (const target of allExpectedTargets) {
    if (matchesSingleTarget(cleanActual, target.trim())) {
      return true;
    }
  }

  return false;
}

function matchesSingleTarget(actual: string, expected: string): boolean {
  const normA = actual.replace(/\r\n/g, '\n').trim();
  const normE = expected.replace(/\r\n/g, '\n').trim();
  if (normA === normE) return true;

  const linesA = normA
    .split('\n')
    .map((l) => l.trim().replace(/\s+/g, ' '))
    .filter(Boolean);
  const linesE = normE
    .split('\n')
    .map((l) => l.trim().replace(/\s+/g, ' '))
    .filter(Boolean);

  if (linesA.length === linesE.length) {
    const allLinesMatch = linesA.every((lineA, idx) => {
      const lineE = linesE[idx];
      if (lineA === lineE) return true;
      if (lineA.replace(/\s+/g, '') === lineE.replace(/\s+/g, '')) return true;

      const stripPunct = (s: string) =>
        s.toLowerCase().replace(/[.!?:;,]/g, '').trim();
      if (stripPunct(lineA) === stripPunct(lineE)) return true;

      return false;
    });

    if (allLinesMatch) return true;
  }

  if (linesE.length === 1) {
    const singleE = linesE[0];
    const singleA = linesA.join(' ');
    const numsInE = extractNumbers(singleE);
    const numsInA = extractNumbers(singleA);

    // Pure numeric expectation (e.g. "42" or "3.5"): actual must evaluate to the exact same single number
    if (/^-?\d+(?:[.,]\d+)?$/.test(singleE) && numsInE.length === 1 && numsInA.length === 1) {
      if (numsInE[0] === numsInA[0]) {
        return true;
      }
    }

    // Labeled numeric output: accept if exact value matches AND either label text matches or output is just the value
    if (numsInE.length === 1 && numsInA.length === 1 && numsInE[0] === numsInA[0]) {
      const normTextE = stripNumericAndPunct(singleE);
      const normTextA = stripNumericAndPunct(singleA);
      if (
        normTextE === normTextA ||
        normTextA === '' ||
        (normTextE.length >= 3 && (normTextA.includes(normTextE) || normTextE.includes(normTextA)))
      ) {
        return true;
      }
    }

    const cleanWord = (s: string) => s.toLowerCase().replace(/[^a-z0-9äöüß]/g, '');
    if (cleanWord(singleA) === cleanWord(singleE)) {
      return true;
    }
  }

  const numsE = extractNumbers(normE);
  const numsA = extractNumbers(normA);
  if (numsE.length > 1 && numsA.length === numsE.length) {
    const sequenceMatches = numsE.every((n, i) => n === numsA[i]);
    if (sequenceMatches) {
      const textE = stripNumericAndPunct(normE);
      const textA = stripNumericAndPunct(normA);
      if (textE === textA || (textE.length > 0 && textA.includes(textE))) {
        return true;
      }
    }
  }

  // Whole-token containment check (avoids false positives like expected "10" matching actual "100")
  if (hasWholeSegmentMatch(normA, normE)) {
    return true;
  }
  if (linesE.length > 1 && linesE.every((lineE) => hasWholeSegmentMatch(normA, lineE))) {
    return true;
  }

  return false;
}

function stripNumericAndPunct(str: string): string {
  return str
    .replace(/-?\d+(?:[.,]\d+)?/g, '')
    .toLowerCase()
    .replace(/[^a-zäöüß]/g, '');
}

function hasWholeSegmentMatch(haystack: string, needle: string): boolean {
  if (!needle) return false;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(?:^|[^a-zA-Z0-9äöüßÄÖÜ_])${escaped}(?:$|[^a-zA-Z0-9äöüßÄÖÜ_])`);
  return pattern.test(haystack);
}

function extractNumbers(str: string): number[] {
  const matches = str.match(/-?\d+(?:[.,]\d+)?/g);
  return matches ? matches.map((m) => Number(m.replace(',', '.'))) : [];
}
