import { Section } from '@react-email/components';

import { createEmailTranslator } from '@/emails/_utils/utils';

import { Markdown } from '../markdown';
import { Text } from '../text';

type ReentryPressAttentionProps = {
  pressAttention?: string | null;
};

export const ReentryPressAttention = ({ pressAttention }: ReentryPressAttentionProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Press_attention' });

  if (!pressAttention) {
    return null;
  }

  return (
    <Section className="!w-full pt-4">
      <Text className="text-sm m-0 font-bold">{t('title')}</Text>
      <Markdown>{pressAttention}</Markdown>
    </Section>
  );
};
