import { createTranslator } from 'next-intl';

import type { TypeEventOut } from '@/__generated__/data-contracts';
import { env } from '@/libs/Env';
import messages from '@/locales/en.json';

import ConjunctionNotificationTable from './_components/conjunction/notification-table';
import { Layout } from './_components/layout';
import { Section } from './_components/section';
import { SignIn } from './_components/sign_in';
import { Text } from './_components/text';

type ConjunctionNotificationUpdatedEmailProps = {
  conjunctions: TypeEventOut[];
  withPlaceholders: boolean;
};

function ConjunctionNotificationUpdatedEmail({ conjunctions, withPlaceholders }: ConjunctionNotificationUpdatedEmailProps) {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails',
    messages,
  });

  const url = `${env.NEXTAUTH_URL}/conjunctions`;

  return (
    <Layout withPlaceholders={withPlaceholders} isNotification eventType="conjunction">
      <Section title={t('Conjunction_notification_updated.title')}>
        {t.rich('Conjunction_notification_updated.content', {
          p: chunks => <Text>{chunks}</Text>,
        })}
        <ConjunctionNotificationTable conjunctions={conjunctions} />
        <Text>{t('utc_note')}</Text>
        <SignIn link={url} />
      </Section>
    </Layout>
  );
}

ConjunctionNotificationUpdatedEmail.PreviewProps = {
  conjunctions: [
    {
      shortId: '123',
      primaryObjectCommonName: 'Primary Object',
      secondaryObjectCommonName: 'Secondary Object',
      tcaTime: '2021-01-01T00:00:00Z',
      collisionProbability: 0.5,
    },
  ],
};

export default ConjunctionNotificationUpdatedEmail;
