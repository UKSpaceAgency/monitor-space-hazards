'use client';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';
import { useSorting } from '@/hooks/useSorting';

import { organisationSatellitesTableColumns } from './OrganisationSatellitesTableColumns';

type OrganisationSatellitesTableProps = {
  satellites: TypeSatelliteOut[];
  emptyLabel?: string;
};

const OrganisationSatellitesTable = ({ satellites, emptyLabel = 'No satellites registered' }: OrganisationSatellitesTableProps) => {
  const { sorting, onSortingChange } = useSorting([]);

  return <DataTable columns={organisationSatellitesTableColumns} data={satellites} manualSorting={false} sorting={sorting} onSortingChange={onSortingChange} emptyLabel={emptyLabel} />;
};

export { OrganisationSatellitesTable };
