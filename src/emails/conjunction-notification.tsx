import { createTranslator } from 'next-intl';

import type { TypeEventOut } from '@/__generated__/data-contracts';
import { env } from '@/libs/Env';
import messages from '@/locales/en.json';

import ConjunctionNotificationTable from './_components/conjunction/notification-table';
import { Layout } from './_components/layout';
import { Section } from './_components/section';
import { SignIn } from './_components/sign_in';
import { Text } from './_components/text';

type ConjunctionNotificationEmailProps = {
  conjunctions: TypeEventOut[];
  withPlaceholders: boolean;
};

function ConjunctionNotificationEmail({ conjunctions, withPlaceholders }: ConjunctionNotificationEmailProps) {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails',
    messages,
  });

  const url = `${env.NEXTAUTH_URL}/conjunctions`;

  return (
    <Layout withPlaceholders={withPlaceholders} isNotification eventType="conjunction">
      <Section title={t('Conjunction_notification.title')}>
        {t.rich('Conjunction_notification.content', {
          p: chunks => <Text>{chunks}</Text>,
        })}
        <ConjunctionNotificationTable conjunctions={conjunctions} />
        <Text>{t('utc_note')}</Text>
        <SignIn link={url} />
      </Section>
    </Layout>
  );
}

ConjunctionNotificationEmail.PreviewProps = {
  conjunctions: [
    {
      short_id: '123',
      primary_object_common_name: 'Primary Object',
      secondary_object_common_name: 'Secondary Object',
      tca_time: '2021-01-01T00:00:00Z',
      collision_probability: 0.5,
    },
  ],
};

export default ConjunctionNotificationEmail;
