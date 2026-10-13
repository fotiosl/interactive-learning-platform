'use client';

import { useState, useMemo } from 'react';
import {
  Play,
  RotateCcw,
  HelpCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Terminal,
  Code2,
  Copy,
  Check,
  AlertTriangle,
  FileCode2,
  Loader2,
  CheckCheck,
  Info,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Editor from 'react-simple-code-editor';
import { runJavaInterpreter } from '@/lib/javaInterpreter';
import { renderHighlightedJava, highlightJavaToHtml, escapeHtml } from './javaSyntaxHighlight';

export interface SyntaxIssue {
  line: number;
  message: string;
  type: 'error' | 'warning';
}

// Client-side live linter for beginner Java code
export function analyzeJavaSyntax(code: string): SyntaxIssue[] {
  const issues: SyntaxIssue[] = [];
  const lines = code.split('\n');

  const declaredVariables = new Set<string>();
  let openBraces = 0;
  let closeBraces = 0;
  let inBlockComment = false;

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    let line = lines[i];

    // Handle block comments /* ... */
    if (inBlockComment) {
      if (line.includes('*/')) {
        inBlockComment = false;
        line = line.substring(line.indexOf('*/') + 2);
      } else {
        continue;
      }
    }
    if (line.includes('/*')) {
      if (line.includes('*/')) {
        line = line.replace(/\/\*.*?\*\//g, '');
      } else {
        inBlockComment = true;
        line = line.substring(0, line.indexOf('/*'));
      }
    }

    // Strip single-line comments // ...
    const commentIdx = line.indexOf('//');
    if (commentIdx !== -1) {
      line = line.substring(0, commentIdx);
    }

    const trimmed = line.trim();
    if (!trimmed) continue;

    // Count braces
    for (const ch of trimmed) {
      if (ch === '{') openBraces++;
      if (ch === '}') closeBraces++;
    }

    // 1. Typos in System.out.println
    if (/\bsystem\.out\.(println|print)\b/.test(trimmed)) {
      issues.push({
        line: lineNum,
        type: 'error',
        message: "„System“ muss mit großem 'S' geschrieben werden: System.out.println(...)",
      });
    } else if (/\b(?:Sytem|Systen|Sysout)\.out\.(println|print)\b/.test(trimmed)) {
      issues.push({
        line: lineNum,
        type: 'error',
        message: "Tippfehler bei „System.out.println(...)“",
      });
    } else if (/\bSystem\.out\.printline\b/.test(trimmed)) {
      issues.push({
        line: lineNum,
        type: 'error',
        message: "Der Befehl heißt „System.out.println(...)“ (mit ln, nicht printline).",
      });
    } else if (/\bprintln\s*\(/.test(trimmed) && !trimmed.includes('System.out.')) {
      issues.push({
        line: lineNum,
        type: 'error',
        message: "In Java musst du „System.out.println(...)“ schreiben.",
      });
    }

    // 2. Control structures without parentheses: while i <= 5 or if x >= 5
    if (/^while\s+[^(]/.test(trimmed) && !trimmed.startsWith('while(')) {
      issues.push({
        line: lineNum,
        type: 'error',
        message: "Die Schleifen-Bedingung muss in runden Klammern stehen: while (Bedingung) { ... }",
      });
    }
    if (/^if\s+[^(]/.test(trimmed) && !trimmed.startsWith('if(')) {
      issues.push({
        line: lineNum,
        type: 'error',
        message: "Die Bedingung der if-Abfrage muss in runden Klammern stehen: if (Bedingung) { ... }",
      });
    }

    // 3. Parentheses mismatch on this line
    const openParens = (trimmed.match(/\(/g) || []).length;
    const closeParens = (trimmed.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
      issues.push({
        line: lineNum,
        type: 'warning',
        message: openParens > closeParens
          ? "Hier fehlt eine schließende runde Klammer ')'."
          : "Hier gibt es eine überflüssige runde Klammer ')'.",
      });
    }

    // 4. Unclosed String literals
    const cleanedQuotes = trimmed.replace(/\\"/g, '');
    const quoteCount = (cleanedQuotes.match(/"/g) || []).length;
    if (quoteCount % 2 !== 0) {
      issues.push({
        line: lineNum,
        type: 'error',
        message: 'Ein Text in Anführungszeichen wurde nicht geschlossen (fehlendes ").',
      });
    }

    // 5. Track declared variables on this line
    const declMatch = trimmed.match(/\b(int|String|double|boolean|char|long|float)\s+([A-Za-z0-9_$]+)/);
    if (declMatch) {
      declaredVariables.add(declMatch[2]);
    }
    const forMatch = trimmed.match(/for\s*\(\s*(int|String|double)\s+([A-Za-z0-9_$]+)/);
    if (forMatch) {
      declaredVariables.add(forMatch[2]);
    }

    // Check lowercase 'string'
    if (/\bstring\s+[A-Za-z0-9_$]+/.test(trimmed)) {
      issues.push({
        line: lineNum,
        type: 'error',
        message: "In Java schreibt man den Datentyp 'String' mit großem 'S'.",
      });
    }

    // 6. Assignment without datatype (e.g. x = 5; when x was never declared)
    const assignMatch = trimmed.match(/^([A-Za-z0-9_$]+)\s*(=|\+=|-=|\*=|\/=)\s*([^;]+);?$/);
    if (assignMatch) {
      const varName = assignMatch[1];
      const isReserved = ['this', 'super', 'return', 'else', 'case', 'break', 'args'].includes(varName);
      if (!isReserved && !declaredVariables.has(varName)) {
        issues.push({
          line: lineNum,
          type: 'warning',
          message: `Variable „${varName}“ wurde noch nicht deklariert. Fehlt der Datentyp (z. B. 'int ${varName} = ...')?`,
        });
      }
    }

    // 7. Missing semicolon (;) check on statements
    const isControlStructure =
      trimmed.startsWith('public ') ||
      trimmed.startsWith('class ') ||
      trimmed.startsWith('static ') ||
      trimmed.startsWith('void ') ||
      trimmed.startsWith('if ') ||
      trimmed.startsWith('if(') ||
      trimmed.startsWith('else') ||
      trimmed.startsWith('while ') ||
      trimmed.startsWith('while(') ||
      trimmed.startsWith('for ') ||
      trimmed.startsWith('for(') ||
      trimmed.startsWith('switch ') ||
      trimmed.startsWith('switch(');

    const isBraceOnly = trimmed === '{' || trimmed === '}' || trimmed.endsWith('{') || trimmed.endsWith('}');

    if (!isControlStructure && !isBraceOnly) {
      const isStatement =
        trimmed.startsWith('System.out.') ||
        trimmed.startsWith('system.out.') ||
        trimmed.startsWith('int ') ||
        trimmed.startsWith('String ') ||
        trimmed.startsWith('double ') ||
        trimmed.startsWith('boolean ') ||
        trimmed.startsWith('return ') ||
        trimmed.startsWith('return;') ||
        trimmed.includes('++') ||
        trimmed.includes('--') ||
        trimmed.includes('=') ||
        trimmed.endsWith(')');

      if (isStatement && !trimmed.endsWith(';')) {
        issues.push({
          line: lineNum,
          type: 'error',
          message: 'Hier fehlt am Zeilenende ein Semikolon (;).',
        });
      }
    }

    // 8. Single quotes around strings
    if (/'[^']{2,}'/.test(trimmed)) {
      issues.push({
        line: lineNum,
        type: 'error',
        message: "Textketten gehören in doppelte Anführungszeichen (\"...\"), einzelne Hochkommas ('...') sind nur für einzelne Zeichen (char).",
      });
    }

    // 9. Accidental assignment in condition: if (x = 5)
    if (/(?:if|while)\s*\([A-Za-z0-9_$]+\s*=\s*[^=]/.test(trimmed)) {
      issues.push({
        line: lineNum,
        type: 'warning',
        message: "In Bedingungen nutzt man '==' zum Vergleichen, nicht das einfache Zuweisungs-Gleich '='.",
      });
    }
  }

  // 10. Overall curly brace mismatch
  if (openBraces > closeBraces) {
    const diff = openBraces - closeBraces;
    issues.push({
      line: lines.length,
      type: 'error',
      message: `Es ${diff === 1 ? 'fehlt eine schließende geschweifte Klammer „}“' : `fehlen ${diff} schließende geschweifte Klammern „}“`} am Ende der Datei.`,
    });
  } else if (closeBraces > openBraces) {
    const diff = closeBraces - openBraces;
    issues.push({
      line: lines.length,
      type: 'error',
      message: `Es gibt ${diff === 1 ? 'eine überflüssige schließende geschweifte Klammer „}“' : `${diff} überflüssige schließende geschweifte Klammern „}“`}.`,
    });
  }

  return issues;
}

// Intelligent output matching for beginner tasks
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
  // 1. Direct match (normalized line endings)
  const normA = actual.replace(/\r\n/g, '\n').trim();
  const normE = expected.replace(/\r\n/g, '\n').trim();
  if (normA === normE) return true;

  // 2. Line by line flexible comparison
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

      // Mathematical expression whitespace tolerance: e.g. "1*3=3" vs "1 * 3 = 3"
      if (lineA.replace(/\s+/g, '') === lineE.replace(/\s+/g, '')) return true;

      // Punctuation and case tolerance: e.g. "Start!" vs "Start" vs "start!"
      const stripPunct = (s: string) => s.toLowerCase().replace(/[.!?:;,]/g, '').trim();
      if (stripPunct(lineA) === stripPunct(lineE)) return true;

      return false;
    });

    if (allLinesMatch) return true;
  }

  // 3. Single-value / number extraction tolerance
  // E.g. expected is "100" or "40" or "70" or "15" or "Summe: 15"
  if (linesE.length === 1) {
    const singleE = linesE[0];
    const singleA = linesA.join(' ');

    // Pure number comparison
    const numE = singleE.match(/-?\d+(?:[.,]\d+)?/);
    const numA = singleA.match(/-?\d+(?:[.,]\d+)?/);
    if (numE && numA && numE[0] === numA[0]) {
      // If expected is just the number (e.g. "100", "40", "70", "15")
      if (/^-?\d+$/.test(singleE.trim())) {
        return true;
      }
      // Or if expected was "Summe: 15" and actual contains 15 and keyword "summe"
      const lowerA = singleA.toLowerCase();
      const lowerE = singleE.toLowerCase();
      if (lowerE.includes('summe') && (lowerA.includes('summe') || lowerA === numE[0])) {
        return true;
      }
      if (lowerE.includes('alter') && lowerA.includes('17')) {
        return true;
      }
      if (lowerE.includes('punkte') && lowerA.includes(numE[0])) {
        return true;
      }
    }

    // Keyword match (e.g. "Bestanden!" vs "Bestanden" or "Hallo Informatik!" vs "Hallo Informatik")
    const cleanWord = (s: string) => s.toLowerCase().replace(/[^a-z0-9äöüß]/g, '');
    if (cleanWord(singleA) === cleanWord(singleE)) {
      return true;
    }
  }

  // 4. Number sequence comparison (for loops / counters)
  // E.g. expected is 1, 2, 3, 4, 5 or 2, 4, 6, 8, 10
  const numsE = extractNumbers(normE);
  const numsA = extractNumbers(normA);
  if (numsE.length > 1 && numsA.length === numsE.length) {
    const sequenceMatches = numsE.every((n, i) => n === numsA[i]);
    if (sequenceMatches) {
      // Also check if non-number words match (e.g. "Start!" at the end of countdown)
      const textE = normE.replace(/\d+/g, '').toLowerCase().replace(/[^a-zäöüß]/g, '');
      const textA = normA.replace(/\d+/g, '').toLowerCase().replace(/[^a-zäöüß]/g, '');
      if (textE === textA || textA.includes(textE)) {
        return true;
      }
    }
  }

  // 5. Multi-line substring / contains match (useful when Scanner prompts are printed before input)
  if (normA.includes(normE)) {
    return true;
  }
  if (linesE.length > 1 && linesE.every((lineE) => normA.includes(lineE))) {
    return true;
  }

  return false;
}

function extractNumbers(str: string): number[] {
  const matches = str.match(/-?\b\d+\b/g);
  return matches ? matches.map(Number) : [];
}

// Convert javac compiler error into friendly German explanation
function getCompilerTip(err: string): string | null {
  if (err.includes("';' expected")) {
    return '💡 Tipp: Am Ende einer Zeile fehlt ein Semikolon (;).';
  }
  if (err.includes('cannot find symbol') && err.includes('class system')) {
    return '💡 Tipp: „System“ muss in Java mit einem großen „S“ geschrieben werden.';
  }
  if (err.includes('cannot find symbol') && err.includes('variable')) {
    return '💡 Tipp: Eine Variable wurde verwendet, die nicht deklariert ist. Fehlt der Datentyp (z. B. int)?';
  }
  if (err.includes('reached end of file while parsing')) {
    return '💡 Tipp: Es fehlt mindestens eine schließende geschweifte Klammer „}“ am Ende des Programms.';
  }
  if (err.includes('incompatible types')) {
    return '💡 Tipp: Die Datentypen passen nicht zusammen (z. B. Text einer int-Variablen zugewiesen).';
  }
  if (err.includes('unclosed string literal')) {
    return '💡 Tipp: Ein Text in Anführungszeichen wurde nicht mit " geschlossen.';
  }
  return null;
}

interface JavaCodeRunnerProps {
  initialCode?: string;
  expectedOutput?: string;
  correctAnswers?: string[];
  hint?: string;
  sampleSolution?: string;
  hideSampleSolution?: boolean;
  stdin?: string;
}

export function JavaCodeRunner({
  initialCode = 'public class Main {\n    public static void main(String[] args) {\n        // Dein Java-Code hier:\n        \n    }\n}',
  expectedOutput,
  correctAnswers,
  hint,
  sampleSolution,
  hideSampleSolution = false,
  stdin,
}: JavaCodeRunnerProps) {
  const [code, setCode] = useState(initialCode);
  const [stdinInput, setStdinInput] = useState(stdin || '');
  const [output, setOutput] = useState<string | null>(null);
  const [compileError, setCompileError] = useState<string | null>(null);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [copiedSolution, setCopiedSolution] = useState(false);
  const [isMatched, setIsMatched] = useState<boolean | null>(null);
  const [syntaxHighlighting, setSyntaxHighlighting] = useState(true);

  // Dynamic class & file name detection
  const classMatch = code.match(/(?:public\s+)?class\s+([A-Za-z0-9_$]+)/);
  const activeFileName = `${classMatch ? classMatch[1] : 'Main'}.java`;

  // Real-time syntax issue analysis
  const syntaxIssues = useMemo(() => analyzeJavaSyntax(code), [code]);
  const issuesByLine = useMemo(() => {
    const map = new Map<number, SyntaxIssue>();
    for (const issue of syntaxIssues) {
      if (!map.has(issue.line)) map.set(issue.line, issue);
    }
    return map;
  }, [syntaxIssues]);

  // Run Java Code via API
  const handleRunCode = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setCompileError(null);
    setRuntimeError(null);
    setOutput(null);
    setIsMatched(null);

    try {
      const res = await fetch('/api/run-java', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, stdin: stdinInput }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.compileError) {
          setCompileError(data.compileError);
          return;
        } else if (data.runtimeError) {
          setRuntimeError(data.runtimeError);
          if (data.output) setOutput(data.output);
          return;
        } else {
          const out = data.output ?? '';
          setOutput(out);

          if (expectedOutput || (correctAnswers && correctAnswers.length > 0)) {
            const matched = checkOutputMatch(out, expectedOutput, correctAnswers);
            setIsMatched(matched);
            if (matched) {
              confetti({
                particleCount: 70,
                spread: 60,
                origin: { y: 0.7 },
              });
            }
          }
          return;
        }
      }
      // If server returned non-ok error, throw to enter local interpreter fallback
      throw new Error('API_FALLBACK');
    } catch {
      // Offline / serverless resilient fallback: run client-side Java interpreter
      const fallback = runJavaInterpreter(code, stdinInput);
      if (fallback.isTimeout) {
        setRuntimeError(fallback.runtimeError || 'Zeitüberschreitung (Endlosschleife)');
      } else if (!fallback.success) {
        setRuntimeError(fallback.runtimeError || fallback.compileError || 'Laufzeitfehler');
      } else {
        const out = fallback.output ?? '';
        setOutput(out);

        if (expectedOutput || (correctAnswers && correctAnswers.length > 0)) {
          const matched = checkOutputMatch(out, expectedOutput, correctAnswers);
          setIsMatched(matched);
          if (matched) {
            confetti({
              particleCount: 70,
              spread: 60,
              origin: { y: 0.7 },
            });
          }
        }
      }
    } finally {
      setIsRunning(false);
    }
  };

  // Keyboard shortcut: Ctrl + Enter to run code
  const handleKeyDown: React.KeyboardEventHandler<HTMLElement> = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRunCode();
    }
  };

  const handleResetCode = () => {
    setCode(initialCode);
    setStdinInput(stdin || '');
    setOutput(null);
    setCompileError(null);
    setRuntimeError(null);
    setIsMatched(null);
  };

  const handleApplySolutionToEditor = () => {
    if (!sampleSolution) return;
    setCode(sampleSolution);
    setOutput(null);
    setCompileError(null);
    setRuntimeError(null);
    setIsMatched(null);
  };

  const handleCopySolution = () => {
    if (!sampleSolution) return;
    navigator.clipboard.writeText(sampleSolution);
    setCopiedSolution(true);
    setTimeout(() => setCopiedSolution(false), 2000);
  };

  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 8) }, (_, i) => i + 1);
  const isPlaygroundMode = !expectedOutput && !sampleSolution && !hint;

  return (
    <div className="mt-3 space-y-4">
      {/* Editor & Actions Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-lg">
        {/* Editor Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-950/70 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="ml-2 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <FileCode2 className="h-4 w-4 text-amber-400" />
              <span>{activeFileName}</span>
              <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold text-amber-300">Java 22</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSyntaxHighlighting(!syntaxHighlighting)}
              title={syntaxHighlighting ? 'Zu schlichtem Klartext wechseln' : 'Farbiges Syntax-Highlighting aktivieren'}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                syntaxHighlighting
                  ? 'border-indigo-500/50 bg-indigo-950/60 text-indigo-300 hover:bg-indigo-900/60'
                  : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Sparkles className="h-3 w-3 text-indigo-400" />
              <span className="hidden sm:inline">{syntaxHighlighting ? 'Syntax-Farben an' : 'Klartext'}</span>
            </button>

            <button
              type="button"
              onClick={handleResetCode}
              title="Code auf Ausgangszustand zurücksetzen"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span className="hidden sm:inline">Zurücksetzen</span>
            </button>

            <button
              type="button"
              onClick={handleRunCode}
              disabled={isRunning}
              title="Kompilieren & Ausführen (Tastenkürzel: Strg + Enter)"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-500 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {isRunning ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Kompiliere...</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>Ausführen</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Input Area with Gutter & Live Error Indicators */}
        <div className="java-editor-area relative flex min-h-[240px] bg-slate-950 font-mono text-xs sm:text-sm">
          <style>{`
            .java-editor-area pre,
            .java-editor-area textarea {
              white-space: pre !important;
              word-break: normal !important;
              overflow-wrap: normal !important;
            }
          `}</style>

          {/* Line Numbers Gutter with syntax issue badges */}
          <div
            className="select-none py-3.5 pl-3 pr-2.5 text-right font-mono border-r border-slate-800/80 bg-slate-950/90 shrink-0 z-10"
            style={{ lineHeight: '1.375rem' }}
          >
            {lineNumbers.map((num) => {
              const issue = issuesByLine.get(num);
              return (
                <div
                  key={num}
                  className="flex items-center justify-end gap-1.5"
                  style={{ height: '1.375rem', lineHeight: '1.375rem' }}
                >
                  {issue ? (
                    <span
                      title={`Zeile ${num}: ${issue.message}`}
                      className="cursor-help inline-flex items-center justify-center text-[10px] text-amber-400 font-bold"
                    >
                      ⚠️
                    </span>
                  ) : (
                    <span className="inline-block w-3.5" />
                  )}
                  <span className={issue ? 'text-amber-400 font-bold' : 'text-slate-600'}>
                    {num}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Live Syntax-Colored Interactive Code Editor (Zero Drift) */}
          <div className="flex-1 min-w-0 overflow-x-auto">
            <Editor
              value={code}
              onValueChange={(newCode) => setCode(newCode)}
              highlight={(c) => (syntaxHighlighting ? highlightJavaToHtml(c) : escapeHtml(c))}
              padding={14}
              tabSize={4}
              insertSpaces={true}
              onKeyDown={handleKeyDown}
              placeholder="// Schreibe hier deinen Java-Code..."
              style={{
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                fontSize: '13px',
                lineHeight: '1.375rem',
                minHeight: '240px',
                color: '#f1f5f9',
                caretColor: '#38bdf8',
              }}
              className="bg-transparent focus:outline-hidden"
              textareaClassName="focus:outline-hidden selection:bg-indigo-600/50 selection:text-white"
            />
          </div>
        </div>

        {/* Live Syntax-Check Strip */}
        {syntaxIssues.length > 0 ? (
          <div className="border-t border-amber-900/40 bg-amber-950/30 px-4 py-2 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-amber-300 mb-1">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
              <span>
                {syntaxIssues.length} Syntax-Hinweis{syntaxIssues.length > 1 ? 'e' : ''} erkannt:
              </span>
            </div>
            <ul className="space-y-1 pl-5 list-disc text-[11px] text-amber-200/90 font-mono">
              {syntaxIssues.slice(0, 4).map((issue, idx) => (
                <li key={idx}>
                  <strong className="text-amber-300">Zeile {issue.line}:</strong> {issue.message}
                </li>
              ))}
              {syntaxIssues.length > 4 && (
                <li className="text-amber-400 italic list-none -ml-4">
                  + {syntaxIssues.length - 4} weitere Hinweise...
                </li>
              )}
            </ul>
          </div>
        ) : (
          <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/60 px-4 py-1.5 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1 text-emerald-400/90 font-medium">
              <CheckCheck className="h-3.5 w-3.5 text-emerald-400" />
              Syntax intakt (Semikolons, Klammern & Typen geprüft)
            </span>
            <span>Tastenkürzel: <kbd className="rounded bg-slate-800 px-1 py-0.5 text-slate-300 font-mono">Strg + Enter</kbd></span>
          </div>
        )}
      </div>

      {/* Optional Interactive Standard Input (Scanner) */}
      {(Boolean(stdin) || code.includes('Scanner') || code.includes('System.in')) && (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/95 p-3.5 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
              <Terminal className="h-3.5 w-3.5 text-amber-400" />
              <span>Standard-Eingabe für Scanner (System.in):</span>
            </div>
            <span className="text-[11px] text-slate-400">Zeilenweise übergeben</span>
          </div>
          <textarea
            rows={2}
            value={stdinInput}
            onChange={(e) => setStdinInput(e.target.value)}
            placeholder="Eingabewerte hier eingeben (eine Eingabe pro Zeile)..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-xs text-amber-200 placeholder:text-slate-600 focus:border-amber-400 focus:outline-hidden"
          />
          <p className="mt-1 text-[11px] text-slate-400">
            Werte, die das Programm über <code className="text-amber-300">scanner.nextLine()</code> liest.
          </p>
        </div>
      )}

      {/* Terminal / Console Window */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-black text-slate-100 shadow-md">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-900 bg-slate-950 px-4 py-2 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Terminal className="h-3.5 w-3.5 text-sky-400" />
            <span className="font-semibold text-slate-300">Konsole (Terminal-Ausgabe)</span>
          </div>

          <div className="flex items-center gap-2">
            {isRunning && (
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                <Loader2 className="h-3 w-3 animate-spin" />
                Programm läuft...
              </span>
            )}
            {!isRunning && output !== null && !compileError && !runtimeError && (
              <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <Check className="h-3 w-3" />
                Erfolgreich beendet (Exit-Code 0)
              </span>
            )}
            {!isRunning && (compileError || runtimeError) && (
              <span className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Fehler aufgetreten
              </span>
            )}
          </div>
        </div>

        {/* Console Body */}
        <div className="p-4 font-mono text-xs sm:text-sm min-h-[90px] leading-relaxed overflow-x-auto">
          {isRunning && (
            <div className="text-slate-400 italic">
              Programm wird kompiliert und ausgeführt...
            </div>
          )}

          {!isRunning && compileError && (
            <div className="space-y-2 text-rose-400">
              <div className="flex items-center gap-1.5 font-bold text-rose-300">
                <AlertTriangle className="h-4 w-4 text-rose-400" />
                <span>Kompilierfehler (Compile Error):</span>
              </div>
              <pre className="whitespace-pre-wrap rounded-lg bg-rose-950/40 p-2.5 border border-rose-900/60 font-mono text-xs text-rose-200">
                {compileError}
              </pre>
              {getCompilerTip(compileError) && (
                <div className="flex items-start gap-1.5 rounded-lg bg-amber-950/50 border border-amber-900/60 p-2 text-xs text-amber-200">
                  <Info className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{getCompilerTip(compileError)}</span>
                </div>
              )}
            </div>
          )}

          {!isRunning && runtimeError && (
            <div className="space-y-1.5 text-rose-400">
              <p className="font-bold text-rose-300">⚠️ Laufzeit-Hinweis:</p>
              <pre className="whitespace-pre-wrap rounded-lg bg-rose-950/40 p-2.5 border border-rose-900/60 font-mono text-xs text-rose-200">
                {runtimeError}
              </pre>
            </div>
          )}

          {!isRunning && !compileError && output !== null && (
            output.length > 0 ? (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono select-none border-b border-slate-900 pb-1.5">
                  <span className="text-sky-400 font-bold">$</span>
                  <span className="text-slate-400">java {activeFileName.replace(/\.java$/, '')}</span>
                  <span className="text-slate-600">• Ausgabe:</span>
                </div>
                <pre className="whitespace-pre-wrap font-mono text-slate-100 selection:bg-sky-900/60 selection:text-white leading-relaxed">
                  {output}
                </pre>
              </div>
            ) : (
              <div className="text-slate-500 italic">
                (Das Programm wurde ausgeführt, hat aber keinen Text mit System.out.println ausgegeben.)
              </div>
            )
          )}

          {!isRunning && output === null && !compileError && !runtimeError && (
            <div className="text-slate-500 italic">
              Klicke oben rechts auf „Ausführen“, um deinen Java-Code zu kompilieren und die Konsolen-Ausgabe zu sehen.
            </div>
          )}
        </div>
      </div>

      {/* Verification Feedback Banner (Matches expectedOutput) */}
      {!isPlaygroundMode && expectedOutput && isMatched === true && (
        <div className="flex items-start gap-2.5 rounded-xl border border-emerald-300 bg-emerald-50 p-3.5 text-xs text-emerald-950 shadow-2xs">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
          <div>
            <p className="font-bold text-emerald-900 text-sm">Perfekt gelöst! 🎉</p>
            <p className="mt-0.5 text-emerald-800">
              Deine Konsolen-Ausgabe stimmt mit dem geforderten Ergebnis überein. Sehr sauber programmiert!
            </p>
          </div>
        </div>
      )}

      {!isPlaygroundMode && expectedOutput && isMatched === false && output !== null && !compileError && !runtimeError && (
        <div className="rounded-xl border border-amber-300 bg-amber-50/90 p-3.5 text-xs text-amber-950 shadow-2xs">
          <div className="flex items-center gap-2 font-bold text-amber-900 mb-1">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <span>Ausgabe weicht noch ab</span>
          </div>
          <p className="text-amber-800 mb-2">
            Dein Code läuft fehlerfrei durch, aber das Ergebnis entspricht noch nicht ganz der Aufgabenstellung:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="rounded-lg bg-white p-2 border border-amber-200">
              <span className="font-bold text-slate-500 block text-[10px] uppercase font-sans mb-1">Deine Ausgabe:</span>
              <pre className="text-slate-800 whitespace-pre-wrap">{output.trim() || '(leer)'}</pre>
            </div>
            <div className="rounded-lg bg-white p-2 border border-emerald-300">
              <span className="font-bold text-emerald-700 block text-[10px] uppercase font-sans mb-1">Erwartete Ausgabe:</span>
              <pre className="text-emerald-900 whitespace-pre-wrap">{expectedOutput.trim()}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Didactic Buttons: Hint & Sample Solution (Hidden in playground mode) */}
      {!isPlaygroundMode && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {hint && (
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <HelpCircle className="h-3.5 w-3.5 text-amber-700" />
              <span>{showHint ? 'Tipp verbergen' : '💡 Denkanstoß / Tipp'}</span>
            </button>
          )}

          {!hideSampleSolution && sampleSolution && (
            <button
              type="button"
              onClick={() => setShowSolution(!showSolution)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-900 hover:bg-indigo-100 transition-colors cursor-pointer"
            >
              {showSolution ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              <span>{showSolution ? 'Musterlösung verbergen' : '📋 Fertige Musterlösung ansehen'}</span>
            </button>
          )}
        </div>
      )}

      {/* Hint Box (Anti-Spoiler) */}
      {!isPlaygroundMode && showHint && hint && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-xs text-amber-900 shadow-2xs leading-relaxed">
          <span className="font-bold text-amber-950 block mb-0.5">Lösungsstrategie:</span>
          {hint}
        </div>
      )}

      {/* Reference Solution Box */}
      {!isPlaygroundMode && showSolution && sampleSolution && (
        <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/70 p-4 text-xs shadow-xs space-y-3">
          <div className="flex items-center justify-between gap-2 border-b border-indigo-200/80 pb-2.5">
            <div className="flex items-center gap-1.5 font-bold text-indigo-950">
              <Code2 className="h-4 w-4 text-indigo-600" />
              <span>Vollständige Referenzlösung (Java)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopySolution}
                className="inline-flex items-center gap-1 rounded-lg border border-indigo-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-indigo-800 hover:bg-indigo-50 transition-colors cursor-pointer"
              >
                {copiedSolution ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-600" />
                    <span>Kopiert!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Kopieren</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleApplySolutionToEditor}
                className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-2xs hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                <span>In Editor laden</span>
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-900 bg-slate-900/80 px-3.5 py-1.5 text-[11px] text-slate-400">
              <span className="font-mono text-amber-300 flex items-center gap-1.5">
                <FileCode2 className="h-3.5 w-3.5" />
                <span>{activeFileName}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-sans">Java Syntax-Highlighting</span>
            </div>
            <pre className="overflow-x-auto p-3.5 font-mono text-xs leading-5 whitespace-pre">
              {renderHighlightedJava(sampleSolution)}
            </pre>
          </div>
          <p className="text-[11px] text-indigo-900 leading-normal">
            💡 <strong>Tipp zum Weiterlernen:</strong> Du kannst auf „In Editor laden“ klicken, um die Lösung direkt im Editor auszuprobieren und anzupassen.
          </p>
        </div>
      )}
    </div>
  );
}
