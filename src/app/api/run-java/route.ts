import { NextRequest, NextResponse } from 'next/server';
import { execFile } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { runJavaInterpreter } from '@/lib/javaInterpreter';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawCode = typeof body?.code === 'string' ? body.code.trim() : '';
    const stdin = typeof body?.stdin === 'string' ? body.stdin : '';

    if (!rawCode) {
      return NextResponse.json({ success: false, error: 'Kein Code zum Ausführen übergeben.' }, { status: 400 });
    }

    // Safety checks against system, network, and reflection execution in student code
    const dangerousPatterns = [
      /ProcessBuilder/i,
      /Runtime\.getRuntime/i,
      /java\.nio/i,
      /java\.io\.(?:File|RandomAccessFile|FileInputStream|FileOutputStream)/i,
      /java\.net/i,
      /System\.exit/i,
      /Class\.forName/i,
      /ClassLoader/i,
      /getMethod/i,
      /getDeclaredField/i,
      /getDeclaredMethod/i,
      /sun\.misc\.Unsafe/i,
    ];

    if (dangerousPatterns.some((pattern) => pattern.test(rawCode))) {
      return NextResponse.json({
        success: false,
        error: '⚠️ Hinweis: Aus Sicherheitsgründen sind Datei-, System-, Netzwerk- und Reflexionszugriffe in dieser Übungsumgebung deaktiviert.',
      });
    }

    // 1. Long-Term Production Option: Remote Sandbox Container API (e.g. Docker Piston/Judge0)
    const sandboxUrl = process.env.JAVA_SANDBOX_URL;
    if (sandboxUrl) {
      try {
        const sandboxRes = await fetch(sandboxUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: 'java',
            version: '21',
            files: [{ name: 'Main.java', content: rawCode }],
            stdin,
          }),
        });

        if (sandboxRes.ok) {
          const resData = await sandboxRes.json();
          const run = resData?.run || resData;
          if (run.stderr && run.code !== 0) {
            return NextResponse.json({
              success: false,
              runtimeError: run.stderr,
              output: run.stdout || '',
            });
          }
          return NextResponse.json({
            success: true,
            output: run.stdout || '',
          });
        }
      } catch {
        // Fallback to local or interpreter if sandbox endpoint is unreachable
      }
    }

    // 2. Production Mode Security: If in production and no isolated container is configured,
    // execute safely using the in-memory TypeScript Java interpreter (prevents host RCE)
    const forceInterpreter =
      process.env.JAVA_RUNNER_MODE === 'interpreter' ||
      (process.env.NODE_ENV === 'production' && !sandboxUrl);

    if (forceInterpreter) {
      const fallback = runJavaInterpreter(rawCode, stdin);
      if (fallback.isTimeout) {
        return NextResponse.json({
          success: false,
          isTimeout: true,
          runtimeError: fallback.runtimeError,
        });
      }
      if (fallback.success) {
        return NextResponse.json({ success: true, output: fallback.output || '' });
      }
      return NextResponse.json({
        success: false,
        runtimeError: fallback.runtimeError,
        compileError: fallback.compileError,
      });
    }

    // 3. Local Development Mode: Compile and run with resource caps
    let fullCode = rawCode;
    let className = 'Main';
    const classMatch = rawCode.match(/(?:public\s+)?class\s+([A-Za-z0-9_$]+)/);

    if (classMatch) {
      className = classMatch[1];
    } else if (!rawCode.includes('class ')) {
      fullCode = `public class Main {\n    public static void main(String[] args) {\n${rawCode}\n    }\n}`;
      className = 'Main';
    }

    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'java-run-'));
    const sourceFilePath = path.join(tempDir, `${className}.java`);

    try {
      fs.writeFileSync(sourceFilePath, fullCode, 'utf-8');

      // Compile with UTF-8
      const compilePromise = new Promise<{ success: boolean; stderr?: string }>((resolve) => {
        execFile(
          'javac',
          ['-encoding', 'UTF-8', `${className}.java`],
          { cwd: tempDir, timeout: 5000, shell: true },
          (err, _stdout, stderr) => {
            if (err) {
              resolve({ success: false, stderr: stderr || err.message });
            } else {
              resolve({ success: true });
            }
          }
        );
      });

      const compileRes = await compilePromise;

      if (!compileRes.success) {
        const cleanErr = (compileRes.stderr || '')
          .replace(new RegExp(escapeRegExp(sourceFilePath), 'g'), `${className}.java`)
          .replace(new RegExp(escapeRegExp(tempDir), 'g'), '')
          .trim();

        // If javac command was not found, fallback to interpreter
        if (
          cleanErr.includes('not recognized') ||
          cleanErr.includes('command not found') ||
          cleanErr.includes('ENOENT') ||
          cleanErr.includes('spawn')
        ) {
          const fallback = runJavaInterpreter(rawCode, stdin);
          if (fallback.isTimeout) {
            return NextResponse.json({
              success: false,
              isTimeout: true,
              runtimeError: fallback.runtimeError,
            });
          }
          if (fallback.success) {
            return NextResponse.json({ success: true, output: fallback.output || '' });
          }
          return NextResponse.json({
            success: false,
            runtimeError: fallback.runtimeError,
            compileError: fallback.compileError || cleanErr,
          });
        }

        return NextResponse.json({
          success: false,
          compileError: cleanErr || 'Kompilierfehler: Bitte überprüfe deine Syntax (z. B. Semikolons oder Klammern).',
        });
      }

      // Run bytecode with strict memory cap (-Xmx64m) and CPU limits
      const runPromise = new Promise<{
        success: boolean;
        stdout?: string;
        stderr?: string;
        isTimeout?: boolean;
      }>((resolve) => {
        const child = execFile(
          'java',
          ['-Dfile.encoding=UTF-8', '-Xmx64m', '-Xms16m', '-XX:+UseSerialGC', className],
          { cwd: tempDir, timeout: 4500, maxBuffer: 128 * 1024, shell: true },
          (err, stdout, stderr) => {
            if (err) {
              const isTimeout = err.killed || err.signal === 'SIGTERM' || err.message.includes('TIMEDOUT');
              resolve({
                success: false,
                stdout,
                stderr: stderr || err.message,
                isTimeout,
              });
            } else {
              resolve({ success: true, stdout, stderr });
            }
          }
        );

        if (stdin) {
          child.stdin?.write(stdin);
        }
        child.stdin?.end();
      });

      const runRes = await runPromise;

      if (runRes.isTimeout) {
        return NextResponse.json({
          success: false,
          isTimeout: true,
          runtimeError:
            '⚠️ Zeitüberschreitung (Timeout): Dein Programm lief länger als 4 Sekunden.\n\nSehr wahrscheinlich hast du eine Endlosschleife erzeugt!\nPrüfe, ob deine while-Bedingung jemals falsch wird und ob du die Zählvariable (z. B. i++) in jedem Schleifendurchlauf veränderst.',
        });
      }

      if (!runRes.success) {
        return NextResponse.json({
          success: false,
          runtimeError: runRes.stderr || 'Laufzeitfehler bei der Programmausführung.',
          output: runRes.stdout || '',
        });
      }

      return NextResponse.json({
        success: true,
        output: runRes.stdout || '',
      });
    } finally {
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
      } catch {
        // Ignore cleanup error
      }
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unerwarteter Serverfehler';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
