import { createEmailTranslator } from '@/emails/_utils/utils';

import { Markdown } from '../markdown';
import { Section } from '../section';
import { Text } from '../text';

type ReentryAssessmentProps = {
  assessment?: string | null;
};

export const ReentryAssessment = ({ assessment }: ReentryAssessmentProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Assessment' });

  return (
    <Section title={t('title')}>
      {assessment
        ? <Markdown>{assessment}</Markdown>
        // The analyst assessment (assessment_l1 / assessment_l2) is not yet exposed
        // by the API, so the copy below stands in until the field is available.
        : <Text className="mb-0">{t('placeholder')}</Text>}
    </Section>
  );
};
