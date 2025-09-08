import { createTranslator } from 'next-intl';

import type { TypeUniqueEventOut } from '@/__generated__/data-contracts';
import { env } from '@/libs/Env';
import messages from '@/locales/en.json';

import AnalysisNotificationTable from './_components/conjunction/analysis-notification-table';
import { Layout } from './_components/layout';
import { Section } from './_components/section';
import { SignIn } from './_components/sign_in';
import { Text } from './_components/text';

type AnalysisUploadEmailProps = {
  conjunctions: TypeUniqueEventOut[];
  withPlaceholders: boolean;
};

function AnalysisUploadEmail({ conjunctions, withPlaceholders }: AnalysisUploadEmailProps) {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails',
    messages,
  });

  const url = `${env.NEXTAUTH_URL}/conjunctions`;

  return (
    <Layout withPlaceholders={withPlaceholders} isNotification>
      <Section title={t('Analysis_upload.title')}>
        {t.rich('Analysis_upload.content', {
          p: chunks => <Text>{chunks}</Text>,
        })}
        <AnalysisNotificationTable conjunctions={conjunctions} />
        <Text>{t('utc_note')}</Text>
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
