import fs from 'node:fs';
import path from 'node:path';

import type { FullResult, Reporter, Suite, TestCase } from '@playwright/test/reporter';

/**
 * Builds a role × page matrix from the access tests, plus a list of every other test.
 * Writes index.html and summary.md to `outputFolder`, and appends the Markdown to the
 * GitHub Actions run summary when GITHUB_STEP_SUMMARY is set.
 */

type Status = 'passed' | 'failed' | 'flaky' | 'skipped' | 'not run';

type Row = {
  id: string;
  group: string;
  title: string;
  status: Status;
  duration: number;
  error?: string;
  reason?: string;
};

type Cell = Row & { expectation: 'Open' | 'Blocked' | 'Shown' };

type Options = { outputFolder?: string; htmlReport?: string };

const ICON: Record<Status, string> = {
  'passed': '✅',
  'failed': '❌',
  'flaky': '⚠️',
  'skipped': '⏭️',
  'not run': '➖',
};

const ACCOUNT_TITLE = /^(\w+) \((\w+)\)$/;
const PAGE_TITLE = /^(can|cannot) open (.+)$/;
const NAV_ROW = 'Service navigation';

// eslint-disable-next-line no-control-regex
const stripAnsi = (text: string) => text.replace(/\u001B\[[0-9;]*m/g, '');
const firstLine = (text?: string) => text && stripAnsi(text).split('\n').find(l => l.trim())?.trim();
const escapeHtml = (text: string) => text.replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);
const escapeMd = (text: string) => text.replace(/\|/g, '\\|').replace(/\n/g, ' ');
const spaced = (key: string) => key.replace(/([a-z])([A-Z])/g, '$1 $2');
const seconds = (ms: number) => `${(ms / 1000).toFixed(1)}s`;

function statusOf(test: TestCase): Status {
  if (!test.results.length) {
    return 'not run';
  }
  return ({ expected: 'passed', unexpected: 'failed', flaky: 'flaky', skipped: 'skipped' } as const)[test.outcome()];
}

export default class MatrixReporter implements Reporter {
  private suite?: Suite;
  private readonly outputFolder: string;
  private readonly htmlReport: string;

  constructor(options: Options = {}) {
    this.outputFolder = path.resolve(options.outputFolder ?? 'playwright-report/matrix');
    this.htmlReport = options.htmlReport ?? '../deployed/index.html';
  }

  onBegin(_config: unknown, suite: Suite) {
    this.suite = suite;
  }

  printsToStdio() {
    return false;
  }

