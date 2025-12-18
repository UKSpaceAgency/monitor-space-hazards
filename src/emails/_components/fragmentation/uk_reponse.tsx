import { Section } from '@react-email/components';
import { createTranslator } from 'next-intl';

import messages from '@/locales/en.json';

import { Markdown } from '../markdown';
import { Text } from '../text';

type FragmentationUkResponseProps = {
  ukResponse?: string | null;
};

const FragmentationUkResponse = ({ ukResponse }: FragmentationUkResponseProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Fragmentation.Uk_response',
    messages,
  });

  return (
    <Section className="!w-full">
      <Text className="text-sm m-0 font-bold">{t('title')}</Text>
      {ukResponse
        ? (
            <Markdown>{ukResponse}</Markdown>
          )
        : <Text>{t('empty')}</Text>}
    </Section>
  );
};

export { FragmentationUkResponse };
