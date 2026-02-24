import { Button, Img, Section as EmailSection } from '@react-email/components';
import { createTranslator } from 'next-intl';
import { useMemo } from 'react';

import { env } from '@/libs/Env';
import messages from '@/locales/en.json';

import { Link } from './link';
import { Section } from './section';
import { Text } from './text';

type FooterProps = {
  withPlaceholders: boolean;
  isNotification?: boolean;
  isShort?: boolean;
  eventType?: 'conjunction' | 're-entry' | 'fragmentation';
  shortId?: string;
};

export const Footer = ({ withPlaceholders, isNotification, isShort, eventType, shortId }: FooterProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Footer',
    messages,
  });

  const key = isShort ? 'content_short' : isNotification ? 'content_notification' : 'content';

  const contactLink = useMemo(() => {
    switch (eventType) {
      case 're-entry':
        return `${env.NEXTAUTH_URL}/contact-analyst/re-entries`;
      case 'fragmentation':
        return `${env.NEXTAUTH_URL}/contact-analyst/fragmentations`;
      default:
        return `${env.NEXTAUTH_URL}/contact-analyst/conjunctions`;
    }
  }, [eventType]);

  const contactLinkWithShortId = useMemo(() => {
    return contactLink + (shortId ? `?id=${shortId}` : '');
  }, [contactLink, shortId]);

  return (
    <Section title={t('title')} className="pb-0">
      {t.rich(key, {
        p: chunks => <Text className="text-sm mt-0">{chunks}</Text>,
        nspocemail: chunks => <Link href="mailto:NSPOCincidents@ukspaceagency.gov.uk">{chunks}</Link>,
        orbitalemail: chunks => <Link href="mailto:OrbitalAnalysts@ukspaceagency.gov.uk">{chunks}</Link>,
        link: chunks => <Link href={env.NEXTAUTH_URL}>{chunks}</Link>,
        contact: chunks => <Link href={`${env.NEXTAUTH_URL}/contact`}>{chunks}</Link>,
        button: chunks => <Text className="text-sm mt-0"><Button className="bg-[#006ebb] p-2 text-white rounded" href={contactLinkWithShortId}>{chunks}</Button></Text>,
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
