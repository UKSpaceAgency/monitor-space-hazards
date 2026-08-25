import { Section as EmailSection } from '@react-email/components';

import { createEmailTranslator } from '@/emails/_utils/utils';
import { env } from '@/libs/Env';

import { Link } from '../link';
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
        {t.rich('risk_calculations_content', {
          link: chunks => <Link href={env.NEXTAUTH_URL}>{chunks}</Link>,
        })}
      </EmailSection>
      <EmailSection className="pt-4">
        <Text className="text-sm m-0 font-bold">{t('overflights_title')}</Text>
        {t.rich('overflights_content')}
      </EmailSection>
      <EmailSection className="pt-4">
        <Text className="text-sm m-0 font-bold">{t('analyst_report_title', { level })}</Text>
        {/* Level 2 wording is still to be confirmed, so the Level 1 copy is reused for now. */}
        {t.rich(level === 2 ? 'analyst_report_content_level_2' : 'analyst_report_content_level_1')}
      </EmailSection>
    </Section>
  );
};
