import fs from 'fs';
import path from 'path';
import { getAllStudents } from '../src/data/students/index.ts';
import { normalizeAnswer, formatSentenceTiles } from '../src/lib/normalize.ts';
import { runJavaInterpreter } from '../src/lib/javaInterpreter.ts';
import { checkOutputMatch } from '../src/lib/javaOutputMatch.ts';

export interface AuditIssue {
  severity: 'error' | 'warning';
  student: string;
  taskId: string;
  questionId: string;
  rule: string;
  details: string;
  snippet?: string;
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function containsTokenOrPhrase(text: string, phrase: string, minLength = 4): boolean {
  const clean = phrase.trim();
  if (clean.length < minLength) return false;
  const escaped = escapeRegExp(clean).replace(/\s+/g, '\\s+');
  try {
    const startBoundary = /^[A-Za-z0-9ÄÖÜäöüß]/.test(clean) ? '\\b' : '';
    const endBoundary = /[A-Za-z0-9ÄÖÜäöüß]$/.test(clean) ? '\\b' : '';
    const regex = new RegExp(`${startBoundary}${escaped}${endBoundary}`, 'i');
    return regex.test(text);
  } catch {
    return false;
  }
}

/**
 * Checks whether targetTokens appear as an ordered subsequence of wordTokens
 * (supporting both single-token selections and split-verb Prädikatsklammern).
 */
function isOrderedTokenSubsequence(wordTokens: string[], targetTokens: string[]): boolean {
  if (targetTokens.length === 0) return false;
  let wIdx = 0;
  for (const target of targetTokens) {
    while (wIdx < wordTokens.length && wordTokens[wIdx] !== target) {
      wIdx++;
    }
    if (wIdx >= wordTokens.length) return false;
    wIdx++;
  }
  return true;
}


const INSTITUTIONAL_OR_WORKSHEET_RE =
  /(\bklasse\s*\d|\b\d+\.\s*klasse\b|\b\d+\.\s*schuljahr\b|(?:jahrgangs|klassen)stufe|\b(?:ober|mittel|unter)stufe\b|gymnasium|realschule|hauptschule|gesamtschule|berufskolleg|sekundarstufe|grundschule|gymnasiast|übungsblatt|arbeitsblatt|schulbuch|deutschbuch|workbook|\bbuch\s+s\.\s*\d|\bs\.\s*\d+\s*(?:im\s+|&|–|-)|\b(?:deutsch|englisch|mathe|mathematik|grammatik|deutscharbeit|klassenarbeit)\s+\d{1,2}[a-f]\b)/i;

export function runRulesAudit(options?: {
  targetStudent?: string;
  includeWarnings?: boolean;
  checkAssets?: boolean;
}): {
  issues: AuditIssue[];
  errorCount: number;
  warningCount: number;
  studentCount: number;
} {
  const allStudents = getAllStudents();
  const studentsToAudit = options?.targetStudent
    ? allStudents.filter((s) => s.slug.toLowerCase() === options.targetStudent!.toLowerCase())
    : allStudents;

  const isPublicMode = process.env.NEXT_PUBLIC_APP_MODE === 'public';
  const checkAssets = options?.checkAssets ?? !isPublicMode;
  const includeWarnings = options?.includeWarnings ?? false;
  const issues: AuditIssue[] = [];

  for (const student of studentsToAudit) {
    const studentSlug = student.slug;
    const seenQuestionIds = new Set<string>();
    const rawFirstName = isPublicMode
      ? ''
      : (student.name || '').split(/\s+/)[0]?.replace(/[^A-Za-zÄÖÜäöüß]/g, '') || '';
    const studentPiiTokens = isPublicMode
      ? []
      : Array.from(new Set([studentSlug, rawFirstName].filter((t) => t.length >= 4)));
    const studentPiiRegex =
      studentPiiTokens.length > 0
        ? new RegExp(`\\b(?:${studentPiiTokens.map(escapeRegExp).join('|')})\\b`, 'i')
        : null;


    // 0. UNIT METADATA AGNOSTICISM (RULE 3)
    for (const unit of student.dailyUnits || []) {
      for (const [fieldLabel, fieldVal] of [
        ['unit-title', unit.title],
        ['unit-description', unit.description],
      ] as const) {
        if (!fieldVal) continue;
        const match = fieldVal.match(INSTITUTIONAL_OR_WORKSHEET_RE);
        if (match) {
          issues.push({
            severity: 'error',
            student: studentSlug,
            taskId: unit.id,
            questionId: fieldLabel,
            rule: 'RULE 3: Institutional / Worksheet Agnosticism in Unit Metadata',
            details: `${fieldLabel} contains institutional or worksheet reference: "${match[0]}"`,
            snippet: fieldVal,
          });
        }
      }
    }

    for (const task of student.tasks) {
      const taskId = task.id;

      // 1. ASSET INTEGRITY (RULE 1.3) & PUBLIC GDPR CHECK (RULE 4)
      if (isPublicMode) {
        if (task.image || (task.images && task.images.length > 0) || task.teacherSolutionImage) {
          issues.push({
            severity: 'error',
            student: studentSlug,
            taskId,
            questionId: 'task-image',
            rule: 'RULE 4: GDPR Public Mode Asset Leak',
            details: 'Public-mode task must not retain image, images, or teacherSolutionImage fields',
          });
        }
        if (task.teacherNotes) {
          issues.push({
            severity: 'error',
            student: studentSlug,
            taskId,
            questionId: 'task-teacherNotes',
            rule: 'RULE 4: GDPR Public Mode Teacher Notes Leak',
            details: 'Public-mode task must not retain teacherNotes',
          });
        }
      }

      if (checkAssets) {
        for (const imgField of [task.image, ...(task.images || []), task.teacherSolutionImage]) {
          if (imgField?.src) {
            const publicPath = path.join(process.cwd(), 'public', imgField.src.replace(/^\//, ''));
            if (!fs.existsSync(publicPath)) {
              issues.push({
                severity: 'error',
                student: studentSlug,
                taskId,
                questionId: 'task-image',
                rule: 'RULE 1.3: Asset File Missing',
                details: `Referenced asset "${imgField.src}" does not exist at "${publicPath}"`,
              });
            }
          }
        }
      }

      // 2. INSTITUTIONAL & WORKSHEET AGNOSTICISM IN DESCRIPTION & BADGE (RULE 3)
      if (task.description) {
        if (task.description.includes('\\n')) {
          issues.push({
            severity: 'error',
            student: studentSlug,
            taskId,
            questionId: 'task-description',
            rule: 'RULE 1.2: Double-Escaped Newline Literal',
            details: 'Task description contains literal "\\n" instead of real newline',
            snippet: task.description,
          });
        }
        const match = task.description.match(INSTITUTIONAL_OR_WORKSHEET_RE);
        if (match) {
          issues.push({
            severity: 'error',
            student: studentSlug,
            taskId,
            questionId: 'task-description',
            rule: 'RULE 3: Institutional / Worksheet Agnosticism in Description',
            details: `Description contains institutional or worksheet reference: "${match[0]}"`,
            snippet: task.description,
          });
        }
      }
      if (task.dateBadge) {
        const match = task.dateBadge.match(INSTITUTIONAL_OR_WORKSHEET_RE);
        if (match) {
          issues.push({
            severity: 'error',
            student: studentSlug,
            taskId,
            questionId: 'task-dateBadge',
            rule: 'RULE 3: Institutional / Worksheet Agnosticism in Badge',
            details: `dateBadge contains institutional or worksheet reference: "${match[0]}"`,
            snippet: task.dateBadge,
          });
        }
      }
      if (task.readingText) {
        for (const [rtField, rtVal] of [
          ['readingText-title', task.readingText.title],
          ['readingText-source', task.readingText.source],
        ] as const) {
          if (!rtVal) continue;
          const match = rtVal.match(INSTITUTIONAL_OR_WORKSHEET_RE);
          if (match) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: rtField,
              rule: 'RULE 3: Institutional / Worksheet Agnosticism in Reading Text',
              details: `${rtField} contains institutional or worksheet reference: "${match[0]}"`,
              snippet: rtVal,
            });
          }
        }
      }

      const questions = task.inputQuestions || [];

      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const qId = q.id;
        const type = q.interactionType || (q.options && q.options.length > 0 ? 'choice' : 'input');

        // 3. QUESTION ID UNIQUENESS (RULE 1.3)
        if (seenQuestionIds.has(qId)) {
          issues.push({
            severity: 'error',
            student: studentSlug,
            taskId,
            questionId: qId,
            rule: 'RULE 1.3: Duplicate Question ID',
            details: `Question ID "${qId}" is duplicated for student "${studentSlug}"`,
          });
        } else {
          seenQuestionIds.add(qId);
        }

        // 4. PROMPT CHECKS (RULE 1.1, RULE 1.2 & RULE 3)
        if (q.prompt) {
          if (type !== 'code' && q.prompt.includes('\\n')) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 1.2: Double-Escaped Newline Literal',
              details: 'Prompt contains literal "\\n" instead of genuine newline',
              snippet: q.prompt,
            });
          }

