'use client';

import { useTranslations } from 'next-intl';

import type { TypeFragmentationEvent } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';
import { fragmentationsColumns } from '@/components/fragmentations/data-table/FragmentationsDataTableColumns';

type SatelliteFragmentationsDataTableProps = {
  data: TypeFragmentationEvent[];
};

const SatelliteFragmentationsDataTable = ({ data }: SatelliteFragmentationsDataTableProps) => {
  const t = useTranslations('Tables');

  return (
    <DataTable<TypeFragmentationEvent>
      data={data}
      columns={fragmentationsColumns}
      emptyLabel={t('Fragmentations.empty_list_info')}
    />
  );
};

export { SatelliteFragmentationsDataTable };
