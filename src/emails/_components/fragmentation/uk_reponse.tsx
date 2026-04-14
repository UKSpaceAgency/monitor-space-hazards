import { Section } from '@react-email/components';

import { createEmailTranslator } from '@/emails/_utils/utils';

import { Markdown } from '../markdown';
import { Text } from '../text';

type FragmentationUkResponseProps = {
  ukResponse?: string | null;
};

const FragmentationUkResponse = ({ ukResponse }: FragmentationUkResponseProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Fragmentation.Uk_response' });

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
