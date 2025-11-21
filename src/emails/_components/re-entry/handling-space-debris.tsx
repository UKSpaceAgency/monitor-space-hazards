import { Section } from '@react-email/components';
import { createTranslator } from 'next-intl';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import messages from '@/locales/en.json';

import { Link } from '../link';
import { Markdown } from '../markdown';
import { Text } from '../text';

type ReentryHandlingSpaceDebrisProps = {
  event: TypeReentryEventOut;
};

export const ReentryHandlingSpaceDebris = ({ event }: ReentryHandlingSpaceDebrisProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Reentry_alert',
    messages,
  });
  return (
    <Section>
      <Text className="text-sm m-0 font-bold">{t('Handling_space_debris.title')}</Text>
      {t.rich('Handling_space_debris.content', {
        p: chunks => <Text>{chunks}</Text>,
        hydrozineLink: chunks => <Link href="https://www.gov.uk/government/publications/hydrazine-properties-and-incident-management">{chunks}</Link>,
        keroseneLink: chunks => <Link href="https://www.gov.uk/government/publications/kerosene-properties-incident-management-and-toxicology">{chunks}</Link>,
      })}
      <Text className="text-sm m-0 font-bold">{t('Public_guidance_on_space_debris.title')}</Text>
      {t.rich('Public_guidance_on_space_debris.content', {
        p: chunks => <Text>{chunks}</Text>,
        ul: chunks => <ul className="list-disc pl-4">{chunks}</ul>,
        li: chunks => <li className="text-sm">{chunks}</li>,
      })}
      {event?.ukResponseComment
      && (
        <Markdown>
          {event.ukResponseComment}
        </Markdown>
      )}
    </Section>
  );
};
