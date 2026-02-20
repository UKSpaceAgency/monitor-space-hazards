import { useTranslations } from 'next-intl';
import type { HTMLProps } from 'react';

import type { TypeEventSummaryOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import Tag from '@/ui/tag/tag';
import { displayExponential, getAbsoluteValue, rounded } from '@/utils/Math';

type ConjunctionEventSummaryTableInformations = Pick<
  TypeEventSummaryOut,
'cdm_external_id' | 'collision_probability' | 'collision_probability_method' | 'tca_time' | 'miss_distance' | 'radial_miss_distance' | 'intrack_miss_distance' | 'crosstrack_miss_distance' | 'update_time' | 'primary_object_size' | 'secondary_object_size' | 'primary_object_cdm_type'
>;

type ConjunctionEventSummaryTableInformationsTableProps = {
  data: ConjunctionEventSummaryTableInformations | ConjunctionEventSummaryTableInformations[];
};

const ConjunctionEventSummaryTableInformationsTable = ({ data }: ConjunctionEventSummaryTableInformationsTableProps) => {
  const t = useTranslations('Tables.Conjunction');

  const eventDetailsHeaders: HTMLProps<HTMLTableCellElement>[] = [{
    children: <div className="hidden">{t('summary_list.description')}</div>,
  }, {
    children: t('summary_list.space_track_cdm'),
  }, ...(Array.isArray(data)
    ? [{
        children: t('summary_list.uksa_analysis'),
      }]
    : [])];

  const baseInformations: InformationsTableRow<ConjunctionEventSummaryTableInformations>[] = [{
    header: t('summary_list.cdm_id'),
    accessorKey: 'cdm_external_id',
    renderCell: row => (
      <>
        {row.cdm_external_id}
        {row.primary_object_cdm_type === 'Special owner/operator ephemeris' && <Tag className="ml-2">{t('summary_list.special')}</Tag>}
      </>
    ),
  }, {
    header: t('summary_list.probability_of_collision'),
    accessorKey: 'collision_probability',
    renderCell: row => displayExponential(row.collision_probability, 4) ?? '-',
  }, {
    header: t('summary_list.probability_of_collision_calc_method'),
    accessorKey: 'collision_probability_method',
  }, {
    header: t('summary_list.time_of_closest_approach'),
    renderCell: row => dayjs(row.tca_time).format(FORMAT_DATE_TIME),
    accessorKey: 'tca_time',
  }, {
    header: t('summary_list.total_miss_distance'),
    accessorKey: 'miss_distance',
  }, {
    header: t('summary_list.radial_miss_distance'),
    renderCell: row => getAbsoluteValue(row.radial_miss_distance),
    accessorKey: 'radial_miss_distance',
  }, {
    header: t('summary_list.in_track_miss_distance'),
    renderCell: row => getAbsoluteValue(row.intrack_miss_distance),
    accessorKey: 'intrack_miss_distance',
  }, {
    header: t('summary_list.cross_track_miss_distance'),
    renderCell: row => getAbsoluteValue(row.crosstrack_miss_distance),
    accessorKey: 'crosstrack_miss_distance',
  }, {
    header: t('summary_list.time_of_update'),
    renderCell: row => dayjs(row.update_time).format(FORMAT_DATE_TIME),
    accessorKey: 'update_time',
  }, {
    header: t('summary_list.primary_object_size'),
    accessorKey: 'primary_object_size',
    renderCell: row => row.primary_object_size ? rounded(row.primary_object_size) : '-',
  }, {
    header: t('summary_list.secondary_object_size'),
    accessorKey: 'secondary_object_size',
    renderCell: row => row.secondary_object_size ? rounded(row.secondary_object_size) : '-',
  }];

  return <InformationsTable headers={eventDetailsHeaders} rows={baseInformations} data={data} headerCellWidth="sm" />;
};

export { ConjunctionEventSummaryTableInformationsTable };
