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
    namespace: 'Emails.Reentry_alert.Handling_space_debris',
    messages,
  });
  return (
    <Section>
      <Text className="text-sm m-0 font-bold">{t('title')}</Text>
      {t.rich('content', {
        p: chunks => <Text>{chunks}</Text>,
        hydrozineLink: chunks => <Link href="https://www.gov.uk/government/publications/hydrazine-properties-and-incident-management">{chunks}</Link>,
        keroseneLink: chunks => <Link href="https://www.gov.uk/government/publications/kerosene-properties-incident-management-and-toxicology">{chunks}</Link>,
      })}
      {event?.recoveryAndCleanUp
      && (
        <Markdown>
          {event.recoveryAndCleanUp}
        </Markdown>
      )}
    </Section>
  );
};
