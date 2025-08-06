import { Section } from '@react-email/components';
import { createTranslator } from 'next-intl';
import type { ComponentProps } from 'react';

import type { TypeConjunctionReportOut, TypeUniqueEventOut } from '@/__generated__/data-contracts';
import messages from '@/locales/en.json';

import { Table } from '../table';

type ConjunctionPotentialImpactProps = {
  report: TypeConjunctionReportOut;
  event: TypeUniqueEventOut;
} & ComponentProps<'table'>;

export const ConjunctionPotentialImpact = ({ report, ...props }: ConjunctionPotentialImpactProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Conjunction_alert.Potential_impact_of_event',
    messages,
  });

  const data = [
    [t('predicted_number_of_fragments'), report.predictedFragments],
    [t('potential_increase'), report.increaseInFutureCollisions],
  ];

  return (
    <Section {...props}>
      <Table data={data} />
    </Section>
  );
};
