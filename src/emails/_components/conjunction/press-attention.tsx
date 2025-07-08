import { Markdown, Section } from '@react-email/components';
import { createTranslator } from 'next-intl';

import messages from '@/locales/en.json';

import { Text } from '../text';

type ConjunctionPressAttentionProps = {
  pressAttention?: string | null;
};

const ConjunctionPressAttention = ({ pressAttention }: ConjunctionPressAttentionProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Conjunction_alert.Press_attention',
    messages,
  });

  return (
    <Section>
      <Text className="text-sm m-0 font-bold">{t('title')}</Text>
      {pressAttention
        ? (
            <Markdown markdownCustomStyles={{
              p: {
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                marginTop: '0',
              },
            }}
            >
              {pressAttention}
            </Markdown>
          )
        : <Text>{t('empty')}</Text>}
    </Section>
  );
};

export { ConjunctionPressAttention };
