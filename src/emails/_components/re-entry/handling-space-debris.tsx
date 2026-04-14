import { Section } from '@react-email/components';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import { createEmailTranslator } from '@/emails/_utils/utils';

import { Link } from '../link';
import { Markdown } from '../markdown';
import { Text } from '../text';

type ReentryHandlingSpaceDebrisProps = {
  event: TypeReentryEventOut;
};

export const ReentryHandlingSpaceDebris = ({ event }: ReentryHandlingSpaceDebrisProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert' });
  return (
    <Section>
      <Section className="pt-4">
        <Text className="text-sm m-0 font-bold">{t('Handling_space_debris.title')}</Text>
        {t.rich('Handling_space_debris.content', {
          hydrozineLink: chunks => <Link href="https://www.gov.uk/government/publications/hydrazine-properties-and-incident-management">{chunks}</Link>,
          keroseneLink: chunks => <Link href="https://www.gov.uk/government/publications/kerosene-properties-incident-management-and-toxicology">{chunks}</Link>,
        })}
      </Section>
      <Section className="pt-4">
        <Text className="text-sm m-0 font-bold">{t('Public_guidance_on_space_debris.title')}</Text>
        {t.rich('Public_guidance_on_space_debris.content', {
          ul: chunks => <ul className="list-disc pl-4">{chunks}</ul>,
          li: chunks => <li className="text-sm">{chunks}</li>,
        })}
        {event?.uk_response_comment
        && (
          <Markdown>
            {event.uk_response_comment}
          </Markdown>
        )}
      </Section>
    </Section>
  );
};
