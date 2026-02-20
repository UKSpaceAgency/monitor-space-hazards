import { useTranslations } from 'next-intl';

import type { TypeConjunctionReportOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';

type ConjunctionAlertAdditionalEventDetailsTableProps = {
  report: TypeConjunctionReportOut;
};

const ConjunctionAlertAdditionalEventDetailsTable = ({ report }: ConjunctionAlertAdditionalEventDetailsTableProps) => {
  const t = useTranslations('Tables.Conjunction_alert_additional_event_details');

  const rows: InformationsTableRow<Partial<TypeConjunctionReportOut>>[] = [{
    header: t('predicted_miss_distance'),
    accessorKey: 'miss_distance',
  }, {
    header: t('impact_speed'),
    accessorKey: 'impact_speed',
  }, {
    header: t('altitude'),
    accessorKey: 'altitude',
  }, {
    header: t('approximate_latlong'),
    renderCell: ({ latitude, longitude }) => `${latitude}, ${longitude}`,
  }, {
    header: t('predicted_number_of_fragments'),
    accessorKey: 'predicted_fragments',
  }, {
    header: t('potential_increase'),
    accessorKey: 'increase_in_future_collisions',
  }];

  return <InformationsTable rows={rows} data={report} />;
};

export { ConjunctionAlertAdditionalEventDetailsTable };
