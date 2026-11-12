import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { formatSentenceTiles, isAnswerMatch, normalizeAnswer } from '../src/lib/normalize.ts';

describe('normalizeAnswer & isAnswerMatch', () => {
  it('preserves decimal separators and rejects missing-comma collapse', () => {
    assert.equal(normalizeAnswer('12,5'), normalizeAnswer('12.5'));
    assert.equal(isAnswerMatch('12,5', ['12.5']), true);
    assert.equal(isAnswerMatch('12,5', ['125']), false);
    assert.equal(isAnswerMatch('12.5', ['125']), false);
  });

  it('normalizes German thousands separators before decimal commas', () => {
    assert.equal(isAnswerMatch('2.000,00 €', ['2000.00 €']), true);
    assert.equal(isAnswerMatch('2.000,00', ['2000,00']), true);
    assert.equal(isAnswerMatch('2.000,5', ['2000.5']), true);
  });

  it('handles unambiguous thousands dots (50.000) differently from decimal answers (28,327)', () => {
    assert.equal(isAnswerMatch('50.000', ['50000']), true);
    assert.equal(isAnswerMatch('28327', ['28,327', '28.327']), false);
    assert.equal(isAnswerMatch('28,327', ['28.327']), true);
  });

  it('normalizes unit spacing, equals spacing, and Unicode minus/dashes', () => {
    assert.equal(isAnswerMatch('9m', ['9 m']), true);
    assert.equal(isAnswerMatch('c=13m', ['c = 13 m']), true);
    assert.equal(isAnswerMatch('\u22125', ['-5']), true);
    assert.equal(isAnswerMatch('–3', ['-3']), true);
    assert.equal(isAnswerMatch('—4', ['-4']), true);
  });

  it('preserves decimals when formatting sentence_builder tiles', () => {
    const formatted = formatSentenceTiles(['0,5', 'liter', 'wasser']);
    assert.ok(formatted[0]?.includes('0'), `unexpected tile: ${formatted[0]}`);
    assert.notEqual(formatted[0], '05');
  });
});
