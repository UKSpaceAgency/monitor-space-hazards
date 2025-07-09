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
    namespace: 'Emails.Conjunction_notification',
    messages,
  });

  const url = `${env.NEXTAUTH_URL}/conjunctions`;

  return (
    <Layout withPlaceholders={withPlaceholders} isNotification>
      <Section title={t('title')}>
        {t.rich('content', {
          p: chunks => <Text>{chunks}</Text>,
        })}
        <ConjunctionNotificationTable conjunctions={conjunctions} />
        <SignIn link={url} />
      </Section>
    </Layout>
  );
}

ConjunctionNotificationEmail.PreviewProps = {
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

export default ConjunctionNotificationEmail;
