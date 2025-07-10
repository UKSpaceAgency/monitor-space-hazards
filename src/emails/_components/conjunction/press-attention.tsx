import { Section } from '@react-email/components';
import { createTranslator } from 'next-intl';

import messages from '@/locales/en.json';

import { Markdown } from '../markdown';
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
            <Markdown>{pressAttention}</Markdown>
          )
        : <Text>{t('empty')}</Text>}
    </Section>
  );
};

export { ConjunctionPressAttention };
