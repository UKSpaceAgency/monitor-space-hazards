import type { TypeUniqueEventOut } from '@/__generated__/data-contracts';
import { env } from '@/libs/Env';

import AnalysisNotificationTable from './_components/conjunction/analysis-notification-table';
import { Layout } from './_components/layout';
import { Section } from './_components/section';
import { SignIn } from './_components/sign_in';
import { Text } from './_components/text';
import { createEmailTranslator } from './_utils/utils';

type AnalysisUploadEmailProps = {
  conjunctions: TypeUniqueEventOut[];
  withPlaceholders: boolean;
};

function AnalysisUploadEmail({ conjunctions, withPlaceholders }: AnalysisUploadEmailProps) {
  const t = createEmailTranslator({ namespace: 'Emails' });

  const url = `${env.NEXTAUTH_URL}/conjunctions`;

  return (
    <Layout withPlaceholders={withPlaceholders} isNotification eventType="conjunction">
      <Section title={t('Analysis_upload.title')}>
        {t.rich('Analysis_upload.content')}
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
      short_id: '123',
      primary_object_common_name: 'Primary Object',
      secondary_object_common_name: 'Secondary Object',
      tca_time: '2021-01-01T00:00:00Z',
      collision_probability: 0.5,
    },
  ],
};

export default AnalysisUploadEmail;
