import { createEmailTranslator } from '@/emails/_utils/utils';
import { env } from '@/libs/Env';

import { Link } from '../link';
import { Markdown } from '../markdown';
import { Section } from '../section';
import { Text } from '../text';

type ReentryAssessmentProps = {
  shortId: string;
  executiveSummary?: string | null;
  noLocations: boolean;
};

export const ReentryAssessment = ({ shortId, executiveSummary, noLocations }: ReentryAssessmentProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Assessment' });
  const tLocations = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Location_risk' });

  return (
    <Section title={t('title')}>
      {executiveSummary && <Markdown>{executiveSummary}</Markdown>}
      {noLocations && <Text>{tLocations('no_individual_locations')}</Text>}
      <Text>
        Sign in to view analysis and additional information:
        {' '}
        <Link href={`${env.NEXTAUTH_URL}/re-entries/${shortId}/alert`}>Monitor Space Hazards - GOV.UK</Link>
      </Text>
    </Section>
  );
};
