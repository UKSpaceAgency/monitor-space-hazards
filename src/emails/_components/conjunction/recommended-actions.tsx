import { Section } from '@react-email/components';
import type { ComponentProps } from 'react';

import type { TypeConjunctionReportOut, TypeUniqueEventOut } from '@/__generated__/data-contracts';
import { createEmailTranslator } from '@/emails/_utils/utils';

import { Markdown } from '../markdown';
import { Text } from '../text';

type ConjunctionRecommendedActionsProps = {
  report: TypeConjunctionReportOut;
  event: TypeUniqueEventOut;
} & ComponentProps<'table'>;

export const ConjunctionRecommendedActions = ({ report, event, ...props }: ConjunctionRecommendedActionsProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Conjunction_alert.Recommended_actions' });

  return (
    <Section {...props}>
      <Text className="m-0 font-bold">{t('title')}</Text>
      {t.rich('content')}
      {event.uk_response_comment && <Markdown>{event.uk_response_comment}</Markdown>}
    </Section>
  );
};
