import { Markdown, Section } from '@react-email/components';
import { createTranslator } from 'next-intl';

import messages from '@/locales/en.json';

import { Text } from '../text';

type PressAttentionProps = {
  pressAttention?: string | null;
};

const PressAttention = ({ pressAttention }: PressAttentionProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Reentry_alert.Press_attention',
    messages,
  });

  return (
    <Section>
      <Text className="text-sm m-0 font-bold">{t('title')}</Text>
      {pressAttention ? <Markdown>{pressAttention}</Markdown> : <Text>{t('empty')}</Text>}
    </Section>
  );
};

export { PressAttention };
