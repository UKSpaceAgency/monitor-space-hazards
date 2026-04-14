'use client';

import type { Row } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import type { TypeTIPOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { dayjs, FORMAT_DATE_TIME, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';

type EventSummaryData = Pick<TypeTIPOut, 'external_id' | 'decay_epoch' | 'uncertainty_window' | 'direction' | 'latitude' | 'longitude' | 'inclination' | 'interest' | 'updated_at'>;

type ReentryEventHistoryDetailTableProps = {
  row: Row<TypeTIPOut>;
};

const ReentryEventHistoryDetailTable = ({ row }: ReentryEventHistoryDetailTableProps) => {
  const t = useTranslations('Tables.Reentry_event_summary');

  const rows: InformationsTableRow<EventSummaryData>[] = [{
    header: t('tip_id'),
    accessorKey: 'external_id',
  }, {
    header: t('predicted_reentry_time'),
    accessorKey: 'decay_epoch',
    renderCell: row => dayjs(row.decay_epoch).format(FORMAT_FULL_DATE_TIME),
  }, {
    header: t('uncertainty_window'),
    accessorKey: 'uncertainty_window',
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
    accessorKey: 'updated_at',
    renderCell: row => dayjs(row.updated_at).format(FORMAT_DATE_TIME),
  }];

  return <InformationsTable reducedFont rows={rows} data={row.original} dataPdfIgnore />;
};

const renderReentryHistoryDetailAsSubcomponent = (props: ReentryEventHistoryDetailTableProps) => {
  return <div className="govuk-details__text text-sm"><ReentryEventHistoryDetailTable {...props} /></div>;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ReentryEventHistoryDetailTable, renderReentryHistoryDetailAsSubcomponent };
