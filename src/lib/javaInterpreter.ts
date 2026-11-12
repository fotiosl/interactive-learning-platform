/**
 * High-fidelity lightweight Java interpreter for beginner educational tasks.
 * Runs exclusively in sandboxed browser/worker contexts (never on Node.js servers)
 * and supports Scanner, System.out.print/println, primitives, static helper methods,
 * math, if/else, switch/case, and while/for/do-while loops.
 */

export interface JavaInterpreterResult {
  success: boolean;
  output?: string;
  compileError?: string;
  runtimeError?: string;
  isTimeout?: boolean;
}

/**
 * Strips comments in a single lexical pass while preserving string and char literals.
 */
function stripCommentsPreservingLiterals(code: string): string {
  let out = '';
  let i = 0;
  while (i < code.length) {
    const ch = code[i];
    if (ch === '"' || ch === "'") {
      const quote = ch;
      out += ch;
      i++;
      while (i < code.length) {
        const cur = code[i];
        out += cur;
        if (cur === '\\' && i + 1 < code.length) {
          out += code[i + 1];
          i += 2;
          continue;
        }
        i++;
        if (cur === quote) break;
      }
      continue;
    }
    if (ch === '/' && code[i + 1] === '/') {
      i += 2;
      while (i < code.length && code[i] !== '\n') i++;
      continue;
    }
    if (ch === '/' && code[i + 1] === '*') {
      i += 2;
      while (i < code.length && !(code[i] === '*' && code[i + 1] === '/')) i++;
      i += 2;
      continue;
    }
    out += ch;
    i++;
  }
  return out;
}

/**
 * Replaces string and char literals with opaque tokens so Java->JS regex
 * transformations cannot corrupt text inside quotes.
 */
function maskLiterals(code: string): { masked: string; literals: string[] } {
  const literals: string[] = [];
  let masked = '';
  let i = 0;
  while (i < code.length) {
    const ch = code[i];
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let lit = ch;
      i++;
      while (i < code.length) {
        const cur = code[i];
        lit += cur;
        if (cur === '\\' && i + 1 < code.length) {
          lit += code[i + 1];
          i += 2;
          continue;
        }
        i++;
        if (cur === quote) break;
      }
      const idx = literals.length;
      literals.push(lit);
      masked += quote === '"' ? `__JSTR_${idx}__` : `__JCHR_${idx}__`;
      continue;
    }
    masked += ch;
    i++;
  }
  return { masked, literals };
}

function unmaskLiterals(code: string, literals: string[]): string {
  return code.replace(/__J(?:STR|CHR)_(\d+)__/g, (full, idxStr: string) => {
    const lit = literals[Number(idxStr)];
    return lit !== undefined ? lit : full;
  });
}

