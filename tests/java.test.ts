import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { runJavaInterpreter } from '../src/lib/javaInterpreter.ts';
import { checkOutputMatch } from '../src/lib/javaOutputMatch.ts';

describe('javaInterpreter', () => {
  it('ignores comment markers inside string literals', () => {
    const code = `
      public class Test {
        public static void main(String[] args) {
          System.out.println("https://example.com // not a comment /* stay */");
        }
      }
    `;
    const res = runJavaInterpreter(code);
    assert.equal(res.success, true);
    assert.equal(res.runtimeError, undefined);
    assert.equal(res.output?.trim(), 'https://example.com // not a comment /* stay */');
  });

  it('supports Scanner nextLine and multi-variable declarations with method calls', () => {
    const code = `
      import java.util.Scanner;
      public class HalloWelt {
        public static void main(String[] args) {
          Scanner sc = new Scanner(System.in);
          String vorname = sc.nextLine();
          double a = 1.5, b = 2.5;
          int x = 3, y = 4;
          System.out.println("Hallo " + vorname + ": " + (a + b) + " / " + (x + y));
        }
      }
    `;
    const res = runJavaInterpreter(code, 'Alex\n');
    assert.equal(res.success, true);
    assert.equal(res.runtimeError, undefined);
    assert.equal(res.output?.trim(), 'Hallo Alex: 4 / 7');
  });

  it('protects against infinite do..while loops via loop guard', () => {
    const code = `
      public class LoopTest {
        public static void main(String[] args) {
          int i = 0;
          do {
            i++;
          } while (true);
        }
      }
    `;
    const res = runJavaInterpreter(code);
    assert.equal(res.success, false);
    assert.equal(res.isTimeout, true);
    assert.ok(res.runtimeError, 'expected timeout/loop guard error');
  });

  it('handles nested parentheses in String.equals and static helper methods', () => {
    const code = `
      public class HelperDemo {
        public static int addiere(int a, int b) {
          return a + b;
        }
        public static void main(String[] args) {
          String s = "ok";
          boolean match = s.equals(("o" + "k").trim());
          int sum = addiere(6, 7);
          System.out.println(match + ":" + sum);
        }
      }
    `;
    const res = runJavaInterpreter(code);
    assert.equal(res.success, true);
    assert.equal(res.runtimeError, undefined);
    assert.equal(res.output?.trim(), 'true:13');
  });
});

describe('checkOutputMatch', () => {
  it('matches whole numbers and German comma decimals without substring false positives', () => {
    assert.equal(checkOutputMatch('Ergebnis: 100', '10'), false);
    assert.equal(checkOutputMatch('Ergebnis: 100', '100'), true);
    assert.equal(checkOutputMatch('12.5', '12,5'), true);
    assert.equal(checkOutputMatch('Summe: 42', '42'), true);
  });
});
