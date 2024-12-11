'use client';
import { useTranslations } from 'next-intl';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import type { InformationsTableHeaderWidth, InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';

type OrbitalSatelliteInformations = Pick<TypeSatelliteOut, 'apogee' | 'perigee' | 'inclination' | 'period'>;

type OrbitalInformationsTableProps = {
  object: OrbitalSatelliteInformations | OrbitalSatelliteInformations[];
  headerCellWidth?: InformationsTableHeaderWidth;
};

const OrbitalInformationsTable = ({ object, headerCellWidth }: OrbitalInformationsTableProps) => {
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

  const baseInformations: InformationsTableRow<OrbitalSatelliteInformations>[] = [{
    header: t('Orbital.apogee'),
    accessorKey: 'apogee',
  }, {
    header: t('Orbital.perigee'),
    accessorKey: 'perigee',
  }, {
    header: t('Orbital.inclination'),
    accessorKey: 'inclination',
  }, {
    header: t('Orbital.period'),
    accessorKey: 'period',
  }];

  return <InformationsTable caption={t('Orbital.caption')} headers={headers} rows={baseInformations} data={object} headerCellWidth={headerCellWidth} />;
};

export { OrbitalInformationsTable };
