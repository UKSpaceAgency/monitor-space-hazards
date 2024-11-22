import { useTranslations } from 'next-intl';

import type { TypeEventSummaryOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import dayjs, { FORMAT_DATE_TIME } from '@/libs/Dayjs';

type ConjunctionSummaryInformations = Pick<
  TypeEventSummaryOut,
'cdmExternalId' | 'collisionProbability' | 'collisionProbabilityMethod' | 'tcaTime' | 'missDistance' | 'radialMissDistance' | 'intrackMissDistance' | 'crosstrackMissDistance' | 'updateTime' | 'primaryObjectSize' | 'secondaryObjectSize'
>;

type ConjunctionSummaryInformationsTableProps = {
  object: ConjunctionSummaryInformations | ConjunctionSummaryInformations[];
};

const ConjunctionSummaryInformationsTable = ({ object }: ConjunctionSummaryInformationsTableProps) => {
  const t = useTranslations('Tables.Conjunction');

  const baseInformations: InformationsTableRow<ConjunctionSummaryInformations>[] = [{
    header: '',
    renderCell: () => <b className="w-2/5">{t('summary_list.space_track_cdm')}</b>,
    accessorKey: 'cdmExternalId',
  }, {
    header: t('summary_list.cdm_id'),
    accessorKey: 'cdmExternalId',
  }, {
    header: t('summary_list.probability_of_collision'),
    accessorKey: 'collisionProbability',
  }, {
    header: t('summary_list.probability_of_collision_calc_method'),
    accessorKey: 'collisionProbabilityMethod',
  }, {
    header: t('summary_list.time_of_closest_approach'),
    renderCell: row => <div>{dayjs(row.tcaTime).format(FORMAT_DATE_TIME)}</div>,
    accessorKey: 'tcaTime',
  }, {
    header: t('summary_list.total_miss_distance'),
    accessorKey: 'missDistance',
  }, {
    header: t('summary_list.radial_miss_distance'),
    accessorKey: 'radialMissDistance',
  }, {
    header: t('summary_list.in_track_miss_distance'),
    accessorKey: 'intrackMissDistance',
  }, {
    header: t('summary_list.cross_track_miss_distance'),
    accessorKey: 'crosstrackMissDistance',
  }, {
    header: t('summary_list.time_of_update'),
    renderCell: row => <div>{dayjs(row.updateTime).format(FORMAT_DATE_TIME)}</div>,
    accessorKey: 'updateTime',
  }, {
    header: t('summary_list.primary_object_size'),
    accessorKey: 'primaryObjectSize',
  }, {
    header: t('summary_list.secondary_object_size'),
    accessorKey: 'secondaryObjectSize',
  }];

  return <InformationsTable rows={baseInformations} data={object} narrowerHeaderCell />;
};

export { ConjunctionSummaryInformationsTable };
