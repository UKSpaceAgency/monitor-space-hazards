import { useTranslations } from 'next-intl';

import type { TypeTIPOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';

type EventSummaryData = Pick<TypeTIPOut, 'externalId' | 'decayEpoch' | 'uncertaintyWindow' | 'direction' | 'latitude' | 'longitude' | 'inclination' | 'interest' | 'updatedAt'>;

type ReentryEventSummaryTableProps = {
  tip: TypeTIPOut;
};

const ReentryEventSummaryTable = ({ tip }: ReentryEventSummaryTableProps) => {
  const t = useTranslations('Tables.ReentryEventSummary');

  const rows: InformationsTableRow<EventSummaryData>[] = [{
    header: t('tip_id'),
    accessorKey: 'externalId',
  }, {
    header: t('predicted_reentry_time'),
    accessorKey: 'decayEpoch',
    renderCell: row => dayjs(row.decayEpoch).format(FORMAT_DATE_TIME),
  }, {
    header: t('uncertainty_window'),
    accessorKey: 'uncertaintyWindow',
  }, {
    header: t('direction_of_travel'),
    accessorKey: 'direction',
    renderCell: row => row.direction.toUpperCase(),
  }, {
    header: t('latitude'),
    accessorKey: 'latitude',
  }, {
    header: t('longitude'),
    accessorKey: 'longitude',
  }, {
    header: t('inclination'),
    accessorKey: 'inclination',
  }, {
    header: t('high_interest'),
    accessorKey: 'interest',
    renderCell: row => row.interest === 'high' ? 'Yes' : 'No',
  }, {
    header: t('time_of_update'),
    accessorKey: 'updatedAt',
    renderCell: row => dayjs(row.updatedAt).format(FORMAT_DATE_TIME),
  }];

  return <InformationsTable rows={rows} data={tip} />;
};

export { ReentryEventSummaryTable };
