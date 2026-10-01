import { Section as EmailSection } from '@react-email/components';

import { createEmailTranslator } from '@/emails/_utils/utils';
import { env } from '@/libs/Env';

import { Link } from '../link';
import { Section } from '../section';
import { Text } from '../text';

type ReentryUnderstandingThisReportClosedProps = {
  level: 1 | 2;
};

export const ReentryUnderstandingThisReportClosed = ({ level }: ReentryUnderstandingThisReportClosedProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Understanding_this_report_closed' });

  return (
    <Section title={t('title')}>
      <EmailSection>
        <Text className="text-sm m-0 font-bold">{t('overflights_title')}</Text>
        {t.rich('overflights_content')}
      </EmailSection>
      <EmailSection className="pt-4">
        <Text className="text-sm m-0 font-bold">{t('alert_title', { level })}</Text>
        {t.rich(level === 2 ? 'alert_content_level_2' : 'alert_content_level_1')}
        {t.rich('more_information', {
          link: chunks => <Link href={env.NEXTAUTH_URL}>{chunks}</Link>,
        })}
      </EmailSection>
    </Section>
  );
};
