'use client';

import type { TypeUserOut } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';
import { useSorting } from '@/hooks/useSorting';

import { organisationUsersTableColumns } from './OrganisationUsersTableColumns';

type OrganisationUsersTableProps = {
  users: TypeUserOut[];
  emptyLabel?: string;
};

const OrganisationUsersTable = ({ users, emptyLabel = 'No users registered' }: OrganisationUsersTableProps) => {
  const { sorting, onSortingChange } = useSorting([]);

  return <DataTable columns={organisationUsersTableColumns} data={users} manualSorting={false} sorting={sorting} onSortingChange={onSortingChange} emptyLabel={emptyLabel} />;
};

export { OrganisationUsersTable };
