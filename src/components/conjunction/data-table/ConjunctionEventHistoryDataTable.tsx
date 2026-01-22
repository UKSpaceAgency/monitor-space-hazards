'use client';

import type { TypeDataSourcesOut, TypeEventSummaryOut } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';
import { useSorting } from '@/hooks/useSorting';

import { renderConjunctionHistoryDetailAsSubcomponent } from '../tables/ConjunctionEventHistoryDetailTable';
import { conjunctionEventHistoryColumns } from './ConjunctionEventHistoryDataTableColumns';

type ConjunctionEventHistoryTableProps = {
  events: TypeEventSummaryOut[];
  dataSources: TypeDataSourcesOut;
  dataPdf?: string;
};

const ConjunctionEventHistoryTable = ({ events, dataSources, dataPdf }: ConjunctionEventHistoryTableProps) => {
  const { sorting, onSortingChange } = useSorting([]);

  return (
    <div className="overflow-auto" data-pdf={dataPdf}>
      <DataTable
        data={events}
        columns={conjunctionEventHistoryColumns}
        renderSubComponent={({ row }) => renderConjunctionHistoryDetailAsSubcomponent({ object: {
          ...row.original,
          ...dataSources,
        } })}
        manualSorting={false}
        sorting={sorting}
        onSortingChange={onSortingChange}
      />
    </div>
  );
};

export { ConjunctionEventHistoryTable };
