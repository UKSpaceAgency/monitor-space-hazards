import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import type { InformationsTableHeaderWidth, InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';

export type BaseSatelliteInformations = Pick<TypeSatelliteOut, 'common_name' | 'norad_id' | 'international_designator' | 'object_type'>;

type BaseInformationsTableProps = {
  object: BaseSatelliteInformations | BaseSatelliteInformations[];
  headerCellWidth?: InformationsTableHeaderWidth;
  showLink?: true;
};

const BaseInformationsTable = async ({ object, headerCellWidth, showLink }: BaseInformationsTableProps) => {
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

  const baseInformations: InformationsTableRow<BaseSatelliteInformations>[] = [{
    header: t('Base.common_name'),
    accessorKey: 'common_name',
    renderCell: row => showLink ? <Link className="govuk-link" href={`/satellites/${row.norad_id}`}>{row.common_name}</Link> : <div>{row.common_name}</div>,
  }, {
    header: t('Base.norad_id'),
    accessorKey: 'norad_id',
  }, {
    header: t('Base.international_designator'),
    accessorKey: 'international_designator',
  }, {
    header: t('Base.object_type'),
    accessorKey: 'object_type',
  }];

  return <InformationsTable headers={headers} rows={baseInformations} data={object} headerCellWidth={headerCellWidth} />;
};

export { BaseInformationsTable };
