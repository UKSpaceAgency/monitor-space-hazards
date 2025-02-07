'use client';
import type { TypeDataSourcesOut, TypeEventSummaryOut } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';

import { renderConjunctionHistoryDetailAsSubcomponent } from '../tables/ConjunctionEventHistoryDetailTable';
import { conjunctionEventHistoryColumns } from './ConjunctionEventHistoryDataTableColumns';

type ConjunctionEventHistoryTableProps = {
  events: TypeEventSummaryOut[];
  event: TypeEventSummaryOut;
  dataSources: TypeDataSourcesOut;
  dataPdf?: string;
};

const ConjunctionEventHistoryTable = ({ events, event, dataSources, dataPdf }: ConjunctionEventHistoryTableProps) => {
  return (
    <div className="overflow-auto" data-pdf={dataPdf}>
      <DataTable
        data={events}
        columns={conjunctionEventHistoryColumns}
        renderSubComponent={() => renderConjunctionHistoryDetailAsSubcomponent({ object: {
          ...event,
          ...dataSources,
        } })}
      />
    </div>
  );
};

export { ConjunctionEventHistoryTable };
