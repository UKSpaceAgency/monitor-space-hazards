import { Section } from '@react-email/components';

import { createEmailTranslator } from '@/emails/_utils/utils';

import { Markdown } from '../markdown';
import { Text } from '../text';

type FragmentationPressAttentionProps = {
  pressAttention?: string | null;
};

const FragmentationPressAttention = ({ pressAttention }: FragmentationPressAttentionProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Fragmentation.Press_attention' });

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
