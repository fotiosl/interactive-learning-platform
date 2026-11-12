import { NextRequest, NextResponse } from 'next/server';
import { execFile } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const MAX_CODE_CHARS = 20_000;
const MAX_STDIN_CHARS = 10_000;

function decodeJavaUnicodeEscapes(source: string): string {
  return source.replace(/\\u+([0-9a-fA-F]{4})/g, (_match, hex: string) =>
    String.fromCharCode(parseInt(hex, 16))
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawCode = typeof body?.code === 'string' ? body.code.trim() : '';
    const stdin = typeof body?.stdin === 'string' ? body.stdin : '';

    if (!rawCode) {
      return NextResponse.json(
        { success: false, error: 'Kein Code zum Ausführen übergeben.' },
        { status: 400 }
      );
    }

    if (rawCode.length > MAX_CODE_CHARS || stdin.length > MAX_STDIN_CHARS) {
      return NextResponse.json(
        {
          success: false,
          error: 'Eingabe überschreitet die maximal zulässige Größe für Übungsprogramme.',
        },
        { status: 400 }
      );
    }

    // Normalize Java unicode escapes (\uXXXX) before checking disallowed APIs
    const normalizedForSafety = decodeJavaUnicodeEscapes(rawCode);
    const dangerousPatterns = [
      /ProcessBuilder/i,
      /Runtime\.getRuntime/i,
      /java\.nio/i,
      /java\.io\.(?:File|RandomAccessFile|FileInputStream|FileOutputStream|Files)/i,
      /java\.net/i,
      /java\.lang\.reflect/i,
      /MethodHandles/i,
      /ScriptEngine/i,
      /System\.(?:exit|getenv|setProperty|setSecurityManager|load|loadLibrary)/i,
      /Class\.forName/i,
      /ClassLoader/i,
      /getMethod/i,
      /getDeclaredField/i,
      /getDeclaredMethod/i,
      /sun\.misc\.Unsafe/i,
      /jdk\.internal/i,
    ];

    if (
      dangerousPatterns.some(
        (pattern) => pattern.test(rawCode) || pattern.test(normalizedForSafety)
      )
    ) {
      return NextResponse.json({
        success: false,
        error:
          '⚠️ Hinweis: Aus Sicherheitsgründen sind Datei-, System-, Netzwerk- und Reflexionszugriffe in dieser Übungsumgebung deaktiviert.',
      });
    }

    // 1. Production Sandbox Container API (e.g. Docker Piston/Judge0)
    const sandboxUrl = process.env.JAVA_SANDBOX_URL;
    if (sandboxUrl) {
      try {
        const sandboxRes = await fetch(sandboxUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(8000),
          body: JSON.stringify({
            language: 'java',
            version: '21',
            files: [{ name: 'Main.java', content: rawCode }],
            stdin,
          }),
        });

        if (sandboxRes.ok) {
          const resData = await sandboxRes.json();
          if (resData?.compile && resData.compile.code !== 0) {
            return NextResponse.json({
              success: false,
              compileError:
                resData.compile.stderr ||
                resData.compile.stdout ||
                'Kompilierfehler in der Java-Sandbox.',
            });
          }

          const run = resData?.run || resData;
          const isTimeout =
            run?.signal === 'SIGKILL' ||
            run?.signal === 'SIGTERM' ||
            run?.code === 137 ||
            run?.code === 124;
          if (isTimeout) {
            return NextResponse.json({
              success: false,
              isTimeout: true,
              runtimeError:
                '⚠️ Zeitüberschreitung (Timeout): Dein Programm lief in der Sandbox zu lange (mögliche Endlosschleife).',
            });
          }
          if (run?.stderr && run.code !== 0) {
            return NextResponse.json({
              success: false,
              runtimeError: run.stderr,
              output: run.stdout || '',
            });
          }
          return NextResponse.json({
            success: true,
            output: run?.stdout || '',
          });
        }
      } catch {
        // Fall through to client worker delegation in production
      }
    }

    // 2. Security boundary: NEVER run the TypeScript JS-based Java interpreter on Node.js.
    // Whenever no isolated container is available in production or interpreter mode is forced,
    // instruct the client to execute safely inside its sandboxed Browser Web Worker.
    const forceClientWorker =
      process.env.JAVA_RUNNER_MODE === 'interpreter' ||
      (process.env.NODE_ENV === 'production' && !sandboxUrl);

    if (forceClientWorker) {
      return NextResponse.json(
        {
          success: false,
          useClientWorker: true,
          error:
            'Keine isolierte Java-Server-Sandbox aktiv – Ausführung wird in den Browser-Worker verlagert.',
        },
        { status: 503 }
      );
    }

    // 3. Local Development Mode: Compile and run with resource caps via local JDK
    let fullCode = rawCode;
    let className = 'Main';
    const classMatch = rawCode.match(/(?:public\s+)?class\s+([A-Za-z0-9_$]+)/);

    if (classMatch) {
      className = classMatch[1];
      if (!/^[A-Za-z_$][A-Za-z0-9_$]{0,63}$/.test(className)) {
        return NextResponse.json(
          { success: false, compileError: 'Ungültiger Klassenname.' },
          { status: 400 }
        );
      }
    } else if (!rawCode.includes('class ')) {
      fullCode = `public class Main {\n    public static void main(String[] args) {\n${rawCode}\n    }\n}`;
      className = 'Main';
    }

    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'java-run-'));
    const resolvedTempDir = path.resolve(tempDir);
    const sourceFilePath = path.resolve(resolvedTempDir, `${className}.java`);
    if (!sourceFilePath.startsWith(resolvedTempDir + path.sep)) {
      fs.rmSync(resolvedTempDir, { recursive: true, force: true });
      return NextResponse.json(
        { success: false, compileError: 'Ungültiger Dateipfad für die Java-Klasse.' },
        { status: 400 }
      );
    }

    try {
      fs.writeFileSync(sourceFilePath, fullCode, 'utf-8');

      // Compile with UTF-8
      const compilePromise = new Promise<{ success: boolean; stderr?: string }>((resolve) => {
        execFile(
          'javac',
          ['-encoding', 'UTF-8', `${className}.java`],
          { cwd: resolvedTempDir, timeout: 5000 },
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
          .replace(new RegExp(escapeRegExp(resolvedTempDir), 'g'), '')
          .trim();

        // If javac command was not found locally, let the browser run it in the client Web Worker
        if (
          cleanErr.includes('not recognized') ||
          cleanErr.includes('command not found') ||
          cleanErr.includes('ENOENT') ||
          cleanErr.includes('spawn')
        ) {
          return NextResponse.json(
            {
              success: false,
              useClientWorker: true,
              error:
                'Lokales JDK (javac) nicht verfügbar – Ausführung wird in den Browser-Worker verlagert.',
            },
            { status: 503 }
          );
        }

        return NextResponse.json({
          success: false,
          compileError:
            cleanErr ||
            'Kompilierfehler: Bitte überprüfe deine Syntax (z. B. Semikolons oder Klammern).',
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
          { cwd: resolvedTempDir, timeout: 4500, maxBuffer: 128 * 1024 },
          (err, stdout, stderr) => {
            if (err) {
              const isTimeout =
                err.killed || err.signal === 'SIGTERM' || err.message.includes('TIMEDOUT');
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
        fs.rmSync(resolvedTempDir, { recursive: true, force: true });
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
