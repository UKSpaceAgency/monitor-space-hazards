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
    accessorKey: 'missDistance',
  }, {
    header: t('impact_speed'),
    accessorKey: 'impactSpeed',
  }, {
    header: t('altitude'),
    accessorKey: 'altitude',
  }, {
    header: t('approximate_latlong'),
    renderCell: ({ latitude, longitude }) => `${latitude}, ${longitude}`,
  }, {
    header: t('predicted_number_of_fragments'),
    accessorKey: 'predictedFragments',
  }, {
    header: t('potential_increase'),
    accessorKey: 'increaseInFutureCollisions',
  }];

  return <InformationsTable rows={rows} data={report} />;
};

export { ConjunctionAlertAdditionalEventDetailsTable };
