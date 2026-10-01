import { Section } from '@react-email/components';

import { createEmailTranslator } from '@/emails/_utils/utils';

import { Markdown } from '../markdown';
import { Text } from '../text';

type ReentryDamagesAndLiabilityProps = {
  damagesLiabilityComment?: string | null;
};

export const ReentryDamagesAndLiability = ({ damagesLiabilityComment }: ReentryDamagesAndLiabilityProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Damages_and_liability' });

  if (!damagesLiabilityComment) {
    return null;
  }

  return (
    <Section className="!w-full">
      <Text className="text-sm m-0 font-bold">{t('title')}</Text>
      <Markdown>{damagesLiabilityComment}</Markdown>
    </Section>
  );
};
