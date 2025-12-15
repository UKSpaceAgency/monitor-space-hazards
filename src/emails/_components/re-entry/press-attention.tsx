import { Section } from '@react-email/components';
import { createTranslator } from 'next-intl';

import messages from '@/locales/en.json';

import { Markdown } from '../markdown';
import { Text } from '../text';

type ReentryPressAttentionProps = {
  pressAttention?: string | null;
};

export const ReentryPressAttention = ({ pressAttention }: ReentryPressAttentionProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Reentry_alert.Press_attention',
    messages,
  });

  return (
    <Section className="!w-full pt-4">
      <Text className="text-sm m-0 font-bold">{t('title')}</Text>
      {pressAttention
        ? (
            <Markdown>
              {pressAttention}
            </Markdown>
          )
        : <Text>{t('empty')}</Text>}
    </Section>
  );
};
