import { Column, Img, Row } from '@react-email/components';
import { createTranslator } from 'next-intl';

import messages from '@/locales/en.json';

import { Link } from './link';
import { Section } from './section';
import { Text } from './text';

export const Footer = () => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Footer',
    messages,
  });

  return (
    <Section title={t('title')}>
      {t.rich('content', {
        p: chunks => <Text className="text-sm mt-0">{chunks}</Text>,
        link: chunks => <Link href="mailto:NSPOCincidents@ukspaceagency.gov.uk">{chunks}</Link>,
      })}
      <Row className="pb-4">
        <Column className="w-[30%]">
          <Img src="https://www.dev.monitor-space-hazards.service.gov.uk/uksa.png" alt="UK Space Agency Logo" className="w-full h-auto" />
        </Column>
        <Column />
      </Row>
      <Link href="mailto:monitorspacehazards@ukspaceagency.gov.uk?subject=Unsubscribe" className="text-sm">Unsubscribe</Link>
    </Section>
  );
};
