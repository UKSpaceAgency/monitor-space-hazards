'use client';
import { useTranslations } from 'next-intl';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';

type ConjunctionObjectDataAdditionalInformations = Pick<
  TypeSatelliteOut,
'shape' | 'mass' | 'crossSectionAvg' | 'crossSectionMax' | 'crossSectionMin' | 'height' | 'width' | 'depth' | 'span' | 'diameter'
>;

type ConjunctionObjectDataAdditionalTableProps = {
  data: ConjunctionObjectDataAdditionalInformations | ConjunctionObjectDataAdditionalInformations[];
};

const ConjunctionObjectDataAdditionalTable = ({ data }: ConjunctionObjectDataAdditionalTableProps) => {
  const t = useTranslations('Tables.Conjunction');

  const rows: InformationsTableRow<ConjunctionObjectDataAdditionalInformations>[] = [{
    header: t('object_data.additional_object_summary.shape'),
    accessorKey: 'shape',
  }, {
    header: t('object_data.additional_object_summary.mass'),
    accessorKey: 'mass',
  }, {
    header: t('object_data.additional_object_summary.average_cross_section'),
    accessorKey: 'crossSectionAvg',
  }, {
    header: t('object_data.additional_object_summary.max_cross_section'),
    accessorKey: 'crossSectionMax',
  }, {
    header: t('object_data.additional_object_summary.min_cross_section'),
    accessorKey: 'crossSectionMin',
  }, {
    header: t('object_data.additional_object_summary.height'),
    accessorKey: 'height',
  }, {
    header: t('object_data.additional_object_summary.width'),
    accessorKey: 'width',
  }, {
    header: t('object_data.additional_object_summary.depth'),
    accessorKey: 'depth',
  }, {
    header: t('object_data.additional_object_summary.span'),
    accessorKey: 'span',
  }, {
    header: t('object_data.additional_object_summary.diameter'),
    accessorKey: 'diameter',
  }];

  return <InformationsTable rows={rows} data={data} headerCellWidth="xs" />;
};

export { ConjunctionObjectDataAdditionalTable };
