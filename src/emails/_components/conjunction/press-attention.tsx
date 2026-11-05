import { Section } from '@react-email/components';

import { createEmailTranslator } from '@/emails/_utils/utils';

import { Markdown } from '../markdown';
import { Text } from '../text';

type ConjunctionPressAttentionProps = {
  pressAttention?: string | null;
};

const ConjunctionPressAttention = ({ pressAttention }: ConjunctionPressAttentionProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Conjunction_alert.Press_attention' });

  return (
    <Section className="!w-full">
      <Text className="text-sm mt-0 mb-4 font-bold">{t('title')}</Text>
      {pressAttention
        ? (
            <Markdown>{pressAttention}</Markdown>
          )
        : <Text>{t('empty')}</Text>}
    </Section>
  );
};

export { ConjunctionPressAttention };
