'use client';
import { useTranslations } from 'next-intl';

import type { TypeDataSourcesOut, TypeEventSummaryOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import dayjs, { FORMAT_DATE_TIME } from '@/libs/Dayjs';

type ConjunctionEventHistoryDetailedInformations = Pick<
  TypeEventSummaryOut & TypeDataSourcesOut,
'primaryObjectCdmType' | 'primaryObjectEphemerisName' | 'updateTime' | 'spaceTrackCdm' | 'primaryObjectUncertainties' | 'secondaryObjectCdmType' | 'secondaryObjectUncertainties'
>;

type ConjunctionEventHistoryDetailedTableProps = {
  object: ConjunctionEventHistoryDetailedInformations | ConjunctionEventHistoryDetailedInformations[];
};

const ConjunctionEventHistoryDetailedTable = ({ object }: ConjunctionEventHistoryDetailedTableProps) => {
  const t = useTranslations('Tables.Conjunction');

  const rows: InformationsTableRow<ConjunctionEventHistoryDetailedInformations>[] = [{
    header: t('event_history.sub_table.primary_object'),
    accessorKey: 'primaryObjectCdmType',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.ephemeris_file_name')}</div>,
    accessorKey: 'primaryObjectEphemerisName',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.data_received')}</div>,
    renderCell: row => dayjs(row.updateTime).format(FORMAT_DATE_TIME),
    accessorKey: 'updateTime',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.number_of_observations')}</div>,
    renderCell: row => row.spaceTrackCdm[0]?.observationsNumber,
    accessorKey: 'spaceTrackCdm',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.time_span_of_observations')}</div>,
    renderCell: row => row.spaceTrackCdm[0]?.observationsTimespan,
    accessorKey: 'spaceTrackCdm',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.position_radial')}</div>,
    renderCell: row => row.primaryObjectUncertainties?.radialPositionUncertainty,
    accessorKey: 'primaryObjectUncertainties',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.position_in_track')}</div>,
    renderCell: row => row.primaryObjectUncertainties?.intrackPositionUncertainty,
    accessorKey: 'primaryObjectUncertainties',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.position_cross_track')}</div>,
    renderCell: row => row.primaryObjectUncertainties?.crosstrackPositionUncertainty,
    accessorKey: 'primaryObjectUncertainties',
  }, {
    header: t('event_history.sub_table.secondary_object'),
    accessorKey: 'secondaryObjectCdmType',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.data_received')}</div>,
    renderCell: row => dayjs(row.updateTime).format(FORMAT_DATE_TIME),
    accessorKey: 'updateTime',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.number_of_observations')}</div>,
    renderCell: row => row.spaceTrackCdm[1]?.observationsNumber,
    accessorKey: 'spaceTrackCdm',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.time_span_of_observations')}</div>,
    renderCell: row => row.spaceTrackCdm[1]?.observationsNumber,
    accessorKey: 'spaceTrackCdm',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.position_radial')}</div>,
    renderCell: row => row.secondaryObjectUncertainties?.radialPositionUncertainty,
    accessorKey: 'secondaryObjectUncertainties',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.position_in_track')}</div>,
    renderCell: row => row.secondaryObjectUncertainties?.intrackPositionUncertainty,
    accessorKey: 'secondaryObjectUncertainties',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.position_cross_track')}</div>,
    renderCell: row => row.secondaryObjectUncertainties?.crosstrackPositionUncertainty,
    accessorKey: 'secondaryObjectUncertainties',
  }];

  return <InformationsTable rows={rows} data={object} reducedFont headerCellWidth="sm" />;
};

export { ConjunctionEventHistoryDetailedTable };