import { getTranslations } from 'next-intl/server';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import type { InformationsTableHeaderWidth, InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';

type AdditionalInformations = Pick<TypeSatelliteOut, 'shape' | 'mass' | 'crossSectionAvg' | 'crossSectionMax' | 'crossSectionMin' | 'height' | 'width' | 'depth' | 'span' | 'diameter'>;

type AdditionalInformationsTableProps = {
  object: AdditionalInformations | AdditionalInformations[];
  headerCellWidth?: InformationsTableHeaderWidth;
};

const AdditionalInformationsTable = async ({ object, headerCellWidth }: AdditionalInformationsTableProps) => {
  const t = await getTranslations('Tables.Satellite_informations');

  const headers = Array.isArray(object)
    ? [{
        className: 'w-1/3',
        children: <div className="hidden">{t('Objects.description')}</div>,
      }, {
        className: 'w-1/3',
        children: t('Objects.primary'),
      }, {
        className: 'w-1/3',
        children: t('Objects.secondary'),
      }]
    : undefined;

  const baseInformations: InformationsTableRow<AdditionalInformations>[] = [{
    header: t('Additional.shape'),
    accessorKey: 'shape',
  }, {
    header: t('Additional.mass'),
    accessorKey: 'mass',
  }, {
    header: t('Additional.cross_section_avg'),
    accessorKey: 'crossSectionAvg',
    renderCell: row => row.crossSectionAvg?.toFixed(3) ?? '-',
  }, {
    header: t('Additional.cross_section_max'),
    accessorKey: 'crossSectionMax',
    renderCell: row => row.crossSectionMax?.toFixed(3) ?? '-',
  }, {
    header: t('Additional.cross_section_min'),
    accessorKey: 'crossSectionMin',
    renderCell: row => row.crossSectionMin?.toFixed(3) ?? '-',
  }, {
    header: t('Additional.height'),
    accessorKey: 'height',
  }, {
    header: t('Additional.width'),
    accessorKey: 'width',
  }, {
    header: t('Additional.depth'),
    accessorKey: 'depth',
  }, {
    header: t('Additional.span'),
    accessorKey: 'span',
  }, {
    header: t('Additional.diameter'),
    accessorKey: 'diameter',
  }];

  return <InformationsTable headers={headers} rows={baseInformations} data={object} headerCellWidth={headerCellWidth} />;
};

export { AdditionalInformationsTable };
