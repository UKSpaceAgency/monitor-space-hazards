'use client';
import { useTranslations } from 'next-intl';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';

type ConjunctionObjectDataGeneralInformations = Pick<
  TypeSatelliteOut,
'commonName' | 'noradId' | 'internationalDesignator' | 'objectType'
>;

type ConjunctionObjectDataGeneralTableProps = {
  data: ConjunctionObjectDataGeneralInformations | ConjunctionObjectDataGeneralInformations[];
};

const ConjunctionObjectDataGeneralTable = ({ data }: ConjunctionObjectDataGeneralTableProps) => {
  const t = useTranslations('Tables.Conjunction');

  const rows: InformationsTableRow<ConjunctionObjectDataGeneralInformations>[] = [{
    header: t('object_data.general_summary.common_name'),
    accessorKey: 'commonName',
  }, {
    header: t('object_data.general_summary.norad_id'),
    accessorKey: 'noradId',
  }, {
    header: t('object_data.general_summary.international_designator'),
    accessorKey: 'internationalDesignator',
  }, {
    header: t('object_data.general_summary.object_type'),
    accessorKey: 'objectType',
  }];

  return <InformationsTable rows={rows} data={data} headerCellWidth="xs" />;
};

export { ConjunctionObjectDataGeneralTable };
