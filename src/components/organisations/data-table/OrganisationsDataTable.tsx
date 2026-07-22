'use client';

import type { TypeOrganizationOut } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';

import { organisationsColumns } from './OrganisationsDataTableColumns';

type OrganisationsDataTableProps = {
  data: TypeOrganizationOut[];
};

const OrganisationsDataTable = ({ data }: OrganisationsDataTableProps) => {
  return (
    <div className="overflow-auto max-h-[500px]">
      <DataTable
        data={data}
        columns={organisationsColumns}
      />
    </div>
  );
};

export { OrganisationsDataTable };
