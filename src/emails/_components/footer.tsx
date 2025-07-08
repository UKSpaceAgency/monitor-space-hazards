import { Img, Section as EmailSection } from '@react-email/components';
import { createTranslator } from 'next-intl';

import messages from '@/locales/en.json';

import { Link } from './link';
import { Section } from './section';
import { Text } from './text';

type FooterProps = {
  withPlaceholders: boolean;
};

export const Footer = ({ withPlaceholders }: FooterProps) => {
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
      <EmailSection className="pb-4">
        <Img
          src={withPlaceholders ? '{{UKSA_LOGO}}' : 'https://www.dev.monitor-space-hazards.service.gov.uk/uksa.png'}
          alt="UK Space Agency Logo"
          width="113"
          height="31"
        />
      </EmailSection>
      <Link href="mailto:monitorspacehazards@ukspaceagency.gov.uk?subject=Unsubscribe" className="text-sm">Unsubscribe</Link>
    </Section>
  );
};
