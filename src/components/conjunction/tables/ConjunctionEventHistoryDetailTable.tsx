'use client';
import { useTranslations } from 'next-intl';

import type { TypeDataSourcesOut, TypeEventSummaryOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';

type ConjunctionEventHistoryDetailInformations = Pick<
  TypeEventSummaryOut & TypeDataSourcesOut,
'primaryObjectCdmType' | 'primaryObjectEphemerisName' | 'updateTime' | 'spaceTrackCdm' | 'primaryObjectUncertainties' | 'secondaryObjectCdmType' | 'secondaryObjectUncertainties'
>;

type ConjunctionEventHistoryDetailTableProps = {
  object: ConjunctionEventHistoryDetailInformations | ConjunctionEventHistoryDetailInformations[];
};

const displayRoundedNumber = (num: number | undefined | null): string => num ? `± ${num.toFixed(3)}` : '';

const ConjunctionEventHistoryDetailTable = ({ object }: ConjunctionEventHistoryDetailTableProps) => {
  const t = useTranslations('Tables.Conjunction');

  const rows: InformationsTableRow<ConjunctionEventHistoryDetailInformations>[] = [{
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
    renderCell: row => displayRoundedNumber(row.primaryObjectUncertainties?.radialPositionUncertainty),
    accessorKey: 'primaryObjectUncertainties',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.position_in_track')}</div>,
    renderCell: row => displayRoundedNumber(row.primaryObjectUncertainties?.intrackPositionUncertainty),
    accessorKey: 'primaryObjectUncertainties',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.position_cross_track')}</div>,
    renderCell: row => displayRoundedNumber(row.primaryObjectUncertainties?.crosstrackPositionUncertainty),
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
    renderCell: row => row.spaceTrackCdm[1]?.observationsTimespan,
    accessorKey: 'spaceTrackCdm',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.position_radial')}</div>,
    renderCell: row => displayRoundedNumber(row.secondaryObjectUncertainties?.radialPositionUncertainty),
    accessorKey: 'secondaryObjectUncertainties',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.position_in_track')}</div>,
    renderCell: row => displayRoundedNumber(row.secondaryObjectUncertainties?.intrackPositionUncertainty),
    accessorKey: 'secondaryObjectUncertainties',
  }, {
    header: <div className="font-normal">{t('event_history.sub_table.position_cross_track')}</div>,
    renderCell: row => displayRoundedNumber(row.secondaryObjectUncertainties?.crosstrackPositionUncertainty),
    accessorKey: 'secondaryObjectUncertainties',
  }];

  return <InformationsTable rows={rows} data={object} reducedFont headerCellWidth="sm" />;
};

export { ConjunctionEventHistoryDetailTable };
