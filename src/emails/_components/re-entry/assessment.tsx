import { createEmailTranslator } from '@/emails/_utils/utils';
import { env } from '@/libs/Env';

import { Link } from '../link';
import { Markdown } from '../markdown';
import { Section } from '../section';
import { Text } from '../text';

type ReentryAssessmentProps = {
  shortId: string;
  reportNumber: number;
  executiveSummary?: string | null;
  noLocations: boolean;
  noImpact: boolean;
};

export const ReentryAssessment = ({ shortId, reportNumber, executiveSummary, noLocations, noImpact }: ReentryAssessmentProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Assessment' });
  const tLocations = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Location_risk' });
  const tPotentialImpact = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Potential_impact' });

  return (
    <Section title={t('title')}>
      {executiveSummary && <Markdown>{executiveSummary}</Markdown>}
      {noLocations && <Text>{tLocations('no_individual_locations')}</Text>}
      {noImpact && <Text>{tPotentialImpact('no_impact')}</Text>}
      <Text className="mb-0">
        Sign in to view analysis and additional information:
        {' '}
        <Link href={`${env.NEXTAUTH_URL}/re-entries/${shortId}/alert`}>Monitor Space Hazards - GOV.UK</Link>
      </Text>
      <Text>
        <Link href={`${env.NEXTAUTH_URL}/re-entries/${shortId}/alert/reports/${reportNumber}/pdf`}>Download PDF</Link>
      </Text>
    </Section>
  );
};
