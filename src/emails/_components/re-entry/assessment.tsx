import { createEmailTranslator } from '@/emails/_utils/utils';
import { env } from '@/libs/Env';

import { Link } from '../link';
import { Markdown } from '../markdown';
import { Section } from '../section';
import { Text } from '../text';

type ReentryAssessmentProps = {
  shortId: string;
  executiveSummary: string;
};

export const ReentryAssessment = ({ shortId, executiveSummary }: ReentryAssessmentProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Assessment' });

  return (
    <Section title={t('title')}>
      <Markdown>{executiveSummary}</Markdown>
      <Text>
        Sign in to view analysis and additional information:
        {' '}
        <Link href={`${env.NEXTAUTH_URL}/re-entries/${shortId}/alert`}>Monitor Space Hazards - GOV.UK</Link>
      </Text>
    </Section>
  );
};
