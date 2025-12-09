import { Button, Img, Section as EmailSection } from '@react-email/components';
import { createTranslator } from 'next-intl';

import { env } from '@/libs/Env';
import messages from '@/locales/en.json';

import { Link } from './link';
import { Section } from './section';
import { Text } from './text';

type FooterProps = {
  withPlaceholders: boolean;
  isNotification?: boolean;
  isShort?: boolean;
};

export const Footer = ({ withPlaceholders, isNotification, isShort }: FooterProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Footer',
    messages,
  });

  const key = isShort ? 'content_short' : isNotification ? 'content_notification' : 'content';

  return (
    <Section title={t('title')}>
      {t.rich(key, {
        p: chunks => <Text className="text-sm mt-0">{chunks}</Text>,
        nspocemail: chunks => <Link href="mailto:NSPOCincidents@ukspaceagency.gov.uk">{chunks}</Link>,
        orbitalemail: chunks => <Link href="mailto:OrbitalAnalysts@ukspaceagency.gov.uk">{chunks}</Link>,
        link: chunks => <Link href={env.NEXTAUTH_URL}>{chunks}</Link>,
        contact: chunks => <Link href={`${env.NEXTAUTH_URL}/contact`}>{chunks}</Link>,
        button: chunks => <Text className="text-sm mt-0"><Button className="bg-[#006ebb] p-2 text-white rounded" href="https://www.monitor-space-hazards.service.gov.uk/contact-analyst">{chunks}</Button></Text>,
      })}
      <EmailSection className="pb-4 !w-full">
        <Img
          src={withPlaceholders ? '{{UKSA_LOGO.src}}' : 'https://www.dev.monitor-space-hazards.service.gov.uk/uksa.png'}
          alt="UK Space Agency Logo"
          width="113"
          height="31"
          className="w-[113px] h-[31px]"
        />
      </EmailSection>
      <Link href="mailto:monitorspacehazards@ukspaceagency.gov.uk?subject=Unsubscribe" className="text-sm">Unsubscribe</Link>
    </Section>
  );
};
