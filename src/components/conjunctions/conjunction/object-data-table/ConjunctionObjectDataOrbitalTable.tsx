'use client';
import { useTranslations } from 'next-intl';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';

type ConjunctionObjectDataOrbitalInformations = Pick<
  TypeSatelliteOut,
'apogee' | 'perigee' | 'inclination' | 'period'
>;

type ConjunctionObjectDataOrbitalTableProps = {
  data: ConjunctionObjectDataOrbitalInformations | ConjunctionObjectDataOrbitalInformations[];
};

const ConjunctionObjectDataOrbitalTable = ({ data }: ConjunctionObjectDataOrbitalTableProps) => {
  const t = useTranslations('Tables.Conjunction');

  const rows: InformationsTableRow<ConjunctionObjectDataOrbitalInformations>[] = [{
    header: t('object_data.orbital_summary.apogee'),
    accessorKey: 'apogee',
  }, {
    header: t('object_data.orbital_summary.perigee'),
    accessorKey: 'perigee',
  }, {
    header: t('object_data.orbital_summary.inclination'),
    accessorKey: 'inclination',
  }, {
    header: t('object_data.orbital_summary.period'),
    accessorKey: 'period',
  }];

  return <InformationsTable rows={rows} data={data} headerCellWidth="xs" />;
};

export { ConjunctionObjectDataOrbitalTable };