function findMatchingDelimiter(src: string, openIdx: number, openChar: string, closeChar: string): number {
  let depth = 0;
  for (let i = openIdx; i < src.length; i++) {
    if (src[i] === openChar) depth++;
    else if (src[i] === closeChar) {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function extractMainAndStaticHelpers(cleaned: string): { mainBody: string; helpers: string } {
  const mainMatch = cleaned.match(/public\s+static\s+void\s+main\s*\([^)]*\)\s*\{/);
  if (!mainMatch || mainMatch.index === undefined) {
    return { mainBody: cleaned, helpers: '' };
  }

  const openBraceIdx = mainMatch.index + mainMatch[0].length - 1;
  const closeBraceIdx = findMatchingDelimiter(cleaned, openBraceIdx, '{', '}');
  const mainBody =
    closeBraceIdx > openBraceIdx
      ? cleaned.substring(openBraceIdx + 1, closeBraceIdx)
      : cleaned.substring(openBraceIdx + 1);

  // Extract static helper methods outside main() inside the same class
  const outsideMain =
    cleaned.substring(0, mainMatch.index) +
    (closeBraceIdx >= 0 ? cleaned.substring(closeBraceIdx + 1) : '');

  const helperChunks: string[] = [];
  const sigRegex =
    /(?:public|private|protected)?\s*static\s+(?:int|double|float|long|boolean|String|char|void)\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*\(([^)]*)\)\s*\{/g;
  let match: RegExpExecArray | null;
  while ((match = sigRegex.exec(outsideMain)) !== null) {
    const methodName = match[1];
    if (methodName === 'main') continue;
    const rawParams = match[2]
      .split(',')
      .map((p) => p.trim().split(/\s+/).pop() || '')
      .filter(Boolean)
      .join(', ');
    const openIdx = match.index + match[0].length - 1;
    const closeIdx = findMatchingDelimiter(outsideMain, openIdx, '{', '}');
    if (closeIdx > openIdx) {
      const body = outsideMain.substring(openIdx + 1, closeIdx);
      helperChunks.push(`function ${methodName}(${rawParams}) {\n${body}\n}`);
      sigRegex.lastIndex = closeIdx + 1;
    }
  }

  return { mainBody, helpers: helperChunks.join('\n') };
}

function rewriteStringEquals(src: string, methodName: 'equals' | 'equalsIgnoreCase'): string {
  let out = '';
  let idx = 0;
  const needle = `.${methodName}(`;
  while (idx < src.length) {
    const hit = src.indexOf(needle, idx);
    if (hit === -1) {
      out += src.slice(idx);
      break;
    }
    // Extract identifier/token immediately before .equals(
    const prefix = src.slice(idx, hit);
    const lhsMatch = prefix.match(/([A-Za-z0-9_$]+|__JSTR_\d+__)\s*$/);
    const openParenIdx = hit + needle.length - 1;
    const closeParenIdx = findMatchingDelimiter(src, openParenIdx, '(', ')');
    if (!lhsMatch || closeParenIdx === -1) {
      out += src.slice(idx, hit + needle.length);
      idx = hit + needle.length;
      continue;
    }
    const lhs = lhsMatch[1];
    const arg = src.slice(openParenIdx + 1, closeParenIdx);
    out += prefix.slice(0, prefix.length - lhsMatch[0].length);
    if (methodName === 'equals') {
      out += `(${lhs} === ${arg})`;
    } else {
      out += `(String(${lhs}).toLowerCase() === String(${arg}).toLowerCase())`;
    }
    idx = closeParenIdx + 1;
  }
  return out;
}

function injectLoopGuards(src: string): string {
  let loopCounterId = 0;
  // First protect do { ... } while (...);
  const result = src.replace(/\bdo\s*\{/g, () => {
    loopCounterId++;
    return `let __guard_${loopCounterId} = 0; do { if (++__guard_${loopCounterId} > 50000) throw new Error("TIMEOUT");`;
  });

  // Protect balanced while (...) { and for (...) { headers
  let cursor = 0;
  let output = '';
  const headerPattern = /\b(while|for)\s*\(/g;
  headerPattern.lastIndex = 0;

  while (true) {
    headerPattern.lastIndex = cursor;
    const match = headerPattern.exec(result);
    if (!match) {
      output += result.slice(cursor);
      break;
    }
    const keyword = match[1];
    const openParen = match.index + match[0].length - 1;
    const closeParen = findMatchingDelimiter(result, openParen, '(', ')');
    if (closeParen === -1) {
      output += result.slice(cursor, openParen + 1);
      cursor = openParen + 1;
      continue;
    }

    // Look ahead past optional whitespace for '{' (note do-while ends with ';', so skipped!)
    let afterParen = closeParen + 1;
    while (afterParen < result.length && /\s/.test(result[afterParen])) afterParen++;
    if (result[afterParen] !== '{') {
      output += result.slice(cursor, closeParen + 1);
      cursor = closeParen + 1;
      continue;
    }

    loopCounterId++;
    const guardDecl = `let __guard_${loopCounterId} = 0; `;
    const guardCheck = ` if (++__guard_${loopCounterId} > 50000) throw new Error("TIMEOUT");`;
    output += result.slice(cursor, match.index);
    output += `${guardDecl}${keyword}${result.slice(match.index + keyword.length, afterParen + 1)}${guardCheck}`;
    cursor = afterParen + 1;
  }

  return output;
}

function splitTopLevelCommas(expr: string): string[] {
  const parts: string[] = [];
  let depthParen = 0;
  let depthBracket = 0;
  let start = 0;
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (ch === '(') depthParen++;
    else if (ch === ')' && depthParen > 0) depthParen--;
    else if (ch === '[') depthBracket++;
    else if (ch === ']' && depthBracket > 0) depthBracket--;
    else if (ch === ',' && depthParen === 0 && depthBracket === 0) {
      parts.push(expr.slice(start, i).trim());
      start = i + 1;
    }
  }
  const tail = expr.slice(start).trim();
  if (tail) parts.push(tail);
  return parts;
}

export function runJavaInterpreter(code: string, stdin = ''): JavaInterpreterResult {
  try {
    let output = '';

    // 1. Strip comments while preserving literals, then mask literals
    const stripped = stripCommentsPreservingLiterals(code);
    const { masked, literals } = maskLiterals(stripped);

    // 2. Extract main body + static helper methods
    const { mainBody, helpers } = extractMainAndStaticHelpers(masked);

    // 3. Prepare Stdin scanner stream
    const stdinLines = stdin.replace(/\r\n/g, '\n').split('\n');
    let stdinIdx = 0;

    const print = (val: unknown) => {
      output += val !== undefined && val !== null ? String(val) : '';
    };

    const println = (val?: unknown) => {
      if (val === undefined || val === null) {
        output += '\n';
      } else {
        output += String(val) + '\n';
      }
    };

    const fmtDouble = (val: unknown): string => {
      if (typeof val === 'number' && Number.isFinite(val) && Number.isInteger(val)) {
        return val.toFixed(1);
      }
      return String(val);
    };

    const scanner = {
      nextLine: () => {
        if (stdinIdx < stdinLines.length) {
          return stdinLines[stdinIdx++];
        }
        return '';
      },
      nextInt: () => {
        const line = stdinIdx < stdinLines.length ? stdinLines[stdinIdx++] : '0';
        return parseInt(line.trim(), 10) || 0;
      },
      nextDouble: () => {
        const line = stdinIdx < stdinLines.length ? stdinLines[stdinIdx++] : '0';
        return parseFloat(line.trim().replace(',', '.')) || 0.0;
      },
      nextBoolean: () => {
        const line = stdinIdx < stdinLines.length ? stdinLines[stdinIdx++] : 'false';
        return line.trim().toLowerCase() === 'true';
      },
      close: () => {},
    };

    const DoubleHelper = {
      parseDouble: (val: unknown) => {
        const s = String(val).trim();
        if (!s || isNaN(Number(s)) || s.includes(',')) {
          throw new Error('NumberFormatException: For input string: "' + s + '"');
        }
        return parseFloat(s);
      },
    };

    const IntegerHelper = {
      parseInt: (val: unknown) => {
        const s = String(val).trim();
        if (!s || isNaN(Number(s)) || s.includes('.') || s.includes(',')) {
          throw new Error('NumberFormatException: For input string: "' + s + '"');
        }
        return parseInt(s, 10);
      },
    };

    const BooleanHelper = {
      parseBoolean: (val: unknown) => String(val).trim().toLowerCase() === 'true',
    };

    // 4. Transform Java syntax cleanly on masked AST text
    let jsCode = helpers ? `${helpers}\n${mainBody}` : mainBody;

    // Transform modern switch case comma labels: case 12, 1, 2: -> case 12: case 1: case 2:
    jsCode = jsCode.replace(/case\s+([^:]+):/g, (_match, group: string) => {
      const items = group
        .split(',')
        .map((s: string) => s.trim())
        .filter(Boolean);
      if (items.length > 1) {
        return items.map((it: string) => `case ${it}:`).join(' ');
      }
      return `case ${group.trim()}:`;
    });

    // Scanner initialization
    jsCode = jsCode.replace(
      /Scanner\s+([A-Za-z0-9_$]+)\s*=\s*new\s+Scanner\([^)]*\)\s*;/g,
      'const $1 = __scanner;'
    );

    // Track floating-point variables across single and multi-variable declarations
    const floatVars = new Set<string>();
    jsCode = jsCode.replace(
      /\bfor\s*\(\s*(int|double|float|long|String|boolean|char)\s+/g,
      (_m, typeName: string) => {
        return `for (/*__TYPE_${typeName}__*/ let `;
      }
    );
    jsCode = jsCode.replace(
      /\b(int|double|String|boolean|float|long|char)\s+(?=[A-Za-z_$][A-Za-z0-9_$]*\s*(?:=|;|,))([^;{}\n]+);/g,
      (_m, typeName: string, declList: string) => {
        const parts = splitTopLevelCommas(declList);
        if (typeName === 'double' || typeName === 'float') {
          for (const part of parts) {
            const nameMatch = part.match(/^([A-Za-z_$][A-Za-z0-9_$]*)/);
            if (nameMatch) floatVars.add(nameMatch[1]);
          }
        }
        return `let ${parts.join(', ')};`;
      }
    );
    // Fallback for loop headers or return statements/casts missed above
    jsCode = jsCode.replace(
      /\/\*__TYPE_(double|float)__\*\/\s*let\s+([A-Za-z_$][A-Za-z0-9_$]*)/g,
      (_m, _t, varName: string) => {
        floatVars.add(varName);
        return `let ${varName}`;
      }
    );
    jsCode = jsCode.replace(/\/\*__TYPE_[A-Za-z]+__\*\/\s*/g, '');

    // Basic Java casts & String.length()
    jsCode = jsCode.replace(/\(int\)\s*(\([^)]+\)|[A-Za-z0-9_$.]+)/g, 'Math.trunc($1)');
    jsCode = jsCode.replace(/\(double\)\s*(\([^)]+\)|[A-Za-z0-9_$.]+)/g, 'Number($1)');
    jsCode = jsCode.replace(/\.length\(\s*\)/g, '.length');

    // System.out.println() / System.out.print()
    jsCode = jsCode.replace(/System\.out\.println\(\s*\);/g, '__println();');
    jsCode = jsCode.replace(/System\.out\.println\(/g, '__println(');
    jsCode = jsCode.replace(/System\.out\.print\(/g, '__print(');

    // Format double/float variables like Java Double.toString ("4.0") when printed or string-concatenated
    for (const v of floatVars) {
      const esc = v.replace(/\$/g, '\\$');
      jsCode = jsCode.replace(
        new RegExp(`__(println|print)\\(\\s*${esc}\\s*\\)`, 'g'),
        `__$1(__fmtD(${v}))`
      );
      jsCode = jsCode.replace(
        new RegExp(`(__JSTR_\\d+__\\s*\\+\\s*)${esc}(?!\\s*[*\\/%])\\b`, 'g'),
        `$1__fmtD(${v})`
      );
    }

    // Helper conversions
    jsCode = jsCode.replace(/String\.valueOf\(/g, 'String(');
    jsCode = jsCode.replace(/Boolean\.parseBoolean\(/g, '__Boolean.parseBoolean(');
    jsCode = jsCode.replace(/Double\.parseDouble\(/g, '__Double.parseDouble(');
    jsCode = jsCode.replace(/Integer\.parseInt\(/g, '__Integer.parseInt(');

    // String comparisons with balanced parens
    jsCode = rewriteStringEquals(jsCode, 'equals');
    jsCode = rewriteStringEquals(jsCode, 'equalsIgnoreCase');

    // Inject timeout guards with balanced parens (while, for, do..while)
    jsCode = injectLoopGuards(jsCode);

    // Unmask literals cleanly and execute inside strict sandboxed scope
    jsCode = `"use strict";\n${unmaskLiterals(jsCode, literals)}`;

    const fn = new Function(
      '__print',
      '__println',
      '__fmtD',
      '__scanner',
      '__Double',
      '__Integer',
      '__Boolean',
      'window',
      'self',
      'globalThis',
      'document',
      'fetch',
      'XMLHttpRequest',
      'WebSocket',
      'importScripts',
      'postMessage',
      'process',
      'global',
      jsCode
    );
    fn(
      print,
      println,
      fmtDouble,
      scanner,
      DoubleHelper,
      IntegerHelper,
      BooleanHelper,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );

    return { success: true, output };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('TIMEOUT')) {
      return {
        success: false,
        isTimeout: true,
        runtimeError:
          '⚠️ Zeitüberschreitung (Endlosschleife): Die Schleife wurde über 50.000 Mal ausgeführt. Achte darauf, dass die Zählvariable verändert wird und die Abbruchbedingung erreicht werden kann!',
      };
    }
    if (msg.includes('NumberFormatException')) {
      return {
        success: false,
        runtimeError: `Exception in thread "main" java.lang.NumberFormatException: ${msg}`,
      };
    }
    return { success: false, runtimeError: msg };
  }
}
