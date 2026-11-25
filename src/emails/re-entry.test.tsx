// @vitest-environment node
import { render } from '@react-email/render';
import { describe, expect, it, vi } from 'vitest';

import ReEntryEmail from './re-entry';
import ReEntryClosedownEmail from './re-entry-closedown';

vi.hoisted(() => {
  process.env.SKIP_ENV_VALIDATION = 'true';
});

const SHARED_DEFAULT = 'Shared default summary';

const TEMPLATES = [
  ['re-entry', ReEntryEmail],
  ['re-entry closedown', ReEntryClosedownEmail],
] as const;

const renderEmail = (Template: (typeof TEMPLATES)[number][1], assessment: string | null) => {
  const { PreviewProps } = Template;
  const props = {
    ...PreviewProps,
    level: 2,
    assessment,
    event: { ...PreviewProps.event, executive_summary_comment: SHARED_DEFAULT },
  } as any;
  return render(<Template {...props} />);
};

describe('re-entry email executive summary', () => {
  it.each(TEMPLATES)('%s renders the assessment the backend resolved for the recipient', async (_, Template) => {
    // given
    const assessment = 'Level 2 only summary';

    // when
    const html = await renderEmail(Template, assessment);

    // then
    expect(html).toContain(assessment);
    expect(html).not.toContain(SHARED_DEFAULT);
  });

  it.each(TEMPLATES)('%s renders no summary when there is no assessment', async (_, Template) => {
    // given
    const assessment = null;

    // when
    const html = await renderEmail(Template, assessment);

    // then
    expect(html).not.toContain(SHARED_DEFAULT);
  });
});
