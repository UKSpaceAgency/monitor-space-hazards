import { useTranslations } from 'next-intl';

import type { TypeEventSummaryOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import Tag from '@/ui/tag/tag';
import { getAbsoluteValue } from '@/utils/Math';

type ConjunctionEventSummaryTableInformations = Pick<
  TypeEventSummaryOut,
'cdmExternalId' | 'collisionProbability' | 'collisionProbabilityMethod' | 'tcaTime' | 'missDistance' | 'radialMissDistance' | 'intrackMissDistance' | 'crosstrackMissDistance' | 'updateTime' | 'primaryObjectSize' | 'secondaryObjectSize' | 'primaryObjectCdmType'
>;

type ConjunctionEventSummaryTableInformationsTableProps = {
  object: ConjunctionEventSummaryTableInformations | ConjunctionEventSummaryTableInformations[];
};

const ConjunctionEventSummaryTableInformationsTable = ({ object }: ConjunctionEventSummaryTableInformationsTableProps) => {
  const t = useTranslations('Tables.Conjunction');

  const baseInformations: InformationsTableRow<ConjunctionEventSummaryTableInformations>[] = [{
    header: '',
    renderCell: () => <b className="w-2/5">{t('summary_list.space_track_cdm')}</b>,
    accessorKey: 'cdmExternalId',
  }, {
    header: t('summary_list.cdm_id'),
    accessorKey: 'cdmExternalId',
    renderCell: row => (
      <>
        {row.cdmExternalId}
        {row.primaryObjectCdmType === 'Special owner/operator ephemeris' && <Tag className="ml-2">{t('summary_list.special')}</Tag>}
      </>
    ),
  }, {
    header: t('summary_list.probability_of_collision'),
    accessorKey: 'collisionProbability',
    renderCell: row => row.collisionProbability?.toExponential(4),
  }, {
    header: t('summary_list.probability_of_collision_calc_method'),
    accessorKey: 'collisionProbabilityMethod',
  }, {
    header: t('summary_list.time_of_closest_approach'),
    renderCell: row => dayjs(row.tcaTime).format(FORMAT_DATE_TIME),
    accessorKey: 'tcaTime',
  }, {
    header: t('summary_list.total_miss_distance'),
    accessorKey: 'missDistance',
  }, {
    header: t('summary_list.radial_miss_distance'),
    renderCell: row => getAbsoluteValue(row.radialMissDistance),
    accessorKey: 'radialMissDistance',
  }, {
    header: t('summary_list.in_track_miss_distance'),
    renderCell: row => getAbsoluteValue(row.intrackMissDistance),
    accessorKey: 'intrackMissDistance',
  }, {
    header: t('summary_list.cross_track_miss_distance'),
    renderCell: row => getAbsoluteValue(row.crosstrackMissDistance),
    accessorKey: 'crosstrackMissDistance',
  }, {
    header: t('summary_list.time_of_update'),
    renderCell: row => dayjs(row.updateTime).format(FORMAT_DATE_TIME),
    accessorKey: 'updateTime',
  }, {
    header: t('summary_list.primary_object_size'),
    accessorKey: 'primaryObjectSize',
  }, {
    header: t('summary_list.secondary_object_size'),
    accessorKey: 'secondaryObjectSize',
  }];

  return <InformationsTable rows={baseInformations} data={object} headerCellWidth="sm" />;
};

export { ConjunctionEventSummaryTableInformationsTable };
