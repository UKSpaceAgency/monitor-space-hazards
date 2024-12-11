'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import type { InformationsTableHeaderWidth, InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';

type BaseSatelliteInformations = Pick<TypeSatelliteOut, 'commonName' | 'noradId' | 'internationalDesignator' | 'objectType'>;

type BaseInformationsTableProps = {
  object: BaseSatelliteInformations | BaseSatelliteInformations[];
  headerCellWidth?: InformationsTableHeaderWidth;
  showLink?: true;
};

const BaseInformationsTable = ({ object, headerCellWidth, showLink }: BaseInformationsTableProps) => {
  const t = useTranslations('Tables.Satellite_informations');

  const headers = Array.isArray(object)
    ? [{
        className: 'w-1/3',
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
    accessorKey: 'commonName',
    renderCell: row => showLink ? <Link className="govuk-link" href={`/satellites/${row.noradId}`}>{row.commonName}</Link> : <div>{row.commonName}</div>,
  }, {
    header: t('Base.norad_id'),
    accessorKey: 'noradId',
  }, {
    header: t('Base.international_designator'),
    accessorKey: 'internationalDesignator',
  }, {
    header: t('Base.object_type'),
    accessorKey: 'objectType',
  }];

  return <InformationsTable headers={headers} rows={baseInformations} data={object} headerCellWidth={headerCellWidth} />;
};

export { BaseInformationsTable };
