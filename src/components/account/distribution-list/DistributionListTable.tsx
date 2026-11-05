'use client';

import type { TypeAlertSettingsDistributionListOut } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';
import { useSorting } from '@/hooks/useSorting';

import { distributionListColumns } from './columns';

export const DistributionListTable = ({ data }: { data: TypeAlertSettingsDistributionListOut[] }) => {
  const { sorting, onSortingChange } = useSorting([]);

  return (
    <div className="overflow-auto max-h-[500px]">
      <DataTable
        data={data}
        columns={distributionListColumns}
        largerText
        sorting={sorting}
        onSortingChange={onSortingChange}
        manualSorting={false}
      />
    </div>
  );
};
