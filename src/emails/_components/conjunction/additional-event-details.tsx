import { createTranslator } from 'next-intl';
import type { ComponentProps } from 'react';

import type { TypeConjunctionReportOut } from '@/__generated__/data-contracts';
import messages from '@/locales/en.json';

import { Table } from '../table';

type ConjunctionAdditionalEventDetailsProps = {
  report: TypeConjunctionReportOut;
} & ComponentProps<'table'>;

export const ConjunctionAdditionalEventDetails = ({ report, ...props }: ConjunctionAdditionalEventDetailsProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Conjunction_alert.Additional_event_details',
    messages,
  });

  const data = [
    [t('predicted_miss_distance'), `${report.missDistance ?? 'Unknown'} km`],
    [t('impact_speed'), `${report.impactSpeed ?? 'Unknown'} km/s`],
    [t('altitude'), `${report.altitude ?? 'Unknown'} km`],
    [t('approximate_latlong'), `${report.latitude ?? 'Unknown'}, ${report.longitude ?? 'Unknown'}`],
  ];

  return (
    <Table data={data} {...props} />
  );
};
