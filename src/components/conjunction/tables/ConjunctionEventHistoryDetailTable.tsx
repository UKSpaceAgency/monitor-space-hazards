'use client';
import { useTranslations } from 'next-intl';

import type { TypeDataSourcesOut, TypeEventSummaryOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';

type ConjunctionEventHistoryDetailInformations = Pick<
  TypeEventSummaryOut & TypeDataSourcesOut,
'primary_object_cdm_type' | 'primary_object_ephemeris_name' | 'update_time' | 'space_track_cdm' | 'primary_object_uncertainties' | 'secondary_object_cdm_type' | 'secondary_object_uncertainties'
>;

type ConjunctionEventHistoryDetailTableProps = {
  object: ConjunctionEventHistoryDetailInformations | ConjunctionEventHistoryDetailInformations[];
};

const displayRoundedNumber = (num: number | undefined | null): string => num ? `± ${num.toFixed(3)}` : '';

const ConjunctionEventHistoryDetailTable = ({ object }: ConjunctionEventHistoryDetailTableProps) => {
  const t = useTranslations('Tables.Conjunction');

  const rows: InformationsTableRow<ConjunctionEventHistoryDetailInformations>[] = [{
    header: t('event_history.sub_table.primary_object'),
    accessorKey: 'primary_object_cdm_type',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.ephemeris_file_name')}</div>,
    accessorKey: 'primary_object_ephemeris_name',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.data_received')}</div>,
    renderCell: row => dayjs(row.update_time).format(FORMAT_DATE_TIME),
    accessorKey: 'update_time',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.number_of_observations')}</div>,
    renderCell: row => row.space_track_cdm[0]?.observations_number,
    accessorKey: 'space_track_cdm',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.time_span_of_observations')}</div>,
    renderCell: row => row.space_track_cdm[0]?.observations_timespan,
    accessorKey: 'space_track_cdm',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.position_radial')}</div>,
    renderCell: row => displayRoundedNumber(row.primary_object_uncertainties?.radial_position_uncertainty),
    accessorKey: 'primary_object_uncertainties',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.position_in_track')}</div>,
    renderCell: row => displayRoundedNumber(row.primary_object_uncertainties?.intrack_position_uncertainty),
    accessorKey: 'primary_object_uncertainties',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.position_cross_track')}</div>,
    renderCell: row => displayRoundedNumber(row.primary_object_uncertainties?.crosstrack_position_uncertainty),
    accessorKey: 'primary_object_uncertainties',
  }, {
    header: t('event_history.sub_table.secondary_object'),
    accessorKey: 'secondary_object_cdm_type',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.data_received')}</div>,
    renderCell: row => dayjs(row.update_time).format(FORMAT_DATE_TIME),
    accessorKey: 'update_time',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.number_of_observations')}</div>,
    renderCell: row => row.space_track_cdm[1]?.observations_number,
    accessorKey: 'space_track_cdm',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.time_span_of_observations')}</div>,
    renderCell: row => row.space_track_cdm[1]?.observations_timespan,
    accessorKey: 'space_track_cdm',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.position_radial')}</div>,
    renderCell: row => displayRoundedNumber(row.secondary_object_uncertainties?.radial_position_uncertainty),
    accessorKey: 'secondary_object_uncertainties',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.position_in_track')}</div>,
    renderCell: row => displayRoundedNumber(row.secondary_object_uncertainties?.intrack_position_uncertainty),
    accessorKey: 'secondary_object_uncertainties',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.position_cross_track')}</div>,
    renderCell: row => displayRoundedNumber(row.secondary_object_uncertainties?.crosstrack_position_uncertainty),
    accessorKey: 'secondary_object_uncertainties',
  }];

  return <InformationsTable rows={rows} data={object} reducedFont headerCellWidth="sm" dataPdfIgnore />;
};

const renderConjunctionHistoryDetailAsSubcomponent = (props: ConjunctionEventHistoryDetailTableProps) => {
  return <div className="govuk-details__text text-sm"><ConjunctionEventHistoryDetailTable {...props} /></div>;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ConjunctionEventHistoryDetailTable, renderConjunctionHistoryDetailAsSubcomponent };
