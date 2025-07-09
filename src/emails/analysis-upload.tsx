import { createTranslator } from 'next-intl';

import type { TypeEventOut } from '@/__generated__/data-contracts';
import { env } from '@/libs/Env';
import messages from '@/locales/en.json';

import ConjunctionNotificationTable from './_components/conjunction/notification-table';
import { Layout } from './_components/layout';
import { Section } from './_components/section';
import { SignIn } from './_components/sign_in';
import { Text } from './_components/text';

type AnalysisUploadEmailProps = {
  conjunctions: TypeEventOut[];
  withPlaceholders: boolean;
};

function AnalysisUploadEmail({ conjunctions, withPlaceholders }: AnalysisUploadEmailProps) {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Analysis_upload',
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

AnalysisUploadEmail.PreviewProps = {
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

export default AnalysisUploadEmail;
