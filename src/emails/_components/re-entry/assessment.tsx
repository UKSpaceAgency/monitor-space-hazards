import { createEmailTranslator } from '@/emails/_utils/utils';

import { Markdown } from '../markdown';
import { Section } from '../section';

type ReentryAssessmentProps = {
  executiveSummary: string;
};

export const ReentryAssessment = ({ executiveSummary }: ReentryAssessmentProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Assessment' });

  return (
    <Section title={t('title')}>
      <Markdown>{executiveSummary}</Markdown>
    </Section>
  );
};