  async onEnd(result: FullResult) {
    if (!this.suite) {
      return;
    }

    const accounts = new Map<string, string>();
    const pages: string[] = [];
    const matrix = new Map<string, Map<string, Cell>>();
    const others: Row[] = [];

    for (const test of this.suite.allTests()) {
      const [, project = '', file = '', ...titles] = test.titlePath();
      const last = test.results.at(-1);
      const reason = test.annotations.find(a => a.type === 'skip')?.description;
      const row: Row = {
        id: test.id,
        group: project,
        title: [path.basename(file), ...titles].join(' › '),
        status: statusOf(test),
        duration: test.results.reduce((sum, r) => sum + r.duration, 0),
        error: firstLine(last?.error?.message),
        reason,
      };

      const account = titles[0]?.match(ACCOUNT_TITLE);
      if (project === 'access' && account) {
        accounts.set(account[1]!, account[2]!);
        const page = titles[1]?.match(PAGE_TITLE);
        const key = page ? page[2]! : NAV_ROW;
        if (!pages.includes(key)) {
          pages.push(key);
        }
        if (!matrix.has(key)) {
          matrix.set(key, new Map());
        }
        matrix.get(key)!.set(account[1]!, { ...row, expectation: page ? (page[1] === 'can' ? 'Open' : 'Blocked') : 'Shown' });
      } else {
        others.push(row);
      }
    }

    const all = [...[...matrix.values()].flatMap(m => [...m.values()]), ...others];
    const counts = Object.fromEntries((Object.keys(ICON) as Status[]).map(s => [s, all.filter(r => r.status === s).length])) as Record<Status, number>;
    const report = { result, accounts, pages: [NAV_ROW, ...pages.filter(p => p !== NAV_ROW)].filter(p => matrix.has(p)), matrix, others, counts };

    fs.mkdirSync(this.outputFolder, { recursive: true });
    const markdown = this.markdown(report);
    fs.writeFileSync(path.join(this.outputFolder, 'summary.md'), markdown);
    fs.writeFileSync(path.join(this.outputFolder, 'index.html'), this.html(report));
    if (process.env.GITHUB_STEP_SUMMARY) {
      fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${markdown}\n`);
    }
  }

  private markdown({ result, accounts, pages, matrix, others, counts }: ReportData): string {
    const keys = [...accounts.keys()];
    const lines: string[] = [];
    lines.push('# End-to-end test results', '');
    lines.push(`**${result.status === 'passed' ? 'Passed' : 'Failed'}** in ${seconds(result.duration)}: ${(Object.keys(ICON) as Status[]).map(s => `${ICON[s]} ${counts[s]} ${s}`).join(' · ')}`, '');

    if (keys.length) {
      lines.push('## Role access', '');
      lines.push('**Open**: the role should be able to open the page. **Blocked**: it should get Page not found or 403. The icon shows whether that held.', '');
      lines.push(`| Page | ${keys.map(spaced).join(' | ')} |`);
      lines.push(`| --- | ${keys.map(() => ':---:').join(' | ')} |`);
      for (const page of pages) {
        const cells = keys.map((key) => {
          const cell = matrix.get(page)?.get(key);
          return cell ? `${ICON[cell.status]} ${cell.expectation}` : '';
        });
        lines.push(`| \`${page}\` | ${cells.join(' | ')} |`);
      }
      lines.push('');
    }

    const failures = [...[...matrix.values()].flatMap(m => [...m.values()]), ...others].filter(r => r.status === 'failed' || r.status === 'flaky');
    if (failures.length) {
      lines.push('## Failures', '');
      lines.push('| | Group | Test | Error |', '| --- | --- | --- | --- |');
      for (const r of failures) {
        lines.push(`| ${ICON[r.status]} | ${r.group} | ${escapeMd(r.title)} | ${escapeMd(r.error ?? '')} |`);
      }
      lines.push('');
    }

    lines.push('## Other tests', '');
    for (const [group, rows] of groupBy(others)) {
      const summary = (Object.keys(ICON) as Status[]).filter(s => rows.some(r => r.status === s)).map(s => `${ICON[s]} ${rows.filter(r => r.status === s).length}`).join(' ');
      lines.push(`<details><summary><b>${group}</b> ${summary}</summary>`, '');
      lines.push('| | Test | Time | Note |', '| --- | --- | --- | --- |');
      for (const r of rows) {
        lines.push(`| ${ICON[r.status]} | ${escapeMd(r.title)} | ${seconds(r.duration)} | ${escapeMd(r.error ?? r.reason ?? '')} |`);
      }
      lines.push('', '</details>', '');
    }

    return lines.join('\n');
  }

  private html({ result, accounts, pages, matrix, others, counts }: ReportData): string {
    const keys = [...accounts.keys()];
    const link = (r: Row, body: string) => `<a href="${this.htmlReport}#?testId=${r.id}">${body}</a>`;
    const note = (r: Row) => escapeHtml(r.error ?? r.reason ?? '');

    const matrixRows = pages.map((page) => {
      const cells = keys.map((key) => {
        const cell = matrix.get(page)?.get(key);
        if (!cell) {
          return '<td></td>';
        }
        return `<td class="s-${cell.status.replace(' ', '-')}" title="${note(cell)}">${link(cell, `${ICON[cell.status]} ${cell.expectation}`)}</td>`;
      });
      return `<tr><th scope="row"><code>${escapeHtml(page)}</code></th>${cells.join('')}</tr>`;
    }).join('\n');

    const groups = [...groupBy(others)].map(([group, rows]) => `
      <h2>${escapeHtml(group)}</h2>
      <table class="list">
        <thead><tr><th></th><th>Test</th><th>Time</th><th>Note</th></tr></thead>
        <tbody>${rows.map(r => `<tr class="s-${r.status.replace(' ', '-')}"><td>${ICON[r.status]}</td><td>${link(r, escapeHtml(r.title))}</td><td>${seconds(r.duration)}</td><td>${note(r)}</td></tr>`).join('')}</tbody>
      </table>`).join('\n');

    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>End-to-end results</title>
<style>
  :root { --blue: #1B1E56; --text: #3D454B; --pass: #065252; --fail: #F65244; --flaky: #FDDE7A; --skip: #CCCDC1; --line: #EFEFEF; }
  body { margin: 0; padding: 24px 16px; font: 14px/1.5 Arial, sans-serif; color: var(--text); background: #FFFFFF; }
  h1, h2 { font-family: Georgia, serif; color: var(--blue); }
  .summary span { margin-right: 16px; }
  .wrap { overflow-x: auto; max-width: 100%; }
  table { border-collapse: collapse; margin-bottom: 32px; }
  th, td { border: 1px solid var(--line); padding: 4px 8px; text-align: left; vertical-align: top; }
  .matrix thead th { position: sticky; top: 0; background: #FFFFFF; font-size: 12px; writing-mode: vertical-rl; transform: rotate(180deg); white-space: nowrap; }
  .matrix th[scope=row] { position: sticky; left: 0; background: #FFFFFF; white-space: nowrap; }
  .matrix td { text-align: center; white-space: nowrap; }
  a { color: inherit; text-decoration: none; }
  a:hover { text-decoration: underline; }
  td.s-passed { background: color-mix(in srgb, var(--pass) 12%, white); }
  td.s-failed, tr.s-failed { background: color-mix(in srgb, var(--fail) 22%, white); }
  td.s-flaky, tr.s-flaky { background: color-mix(in srgb, var(--flaky) 45%, white); }
  td.s-skipped, tr.s-skipped, td.s-not-run, tr.s-not-run { background: color-mix(in srgb, var(--skip) 35%, white); }
  .list td:nth-child(4) { max-width: 640px; }
</style>
</head>
<body>
<h1>End-to-end test results</h1>
<p class="summary"><strong>${result.status === 'passed' ? 'Passed' : 'Failed'}</strong> in ${seconds(result.duration)} &nbsp; ${(Object.keys(ICON) as Status[]).map(s => `<span>${ICON[s]} ${counts[s]} ${s}</span>`).join('')}</p>
<p>Select any result to open it in the full Playwright report, with its screenshot and trace.</p>
${keys.length
  ? `<h2>Role access</h2>
<p><strong>Open</strong>: the role should be able to open the page. <strong>Blocked</strong>: it should get Page not found or 403. The icon shows whether that held. Hover a cell for the error or skip reason.</p>
<div class="wrap"><table class="matrix">
<thead><tr><th>Page</th>${keys.map(k => `<th title="${accounts.get(k)}">${spaced(k)}</th>`).join('')}</tr></thead>
<tbody>${matrixRows}</tbody>
</table></div>`
  : ''}
${groups}
</body>
</html>
`;
  }
}

type ReportData = {
  result: FullResult;
  accounts: Map<string, string>;
  pages: string[];
  matrix: Map<string, Map<string, Cell>>;
  others: Row[];
  counts: Record<Status, number>;
};

function groupBy(rows: Row[]): Map<string, Row[]> {
  const groups = new Map<string, Row[]>();
  for (const row of rows) {
    groups.set(row.group, [...(groups.get(row.group) ?? []), row]);
  }
  return groups;
}
