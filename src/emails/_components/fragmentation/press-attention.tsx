import { Section } from '@react-email/components';
import { createTranslator } from 'next-intl';

import messages from '@/locales/en.json';

import { Markdown } from '../markdown';
import { Text } from '../text';

type FragmentationPressAttentionProps = {
  pressAttention?: string | null;
};

const FragmentationPressAttention = ({ pressAttention }: FragmentationPressAttentionProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Fragmentation.Press_attention',
    messages,
  });

  return (
    <Section className="!w-full">
      <Text className="text-sm m-0 font-bold">{t('title')}</Text>
      {pressAttention
        ? (
            <Markdown>{pressAttention}</Markdown>
          )
        : <Text>{t('empty')}</Text>}
    </Section>
  );
};

export { FragmentationPressAttention };
