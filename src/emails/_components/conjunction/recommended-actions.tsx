import { Section } from '@react-email/components';
import { createTranslator } from 'next-intl';
import type { ComponentProps } from 'react';

import type { TypeConjunctionReportOut, TypeUniqueEventOut } from '@/__generated__/data-contracts';
import messages from '@/locales/en.json';

import { Markdown } from '../markdown';
import { Text } from '../text';

type ConjunctionRecommendedActionsProps = {
  report: TypeConjunctionReportOut;
  event: TypeUniqueEventOut;
} & ComponentProps<'table'>;

export const ConjunctionRecommendedActions = ({ report, event, ...props }: ConjunctionRecommendedActionsProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Conjunction_alert.Recommended_actions',
    messages,
  });

  return (
    <Section {...props}>
      <Text className="m-0 font-bold">{t('title')}</Text>
      {t.rich('content', {
        p: chunks => <Text>{chunks}</Text>,
      })}
      {event.ukResponseComment && <Markdown>{event.ukResponseComment}</Markdown>}
    </Section>
  );
};
