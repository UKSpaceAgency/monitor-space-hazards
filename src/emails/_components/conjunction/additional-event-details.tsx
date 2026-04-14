import type { ComponentProps } from 'react';

import type { TypeConjunctionReportOut } from '@/__generated__/data-contracts';
import { createEmailTranslator } from '@/emails/_utils/utils';

import { Table } from '../table';

type ConjunctionAdditionalEventDetailsProps = {
  report: TypeConjunctionReportOut;
} & ComponentProps<'table'>;

export const ConjunctionAdditionalEventDetails = ({ report, ...props }: ConjunctionAdditionalEventDetailsProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Conjunction_alert.Additional_event_details' });

  const data = [
    [t('predicted_miss_distance'), `${report.miss_distance ?? 'Unknown'} km`],
    [t('impact_speed'), `${report.impact_speed ?? 'Unknown'} km/s`],
    [t('altitude'), `${report.altitude ?? 'Unknown'} km`],
    [t('approximate_latlong'), `${report.latitude ?? 'Unknown'}, ${report.longitude ?? 'Unknown'}`],
  ];

  return (
    <Table data={data} {...props} />
  );
};
