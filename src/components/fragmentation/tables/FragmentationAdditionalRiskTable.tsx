'use client';

import type { ScreeningResults } from '@/actions/getFragmentationEventScreeningResults';
import { DataTable } from '@/components/DataTable';
import { useSorting } from '@/hooks/useSorting';

import { fragmentationAdditionalRiskTableColumns } from './FragmentationAdditionalRiskTableColumns';

const FragmentationAdditionalRiskTable = ({ data }: { data: ScreeningResults[] }) => {
  const { sorting, onSortingChange } = useSorting([]);

  return <DataTable stickyHeader columns={fragmentationAdditionalRiskTableColumns} data={data} sorting={sorting} onSortingChange={onSortingChange} manualSorting={false} />;
};

export { FragmentationAdditionalRiskTable };
