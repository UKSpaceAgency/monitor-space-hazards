import { env } from '@/libs/Env';

import { Layout } from './_components/layout';
import { Link } from './_components/link';
import { Section } from './_components/section';
import { createEmailTranslator } from './_utils/utils';

type NewEphemerisEmailProps = {
  commonName: string;
  noradId: string;
  withPlaceholders: boolean;
};

function NewEphemerisEmail({ commonName, noradId, withPlaceholders }: NewEphemerisEmailProps) {
  const t = createEmailTranslator({ namespace: 'Emails' });

  const url = `${env.NEXTAUTH_URL}/satellites/${noradId}`;

  return (
    <Layout withPlaceholders={withPlaceholders} isNotification eventType="conjunction">
      <Section title={t('Conjunction_new_ephemeris.title', { commonName })}>
        {t.rich('Conjunction_new_ephemeris.content', {
          commonName,
          noradId,
          link: chunks => <Link href={url}>{chunks}</Link>,
        })}
      </Section>
    </Layout>
  );
}

NewEphemerisEmail.PreviewProps = {
  commonName: 'Satellite 1',
  noradId: '1234567890',
};

export default NewEphemerisEmail;
