import type { TypeEventOut } from '@/__generated__/data-contracts';
import { env } from '@/libs/Env';

import ConjunctionNotificationTable from './_components/conjunction/notification-table';
import { Layout } from './_components/layout';
import { Section } from './_components/section';
import { SignIn } from './_components/sign_in';
import { Text } from './_components/text';
import { createEmailTranslator } from './_utils/utils';

type NewManoeuvreEmailProps = {
  conjunctions: TypeEventOut[];
  withPlaceholders: boolean;
};

function NewManoeuvreEmail({ conjunctions, withPlaceholders }: NewManoeuvreEmailProps) {
  const t = createEmailTranslator({ namespace: 'Emails' });

  const url = `${env.NEXTAUTH_URL}/conjunctions`;

  return (
    <Layout withPlaceholders={withPlaceholders} isNotification eventType="conjunction">
      <Section title={t('Manoeuvre_notification.title')}>
        {t.rich('Manoeuvre_notification.content')}
        <ConjunctionNotificationTable conjunctions={conjunctions} />
        <Text>{t('utc_note')}</Text>
        <SignIn link={url} />
      </Section>
    </Layout>
  );
}

NewManoeuvreEmail.PreviewProps = {
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

export default NewManoeuvreEmail;
