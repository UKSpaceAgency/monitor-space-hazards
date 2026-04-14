import { Section } from '@react-email/components';
import type { ComponentProps } from 'react';

import type { TypeConjunctionReportOut, TypeUniqueEventOut } from '@/__generated__/data-contracts';
import { createEmailTranslator } from '@/emails/_utils/utils';

import { Table } from '../table';

type ConjunctionPotentialImpactProps = {
  report: TypeConjunctionReportOut;
  event: TypeUniqueEventOut;
} & ComponentProps<'table'>;

export const ConjunctionPotentialImpact = ({ report, ...props }: ConjunctionPotentialImpactProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Conjunction_alert.Potential_impact_of_event' });

  const data = [
    [t('predicted_number_of_fragments'), report.predicted_fragments],
    [t('potential_increase'), `${report.increase_in_future_collisions}%`],
  ];

  return (
    <Section {...props}>
      <Table data={data} />
    </Section>
  );
};
