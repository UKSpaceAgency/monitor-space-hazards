import { createTranslator } from 'next-intl';

import { env } from '@/libs/Env';
import messages from '@/locales/en.json';

import { Layout } from './_components/layout';
import { Link } from './_components/link';
import { Section } from './_components/section';
import { Text } from './_components/text';

type NewEphemerisEmailProps = {
  commonName: string;
  noradId: string;
  withPlaceholders: boolean;
};

function NewEphemerisEmail({ commonName, noradId, withPlaceholders }: NewEphemerisEmailProps) {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Conjunction_new_ephemeris',
    messages,
  });

  const url = `${env.NEXTAUTH_URL}/satellites/${noradId}`;

  return (
    <Layout withPlaceholders={withPlaceholders} isNotification>
      <Section title={t('title', { commonName })}>
        {t.rich('content', {
          commonName,
          noradId,
          p: chunks => <Text>{chunks}</Text>,
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
