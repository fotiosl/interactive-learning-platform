import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  getDailyUnitBySlug,
  getLatestUnitSummary,
  getProbetestDTO,
  getStudentMetaBySlug,
  getStudentOverviewDTO,
  getStudentRosterDTO,
  getTeacherDashboardDTO,
  sanitizeTaskForStudent,
} from '../src/data/students/index.ts';

describe('public modules DAL & Probetest DTOs', () => {
  it('resolves latest unit chronologically for deutsch-balladen', () => {
    const overview = getStudentOverviewDTO('deutsch-balladen');
    assert.ok(overview, 'deutsch-balladen module should exist');
    const latest = overview.dailyUnits[overview.dailyUnits.length - 1];
    assert.equal(latest?.date, '02.01.2026');

    const teacherRows = getTeacherDashboardDTO();
    const balladenRow = teacherRows.find((r) => r.slug === 'deutsch-balladen');
    assert.ok(balladenRow);
    assert.equal(balladenRow.latestUnitDate, '02.01.2026');

    const meta = getStudentMetaBySlug('deutsch-balladen');
    assert.ok(meta);
    assert.equal(getLatestUnitSummary(meta)?.date, '02.01.2026');
  });

  it('includes taskId on ProbetestTopicDTO and exposes rechnung tasks in mathematik Modul 2', () => {
    const roster = getStudentRosterDTO();
    assert.equal(roster.length, 14);
    const probetest = getProbetestDTO('mathematik-statistik-geometrie');
    assert.ok(probetest);
    assert.ok(probetest.topics.length > 0);
    for (const topic of probetest.topics) {
      assert.ok(topic.taskId, 'topic.taskId must be populated');
      for (const q of topic.questions) {
        assert.ok(q.taskId, 'question.taskId must be populated');
        if (q.hideSampleSolution) {
          assert.equal(q.sampleSolution, undefined);
        }
      }
    }

    const modul2 = getDailyUnitBySlug('mathematik-statistik-geometrie', '02-01-2026');
    assert.ok(modul2);
    assert.equal(modul2.tasks.length, 4);
    assert.ok(modul2.tasks.every((t) => t.type === 'rechnung'));
    assert.ok(modul2.tasks.every((t) => !t.image && (!t.images || t.images.length === 0)));
  });

  it('sanitizeTaskForStudent strips teacher-only fields and hidden sample solutions', () => {
    const sanitized = sanitizeTaskForStudent({
      id: 't-1',
      topicSlug: 'test',
      title: 'Test',
      subject: 'Mathematik',
      date: '01.01.2026',
      topic: 'Test',
      description: 'Desc',
      type: 'input',
      teacherSolutionImage: {
        src: '/teacher/secret.png',
        alt: 'Secret',
        title: 'Secret',
      },
      hideSampleSolution: true,
      inputQuestions: [
        {
          id: 'q1',
          prompt: 'Wie viel?',
          correctAnswers: ['5'],
          sampleSolution: 'Geheimer Rechenweg',
        },
      ],
    });

    assert.equal('teacherSolutionImage' in sanitized, false);
    assert.equal(sanitized.inputQuestions?.[0]?.sampleSolution, undefined);
  });

  it('reloads cached unit files when mtimeMs changes on disk', () => {
    const unitPath = path.join(process.cwd(), 'src/data/students/informatik/unit-01-01-2026.json');
    const originalBuf = fs.readFileSync(unitPath);
    const originalStat = fs.statSync(unitPath);
    try {
      const parsed = JSON.parse(originalBuf.toString('utf8'));
      const originalTitle = parsed.tasks[0].title;
      parsed.tasks[0].title = `${originalTitle} [LIVE-RELOAD-TEST]`;
      fs.writeFileSync(unitPath, JSON.stringify(parsed, null, 2), 'utf8');
      const futureTime = new Date(originalStat.mtimeMs + 5000);
      fs.utimesSync(unitPath, futureTime, futureTime);

      const reloaded = getDailyUnitBySlug('informatik-java', '01-01-2026');
      assert.ok(reloaded);
      assert.ok(reloaded.tasks.some((t) => t.title.includes('[LIVE-RELOAD-TEST]')));
    } finally {
      fs.writeFileSync(unitPath, originalBuf);
      fs.utimesSync(unitPath, originalStat.atime, originalStat.mtime);
    }
  });
});
