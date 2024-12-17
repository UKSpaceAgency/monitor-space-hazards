import type { TypeDataSourcesOut, TypeEventSummaryOut } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';

import { ConjunctionEventHistoryDataTable } from '../data-table/ConjunctionEventHistoryDataTable';
import { getEventHistoryColumns } from '../data-table/ConjunctionEventHistoryDataTableColumns';
import { ConjunctionEventHistoryDetailTable } from './ConjunctionEventHistoryDetailTable';

type ConjunctionEventHistoryTableProps = {
  events: TypeEventSummaryOut[];
  event: TypeEventSummaryOut;
  dataSources: TypeDataSourcesOut;
};

const ConjunctionEventHistoryTable = ({ events, event, dataSources }: ConjunctionEventHistoryTableProps) => {
  const eventHistoryColumns = getEventHistoryColumns();

  return (
    <div className="overflow-auto">
      <DataTable
        data={events}
        columns={eventHistoryColumns}
        renderSubComponent={() => (
          <div className="govuk-details__text" data-pdf-ignore>
            <ConjunctionEventHistoryDataTable object={event} />
            <ConjunctionEventHistoryDetailTable object={{
              ...event,
              ...dataSources,
            }}
            />
          </div>
        )}
      />
    </div>
  );
};

export { ConjunctionEventHistoryTable };
