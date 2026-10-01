import { Section as EmailSection } from '@react-email/components';

import { createEmailTranslator } from '@/emails/_utils/utils';

import { Section } from '../section';
import { Text } from '../text';

type ReentryUnderstandingThisReportProps = {
  level: 1 | 2;
};

export const ReentryUnderstandingThisReport = ({ level }: ReentryUnderstandingThisReportProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Understanding_this_report' });

  return (
    <Section title={t('title')}>
      <EmailSection>
        <Text className="text-sm m-0 font-bold">{t('risk_calculations_title')}</Text>
        {t.rich('risk_calculations_content')}
      </EmailSection>
      <EmailSection className="pt-4">
        <Text className="text-sm m-0 font-bold">{t('overflights_title')}</Text>
        {t.rich('overflights_content')}
      </EmailSection>
      <EmailSection className="pt-4">
        <Text className="text-sm m-0 font-bold">{t(level === 2 ? 'warning_title_level_2' : 'alert_title_level_1')}</Text>
        {t.rich(level === 2 ? 'warning_content_level_2' : 'alert_content_level_1')}
      </EmailSection>
    </Section>
  );
};