          if (studentPiiRegex) {
            const piiMatch = q.prompt.match(studentPiiRegex);
            if (piiMatch) {
              issues.push({
                severity: 'error',
                student: studentSlug,
                taskId,
                questionId: qId,
                rule: 'RULE 3: Student Name Leak in Question Prompt',
                details: `Prompt exposes student identifier "${piiMatch[0]}"`,
                snippet: q.prompt,
              });
            }
          }

          const blindRefMatch = q.prompt.match(
            /(?:\baus\s+(?:der\s+)?vorherigen?\s+(?:aufgabe|frage)|wie\s+in\s+(?:aufgabe|frage)\s+\d+|\bbei\s+(?:aufgabe|teilaufgabe)\s+\d+\b|\bsiehe\s+(?:aufgabe|frage)\s+\d+)/i
          );
          if (blindRefMatch) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 1.1: Blind Cross-Reference Breaking Probetest',
              details: `Prompt relies on non-standalone reference "${blindRefMatch[0]}"`,
              snippet: q.prompt,
            });
          }

          const schoolMatch = q.prompt.match(INSTITUTIONAL_OR_WORKSHEET_RE);
          if (schoolMatch) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 3: Institutional / Worksheet Agnosticism in Prompt',
              details: `Prompt contains institutional or worksheet reference: "${schoolMatch[0]}"`,
              snippet: q.prompt,
            });
          }

          const sampleMatch = q.prompt.match(/\((?:z\.?\s*B\.?|beispielsweise|wie etwa)[^)]+\)/i);
          if (sampleMatch) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 1.2: Prompt Neutrality / Sample in Prompt',
              details: `Prompt contains sample example in parentheses: "${sampleMatch[0]}"`,
              snippet: q.prompt,
            });
          }
        }

        // 5. PLACEHOLDER CHECKS (RULE 1.2)
        if (q.placeholder) {
          if (/\bz\.\s*b\b/i.test(q.placeholder) || /\(z\.\s*B\.\)/i.test(q.placeholder)) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 1.2: Placeholder Spoilers',
              details: `Placeholder contains "z.B.": "${q.placeholder}"`,
              snippet: q.placeholder,
            });
          }

          if (q.correctAnswers) {
            for (const ans of q.correctAnswers) {
              if (ans.length > 2 && q.placeholder.toLowerCase().includes(ans.toLowerCase())) {
                issues.push({
                  severity: 'error',
                  student: studentSlug,
                  taskId,
                  questionId: qId,
                  rule: 'RULE 1.2: Placeholder Leaks Answer',
                  details: `Placeholder leaks correct answer "${ans}": "${q.placeholder}"`,
                  snippet: q.placeholder,
                });
              }
            }
          }
        }

        // 6. HINT CHECKS (RULE 1.2 & RULE 3)
        if (q.hint) {
          if (type !== 'code' && q.hint.includes('\\n')) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 1.2: Double-Escaped Newline Literal',
              details: 'Hint contains literal "\\n" instead of genuine newline',
              snippet: q.hint,
            });
          }

          if (studentPiiRegex) {
            const piiMatch = q.hint.match(studentPiiRegex);
            if (piiMatch) {
              issues.push({
                severity: 'error',
                student: studentSlug,
                taskId,
                questionId: qId,
                rule: 'RULE 3: Student Name Leak in Hint',
                details: `Hint exposes student identifier "${piiMatch[0]}"`,
                snippet: q.hint,
              });
            }
          }

          const hintBookMatch =
            q.hint.match(INSTITUTIONAL_OR_WORKSHEET_RE) || q.hint.match(/\bauf\s+seite\s+\d+\b/i);
          if (hintBookMatch) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 3: Institutional / Worksheet Agnosticism in Hint',
              details: `Hint contains textbook/page/institutional reference: "${hintBookMatch[0]}"`,
              snippet: q.hint,
            });
          }

          const letterLeak = q.hint.match(
            /(beginnt mit|\bbeginne\s+mit\s*[:„"']|fängt mit|endet mit|anfangsbuchst|erste[rn]? buchstabe|startet mit|mit\s+['"„“]?[a-zäöüß]{1,3}['"“”]?\s+(?:beginnt|anfängt|startet|endet)|lautet:?\s*['"]?[a-zäöüß]+['"]?)/i
          );
          if (letterLeak) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 1.2: Hint Reveals Letter or Word',
              details: `Hint reveals letter/word: "${letterLeak[0]}"`,
              snippet: q.hint,
            });
          }

          if (type === 'choice' && q.correctAnswers && q.correctAnswers.length === 1 && q.options) {
            const cOpt = q.correctAnswers[0].trim();
            const distractors = q.options.filter((o) => o !== q.correctAnswers![0]);
            if (
              cOpt.length >= 4 &&
              containsTokenOrPhrase(q.hint, cOpt) &&
              !distractors.some((d) => d.trim().length >= 4 && containsTokenOrPhrase(q.hint!, d.trim()))
            ) {
              issues.push({
                severity: 'error',
                student: studentSlug,
                taskId,
                questionId: qId,
                rule: 'RULE 1.2: Hint Reveals Choice Answer',
                details: `Choice hint literally contains correct option "${cOpt}"`,
                snippet: q.hint,
              });
            }
          }

          if ((type === 'input' || type === 'rechnung') && q.correctAnswers) {
            for (const rawAns of q.correctAnswers) {
              const trimmed = rawAns.trim();
              if (!trimmed.includes(' ') && (trimmed.length > 3 || /\d[,.]\d/.test(trimmed))) {
                const regex = new RegExp(
                  `(?<![0-9A-Za-zÄÖÜäöüß.,])${escapeRegExp(trimmed)}(?![0-9A-Za-zÄÖÜäöüß.,²³])`,
                  'i'
                );
                if (regex.test(q.hint)) {
                  issues.push({
                    severity: 'error',
                    student: studentSlug,
                    taskId,
                    questionId: qId,
                    rule: 'RULE 1.2: Hint Contains Target Answer Token',
                    details: `Hint literally contains target answer "${trimmed}"`,
                    snippet: q.hint,
                  });
                  break;
                }
              } else if (trimmed.length >= 1 && /^\d+$/.test(trimmed)) {
                const eqLeakRe = new RegExp(
                  `(?:=|\\bist|\\bergibt)\\s*${escapeRegExp(trimmed)}(?![0-9A-Za-zÄÖÜäöüß.,²³])`,
                  'i'
                );
                if (eqLeakRe.test(q.hint) && !(q.prompt && eqLeakRe.test(q.prompt))) {
                  issues.push({
                    severity: 'error',
                    student: studentSlug,
                    taskId,
                    questionId: qId,
                    rule: 'RULE 1.2: Hint Computes Final Numeric Answer',
                    details: `Hint directly reveals final result "${trimmed}"`,
                    snippet: q.hint,
                  });
                  break;
                }
              }
            }

            // Detect intermediate computed equations or substituted problem values in hint (e.g., "c/2 = 6 cm", "(-3)² = 9", "sqrt(7² + 1,5²)")
            const substitutedRootRe = /(?:sqrt\s*\(|√\s*\(?)[^)]*\d+\s*[²³^+\-*/:·][^)]*/i;
            const substitutedRootMatch = q.hint.match(substitutedRootRe);
            if (substitutedRootMatch && !(q.prompt && substitutedRootMatch[0] && q.prompt.includes(substitutedRootMatch[0]))) {
              issues.push({
                severity: 'error',
                student: studentSlug,
                taskId,
                questionId: qId,
                rule: 'RULE 1.2: Hint Substitutes Concrete Numbers into Formula',
                details: `Hint embeds concrete numeric formula "${substitutedRootMatch[0]}"`,
                snippet: q.hint,
              });
            }

            const eqIntermediateRe =
              /([A-Za-zÄÖÜäöüß0-9_\/\^²³()+\-*·\s]{1,22})=\s*([-+−]?\s*\d+(?:[,.]\d+)?\s*(?:cm²?|m²?|dm²?|mm²?|km|€|%|kg|g)?)(?![A-Za-z0-9²³,.]|\s*[·*\/+\-^]\s*[A-Za-zÄÖÜäöüß])/g;
            let eqMatch: RegExpExecArray | null;
            while ((eqMatch = eqIntermediateRe.exec(q.hint)) !== null) {
              const lhs = eqMatch[1].trim();
              const rhs = eqMatch[2].trim();
              const fullEq = eqMatch[0].trim();
              // Allow general unit conversion identities like "1 m = 100 cm" or "1 Stunde = 60 Minuten"
              if (/^1\s*(?:m|km|dm|cm|kg|t|l|h|min)$/i.test(lhs)) continue;
              // Allow literal prompt given repeats if exact same substring already appears in prompt
              if (q.prompt && q.prompt.toLowerCase().includes(fullEq.toLowerCase())) continue;
              if (/[+\-*/:·²³^]|\/\s*\d/.test(lhs) || /\d/.test(rhs)) {
                issues.push({
                  severity: 'error',
                  student: studentSlug,
                  taskId,
                  questionId: qId,
                  rule: 'RULE 1.2: Hint Reveals Intermediate Result or Numeric Assignment',
                  details: `Hint reveals computed/numeric value "${lhs} = ${rhs}"`,
                  snippet: q.hint,
                });
                break;
              }
            }
          }

          if (type === 'sentence_builder' && q.correctAnswers && q.correctAnswers.length > 0) {
            const startHintMatch = q.hint.match(
              /(?:beginne|starte)\s+mit\s+[„"'»]([^„"“'«»]{5,})[“"'«]/i
            );
            if (startHintMatch) {
              const quoted = normalizeAnswer(startHintMatch[1]);
              if (q.correctAnswers.some((ans) => normalizeAnswer(ans).startsWith(quoted))) {
                issues.push({
                  severity: 'error',
                  student: studentSlug,
                  taskId,
                  questionId: qId,
                  rule: 'RULE 1.2: Hint Reveals Sentence Start',
                  details: `Hint leaks literal starting phrase "${startHintMatch[1]}"`,
                  snippet: q.hint,
                });
              }
            }
          }
        }

        // 7. SENTENCE BUILDER CHECKS (RULE 2.1)
        if (type === 'sentence_builder') {
          const tiles = q.tiles || [];
          if (tiles.length === 0) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 2.1: Empty Tiles',
              details: 'sentence_builder question has empty tiles array',
            });
          }

          for (const t of tiles) {
            if (t !== t.toLowerCase()) {
              issues.push({
                severity: 'error',
                student: studentSlug,
                taskId,
                questionId: qId,
                rule: 'RULE 2.1: Tile Case Invariant',
                details: `Tile is not lowercase: "${t}"`,
              });
            }
            if (/[.!?]$/.test(t)) {
              issues.push({
                severity: 'error',
                student: studentSlug,
                taskId,
                questionId: qId,
                rule: 'RULE 2.1: Tile Terminal Punctuation',
                details: `Tile has terminal sentence punctuation: "${t}"`,
              });
            }
          }

          if (q.correctAnswers && q.correctAnswers.length > 0) {
            const joinedOriginal = formatSentenceTiles(tiles).join(' ');
            for (const ans of q.correctAnswers) {
              if (normalizeAnswer(joinedOriginal) === normalizeAnswer(ans)) {
                issues.push({
                  severity: 'error',
                  student: studentSlug,
                  taskId,
                  questionId: qId,
                  rule: 'RULE 2.1: Tiles Stored in Solution Order',
                  details: `Tiles in source match accepted solution order: "${ans}"`,
                });
                break;
              }
            }

            const tilesTokens = formatSentenceTiles(tiles)
              .map((t) => normalizeAnswer(t))
              .join(' ')
              .split(/\s+/)
              .filter(Boolean)
              .sort();

            for (const ans of q.correctAnswers) {
              const ansTokens = normalizeAnswer(ans)
                .split(/\s+/)
                .filter(Boolean)
                .sort();

              if (
                tilesTokens.length !== ansTokens.length ||
                tilesTokens.join(' ') !== ansTokens.join(' ')
              ) {
                issues.push({
                  severity: 'error',
                  student: studentSlug,
                  taskId,
                  questionId: qId,
                  rule: 'RULE 2.1: Zero-Orphan Invariant',
                  details: `Tiles [${tilesTokens.join(', ')}] do not match answer tokens [${ansTokens.join(', ')}] in "${ans}"`,
                });
              }
            }

            for (const t of tiles) {
              if (t.endsWith(',')) {
                const wordBeforeComma = t.slice(0, -1).trim();
                const hasCommaInAnyAnswer = q.correctAnswers.some((ans) => {
                  const regex = new RegExp(`\\b${escapeRegExp(wordBeforeComma)},`, 'i');
                  return regex.test(ans);
                });
                if (!hasCommaInAnyAnswer) {
                  issues.push({
                    severity: 'error',
                    student: studentSlug,
                    taskId,
                    questionId: qId,
                    rule: 'RULE 2.1: Invalid Comma on Tile',
                    details: `Tile "${t}" has a trailing comma, but "${wordBeforeComma}" is not followed by a comma in any accepted solution`,
                  });
                }
              }
            }
          }
        }

        // 8. MULTIPLE CHOICE CHECKS (RULE 2.2)
        if (type === 'choice') {
          const optionsList = q.options || [];
          const correct = q.correctAnswers || [];

          if (optionsList.length < 3) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 2.2: Choice Cardinality',
              details: `Fewer than 3 options (${optionsList.length})`,
            });
          }

          const normOpts = optionsList.map((o) => o.trim().toLowerCase());
          if (new Set(normOpts).size !== normOpts.length) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 2.2: Duplicate Choice Options',
              details: `Duplicate options in [${optionsList.join(' | ')}]`,
            });
          }

          if (correct.length !== 1) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 2.2: Single Correct Answer',
              details: `Expected exactly 1 correct answer, found ${correct.length}`,
            });
          } else if (!optionsList.includes(correct[0])) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 2.2: Correct Answer Missing From Options',
              details: `Correct answer "${correct[0]}" not found in options array`,
            });
          }

          if (optionsList.length >= 3 && correct.length === 1) {
            const correctOpt = correct[0];
            const distractors = optionsList.filter((o) => o !== correctOpt);
            const correctLen = correctOpt.length;
            const distractorLens = distractors.map((d) => d.length);
            const minLen = Math.min(correctLen, ...distractorLens);
            const maxLen = Math.max(correctLen, ...distractorLens);
            const avgDistLen = distractorLens.reduce((a, b) => a + b, 0) / distractorLens.length;

            if (maxLen > 25 && maxLen > minLen * 1.5 && maxLen - minLen > 15) {
              issues.push({
                severity: 'error',
                student: studentSlug,
                taskId,
                questionId: qId,
                rule: 'RULE 2.2: Option Length Asymmetry',
                details: `Options length unbalanced: max=${maxLen}, min=${minLen}, correct=${correctLen}, avgDist=${Math.round(avgDistLen)}`,
                snippet: `Correct: "${correctOpt}" (${correctLen}) vs Options: ${optionsList.map((o) => o.length).join(', ')}`,
              });
            } else if (minLen <= 3 && maxLen >= 12 && maxLen / Math.max(1, minLen) >= 3.5) {
              issues.push({
                severity: 'error',
                student: studentSlug,
                taskId,
                questionId: qId,
                rule: 'RULE 2.2: Extreme Short-vs-Phrase Option Asymmetry',
                details: `Option length ratio too extreme: max=${maxLen} vs min=${minLen} (${(maxLen / Math.max(1, minLen)).toFixed(1)}x)`,
                snippet: `Options: [${optionsList.map((o) => `"${o}" (${o.length})`).join(', ')}]`,
              });
            } else if (includeWarnings && maxLen > minLen * 2.2 && maxLen - minLen >= 10) {
              issues.push({
                severity: 'warning',
                student: studentSlug,
                taskId,
                questionId: qId,
                rule: 'RULE 2.2: Short Option Length Disproportion',
                details: `Option length ratio: max=${maxLen} vs min=${minLen}`,
                snippet: `Options: [${optionsList.map((o) => `"${o}" (${o.length})`).join(', ')}]`,
              });
            }

            const correctHasParen = /\(.*?\)/.test(correctOpt);
            const distractorsWithParen = distractors.filter((d) => /\(.*?\)/.test(d)).length;
            if (correctHasParen && distractorsWithParen === 0) {
              issues.push({
                severity: 'error',
                student: studentSlug,
                taskId,
                questionId: qId,
                rule: 'RULE 2.2: Asymmetric Parenthesis Qualifier',
                details: `Only correct option contains parenthetical qualifier: "${correctOpt}"`,
              });
            } else if (
              optionsList.length >= 4 &&
              (correctHasParen ? 1 : 0) + distractorsWithParen === optionsList.length - 1
            ) {
              issues.push({
                severity: 'error',
                student: studentSlug,
                taskId,
                questionId: qId,
                rule: 'RULE 2.2: Incomplete Parenthesis Symmetry',
                details: `${optionsList.length - 1} of ${optionsList.length} options have parentheses while 1 stands out without parentheses: [${optionsList.join(' | ')}]`,
              });
            }

            const correctHasSlash = /\//.test(correctOpt);
            const distractorsWithSlash = distractors.filter((d) => /\//.test(d)).length;
            if (correctHasSlash && distractorsWithSlash === 0) {
              issues.push({
                severity: 'error',
                student: studentSlug,
                taskId,
                questionId: qId,
                rule: 'RULE 2.2: Asymmetric Slash Qualifier',
                details: `Only correct option contains slash: "${correctOpt}"`,
              });
            }
          }
        }

        // 9. OPEN INPUT & CALCULATION CHECKS (RULE 2.3 & RULE 2.6)
        if (type !== 'code' && q.sampleSolution && q.sampleSolution.includes('\\n')) {
          issues.push({
            severity: 'error',
            student: studentSlug,
            taskId,
            questionId: qId,
            rule: 'RULE 1.2: Double-Escaped Newline Literal',
            details: 'sampleSolution contains literal "\\n" instead of genuine newline',
            snippet: q.sampleSolution,
          });
        }

        if (studentPiiRegex && q.sampleSolution) {
          const piiMatch = q.sampleSolution.match(studentPiiRegex);
          if (piiMatch) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 3: Student Name Leak in Sample Solution',
              details: `sampleSolution exposes student identifier "${piiMatch[0]}"`,
              snippet: q.sampleSolution,
            });
          }
        }

        const qRecord = q as unknown as Record<string, unknown>;
        for (const forbiddenKey of ['formulaTemplate', 'rechenwegHint', 'rechenwegTemplate', 'solutionTemplate']) {
          if (qRecord[forbiddenKey] !== undefined) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 2.6: Forbidden Scratchpad Spoiler Field',
              details: `Question defines forbidden pre-filled scratchpad/formula property "${forbiddenKey}"`,
            });
          }
        }

        if (type === 'rechnung') {
          if (!q.sampleSolution || !q.sampleSolution.trim()) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 2.6: Calculation Missing Sample Solution',
              details: 'rechnung question must supply a step-by-step sampleSolution',
            });
          }
          if (
            !q.isOpenEnded &&
            q.prompt &&
            /\bund\s+(?:beurteile|begründe|erkläre|entscheide|interpretiere)\b/i.test(q.prompt)
          ) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 2.6: Split Calculation and Open Judgment',
              details: 'rechnung question mixes a single numeric target box with an open judgment sub-question',
              snippet: q.prompt,
            });
          }
        }

        if (type === 'input' || type === 'rechnung') {
          if (!q.isOpenEnded && (!q.correctAnswers || q.correctAnswers.length === 0)) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 2.3: Closed Input Missing Correct Answers',
              details: 'Input question is not marked open-ended, but has no correctAnswers',
            });
          }
          if (includeWarnings && q.isOpenEnded && !q.sampleSolution) {
            issues.push({
              severity: 'warning',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 2.3: Open-Ended Missing Sample Solution',
              details: 'Open-ended question has no sampleSolution model answer',
            });
          }

          if (q.correctAnswers && q.correctAnswers.length > 0) {
            const answers = q.correctAnswers;
            const hasCommaDecimal = answers.some((a) => /\d,\d/.test(a));
            const hasDotDecimal = answers.some((a) => {
              if (!/\d\.\d/.test(a)) return false;
              if (/\d{1,2}\.\d{1,2}\.\d{2,4}/.test(a)) return false;
              if (hasCommaDecimal && answers.some((c) => c.replace(',', '.') === a)) {
                return true;
              }
              return !/\d{1,3}\.\d{3}(?!\d)/.test(a);
            });
            if (hasCommaDecimal !== hasDotDecimal) {
              issues.push({
                severity: 'error',
                student: studentSlug,
                taskId,
                questionId: qId,
                rule: 'RULE 2.3: Missing Decimal Comma/Dot Variant',
                details: `Numeric decimal answer must include both comma and dot variants: [${q.correctAnswers.join(' | ')}]`,
              });
            }
          }
        }

        // 10. WORD SELECT CHECKS (RULE 2.4)
        if (type === 'word_select') {
          const words = q.words || [];
          const correct = q.correctAnswers || [];
          if (words.length === 0) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 2.4: Word Select Empty Words',
              details: 'word_select has empty words array',
            });
          }
          if (correct.length === 0) {
            issues.push({
              severity: 'error',
              student: studentSlug,
              taskId,
              questionId: qId,
              rule: 'RULE 2.4: Word Select Empty Correct',
              details: 'word_select has no correctAnswers',
            });
          }

          const wordTokens = words
            .flatMap((w) => normalizeAnswer(w).split(/\s+/))
            .filter(Boolean);

          for (const ans of correct) {
            if (ans.includes('...')) {
              issues.push({
                severity: 'error',
                student: studentSlug,
                taskId,
                questionId: qId,
                rule: 'RULE 2.4: Word Select Ellipsis Not Allowed',
                details: `word_select correctAnswers must not contain "...": "${ans}"`,
              });
              continue;
            }
            const targetTokens = normalizeAnswer(ans).split(/\s+/).filter(Boolean);
            if (!isOrderedTokenSubsequence(wordTokens, targetTokens)) {
              issues.push({
                severity: 'error',
                student: studentSlug,
                taskId,
                questionId: qId,
                rule: 'RULE 2.4: Target Word Missing From Words Array',
                details: `Target answer "${ans}" cannot be selected as an ordered subsequence from words: [${words.join(', ')}]`,
              });
            }
          }
        }

        // 11. PROGRAMMING TASKS CHECKS (RULE 2.5)
        if (type === 'code') {
          const isPlayground = !q.expectedOutput && !q.sampleSolution && !q.hint;
          if (!isPlayground) {
            if (!q.sampleSolution || !q.initialCode || !q.expectedOutput) {
              issues.push({
                severity: 'error',
                student: studentSlug,
                taskId,
                questionId: qId,
                rule: 'RULE 2.5: Programming Triad Missing',
                details: 'Code exercise must supply sampleSolution, initialCode, and expectedOutput',
              });
            } else {
              const execRes = runJavaInterpreter(q.sampleSolution, q.stdin || '');
              if (!execRes.success) {
                issues.push({
                  severity: 'error',
                  student: studentSlug,
                  taskId,
                  questionId: qId,
                  rule: 'RULE 2.5: Reference Code Execution Failed',
                  details: `sampleSolution failed in Java interpreter: ${execRes.runtimeError || execRes.compileError}`,
                });
              } else if (!checkOutputMatch(execRes.output || '', q.expectedOutput, q.correctAnswers)) {
                issues.push({
                  severity: 'error',
                  student: studentSlug,
                  taskId,
                  questionId: qId,
                  rule: 'RULE 2.5: Reference Code Output Mismatch',
                  details: `sampleSolution output "${(execRes.output || '').trim()}" did not match expectedOutput "${q.expectedOutput.trim()}"`,
                });
              }

              const initRes = runJavaInterpreter(q.initialCode, q.stdin || '');
              if (
                initRes.success &&
                (initRes.output || '').trim().length > 0 &&
                (initRes.output || '').trim() === q.expectedOutput.trim()
              ) {
                issues.push({
                  severity: 'error',
                  student: studentSlug,
                  taskId,
                  questionId: qId,
                  rule: 'RULE 2.5: Initial Code Already Pre-Solved',
                  details: 'initialCode already produces expectedOutput without student edits',
                });
              }
            }
          }
        }

        // 12. SEQUENTIAL LEAKAGE CHECKS — SINGLE & MULTI-WORD (RULE 1.1)
        if (i > 0) {
          const prevQ = questions[i - 1];
          if (prevQ.correctAnswers) {
            for (const prevAns of prevQ.correctAnswers) {
              const trimmed = prevAns.trim();
              const isShortUnitMeasure =
                /^\d+(?:[,.]\d+)?\s*(?:cm²?|m²?|dm²?|mm²?|km|kg|g|l|ml|€|%)$/i.test(trimmed);
              if (!trimmed.includes(' ') && (trimmed.length > 4 || isShortUnitMeasure)) {
                if (
                  q.prompt &&
                  containsTokenOrPhrase(q.prompt, trimmed, isShortUnitMeasure ? 2 : 4)
                ) {
                  issues.push({
                    severity: 'error',
                    student: studentSlug,
                    taskId,
                    questionId: qId,
                    rule: 'RULE 1.1: Sequential Question Leakage',
                    details: `Prompt of question #${i + 1} contains target answer of previous question #${i}: "${trimmed}"`,
                    snippet: q.prompt,
                  });
                }
              } else if (trimmed.includes(' ') && (trimmed.length > 5 || isShortUnitMeasure)) {
                if (
                  q.prompt &&
                  containsTokenOrPhrase(q.prompt, trimmed, isShortUnitMeasure ? 2 : 4)
                ) {
                  issues.push({
                    severity: 'error',
                    student: studentSlug,
                    taskId,
                    questionId: qId,
                    rule: 'RULE 1.1: Sequential Question Leakage (Multi-Word)',
                    details: `Prompt of question #${i + 1} contains multi-word answer of previous question #${i}: "${trimmed}"`,
                    snippet: q.prompt,
                  });
                }
              }
            }
          }
        }
      }

      // 13. MULTIPLE CHOICE KEY DISTRIBUTION & MAX STREAK = 2 (RULE 2.2)
      const taskChoiceItems: { id: string; index: number }[] = [];
      for (const q of questions) {
        if (
          (q.interactionType === 'choice' || Boolean(q.options && q.options.length > 0)) &&
          q.options &&
          q.correctAnswers &&
          q.correctAnswers.length > 0
        ) {
          const idx = q.options.indexOf(q.correctAnswers[0]);
          if (idx !== -1) {
            taskChoiceItems.push({ id: q.id, index: idx });
          }
        }
      }

      if (taskChoiceItems.length >= 3) {
        const firstIdx = taskChoiceItems[0].index;
        if (taskChoiceItems.every((c) => c.index === firstIdx)) {
          issues.push({
            severity: 'error',
            student: studentSlug,
            taskId,
            questionId: 'task-choice-mono-index',
            rule: 'RULE 2.2: Choice Key Distribution (Mono-Index Task)',
            details: `100% of multiple-choice questions (${taskChoiceItems.length}/${taskChoiceItems.length}) have identical option index ${firstIdx}`,
          });
        }

        if (taskChoiceItems.length >= 4) {
          const counts: Record<number, number> = {};
          for (const item of taskChoiceItems) {
            counts[item.index] = (counts[item.index] || 0) + 1;
          }
          for (const [idxStr, count] of Object.entries(counts)) {
            const ratio = count / taskChoiceItems.length;
            if (ratio >= 0.7) {
              issues.push({
                severity: 'error',
                student: studentSlug,
                taskId,
                questionId: 'task-choice-dominance',
                rule: 'RULE 2.2: Choice Key Distribution Dominance',
                details: `Option ${String.fromCharCode(65 + Number(idxStr))} accounts for ${(ratio * 100).toFixed(0)}% (${count}/${taskChoiceItems.length}) of MC answers (max < 70%)`,
              });
            }
          }
        }

        let currentStreak = 1;
        for (let sIdx = 1; sIdx < taskChoiceItems.length; sIdx++) {
          if (taskChoiceItems[sIdx].index === taskChoiceItems[sIdx - 1].index) {
            currentStreak++;
            if (currentStreak >= 3) {
              issues.push({
                severity: 'error',
                student: studentSlug,
                taskId,
                questionId: taskChoiceItems[sIdx].id,
                rule: 'RULE 2.2: Choice Repetitive Answer Streak',
                details: `Streak of ${currentStreak} consecutive MC questions with identical answer index ${taskChoiceItems[sIdx].index} (Option ${String.fromCharCode(65 + taskChoiceItems[sIdx].index)}; max allowed streak is 2)`,
              });
            }
          } else {
            currentStreak = 1;
          }
        }
      }
    }
  }

  const errorCount = issues.filter((i) => i.severity === 'error').length;
  const warningCount = issues.filter((i) => i.severity === 'warning').length;

  return { issues, errorCount, warningCount, studentCount: studentsToAudit.length };
}

// Run as CLI when invoked directly
const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]).toLowerCase() ===
    path.resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')).toLowerCase();

if (isMain) {
  const { issues, errorCount, studentCount } = runRulesAudit();

  console.log(`Audited ${studentCount} students across all tasks: ${errorCount} error(s) found.`);

  const byRule: Record<string, number> = {};
  for (const issue of issues) {
    byRule[issue.rule] = (byRule[issue.rule] || 0) + 1;
  }
  if (issues.length > 0) {
    console.table(byRule);
  }

  fs.writeFileSync('scripts/audit-report.json', JSON.stringify(issues, null, 2), 'utf-8');

  if (errorCount > 0) {
    console.error('\n❌ RULES AUDIT FAILED: The following issues must be resolved:\n');
    for (const issue of issues) {
      console.error(
        `- [${issue.student} / ${issue.taskId} / ${issue.questionId}] ${issue.rule}: ${issue.details}`
      );
      if (issue.snippet) {
        console.error(`  Snippet: "${issue.snippet}"`);
      }
    }
    process.exit(1);
  } else {
    console.log(`✅ RULES AUDIT PASSED: All ${studentCount} students comply 100% with RULES.md!`);
  }
}
