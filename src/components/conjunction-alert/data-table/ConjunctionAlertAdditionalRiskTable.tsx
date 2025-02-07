'use client';

import type { AdditionalObjectRisk } from '@/actions/getConjunctionEventAdditionalRisk';
import { DataTable } from '@/components/DataTable';
import { useSorting } from '@/hooks/useSorting';

import { conjunctionAlertAdditionalRiskTableColumns } from './ConjunctionAlertAdditionalRiskTableColumns';

const ConjunctionAlertAdditionalRiskTable = ({ data }: { data: AdditionalObjectRisk[] }) => {
  const { sorting, onSortingChange } = useSorting([]);

  return <DataTable stickyHeader columns={conjunctionAlertAdditionalRiskTableColumns} data={data} sorting={sorting} onSortingChange={onSortingChange} manualSorting={false} />;
};

export { ConjunctionAlertAdditionalRiskTable };
