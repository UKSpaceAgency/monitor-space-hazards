'use client';

import type { TypeOrganizationOut } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';
import { useSorting } from '@/hooks/useSorting';

import { organisationsColumns } from './OrganisationsDataTableColumns';

type OrganisationsDataTableProps = {
  data: TypeOrganizationOut[];
};

const OrganisationsDataTable = ({ data }: OrganisationsDataTableProps) => {
  const { sorting, onSortingChange } = useSorting([]);

  return (
    <div className="overflow-auto max-h-[500px]">
      <DataTable
        data={data}
        columns={organisationsColumns}
        manualSorting={false}
        sorting={sorting}
        onSortingChange={onSortingChange}
      />
    </div>
  );
};

export { OrganisationsDataTable };
