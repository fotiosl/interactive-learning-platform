/**
 * High-fidelity lightweight Java interpreter for beginner educational tasks.
 * Executes Java code (Scanner, System.out.print/println, int/double/String/boolean,
 * math, if/else, switch/case, while/for loops) directly in JavaScript/TypeScript environments
 * without requiring JDK or native process spawning (e.g. Vercel serverless or client-side).
 */

export interface JavaInterpreterResult {
  success: boolean;
  output?: string;
  compileError?: string;
  runtimeError?: string;
  isTimeout?: boolean;
}

export function runJavaInterpreter(code: string, stdin = ''): JavaInterpreterResult {
  try {
    let output = '';

    // 1. Strip comments while preserving strings
    let cleaned = code.replace(/\/\*[\s\S]*?\*\//g, '');
    const lines = cleaned.split('\n').map((line) => {
      let inString = false;
      for (let i = 0; i < line.length - 1; i++) {
        if (line[i] === '"' && (i === 0 || line[i - 1] !== '\\')) {
          inString = !inString;
        }
        if (!inString && line[i] === '/' && line[i + 1] === '/') {
          return line.substring(0, i);
        }
      }
      return line;
    });
    cleaned = lines.join('\n');

    // 2. Extract main method body if wrapped in class/main
    const mainMatch = cleaned.match(/public\s+static\s+void\s+main\s*\([^)]*\)\s*\{/);
    let mainBody = cleaned;
    if (mainMatch && mainMatch.index !== undefined) {
      const startIdx = mainMatch.index + mainMatch[0].length;
      let braceCount = 1;
      let endIdx = startIdx;
      while (endIdx < cleaned.length && braceCount > 0) {
        if (cleaned[endIdx] === '{') braceCount++;
        else if (cleaned[endIdx] === '}') braceCount--;
        endIdx++;
      }
      mainBody = cleaned.substring(startIdx, endIdx - 1);
    }

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

    // 4. Transform Java code to JS
    let jsCode = mainBody;

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

    // Variable declarations
    jsCode = jsCode.replace(
      /\b(int|double|String|boolean|float|long|char)\s+([A-Za-z0-9_$]+)/g,
      'let $2'
    );

    // System.out.println() without arguments
    jsCode = jsCode.replace(/System\.out\.println\(\s*\);/g, '__println();');
    // System.out.println(args)
    jsCode = jsCode.replace(/System\.out\.println\(/g, '__println(');
    // System.out.print(args)
    jsCode = jsCode.replace(/System\.out\.print\(/g, '__print(');

    // Helper conversions
    jsCode = jsCode.replace(/String\.valueOf\(/g, 'String(');
    jsCode = jsCode.replace(/Boolean\.parseBoolean\(/g, '__Boolean.parseBoolean(');
    jsCode = jsCode.replace(/Double\.parseDouble\(/g, '__Double.parseDouble(');
    jsCode = jsCode.replace(/Integer\.parseInt\(/g, '__Integer.parseInt(');

    // String comparisons: .equals and .equalsIgnoreCase
    jsCode = jsCode.replace(/([A-Za-z0-9_$]+)\.equals\(([^)]+)\)/g, '($1 === $2)');
    jsCode = jsCode.replace(
      /([A-Za-z0-9_$]+)\.equalsIgnoreCase\(([^)]+)\)/g,
      '(String($1).toLowerCase() === String($2).toLowerCase())'
    );

    // Protect while loops with loop guard
    let loopCounterId = 0;
    jsCode = jsCode.replace(/\bwhile\s*\(([^)]+)\)\s*\{/g, (_m, cond) => {
      loopCounterId++;
      return `let __guard_${loopCounterId} = 0; while (${cond}) { if (++__guard_${loopCounterId} > 50000) throw new Error("TIMEOUT");`;
    });

    // Protect for loops with loop guard
    jsCode = jsCode.replace(/\bfor\s*\(([^;]+);([^;]+);([^)]+)\)\s*\{/g, (_m, init, cond, step) => {
      loopCounterId++;
      return `let __guard_${loopCounterId} = 0; for (${init}; ${cond}; ${step}) { if (++__guard_${loopCounterId} > 50000) throw new Error("TIMEOUT");`;
    });

    // Execute generated function
    const fn = new Function(
      '__print',
      '__println',
      '__scanner',
      '__Double',
      '__Integer',
      '__Boolean',
      jsCode
    );
    fn(print, println, scanner, DoubleHelper, IntegerHelper, BooleanHelper);

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
