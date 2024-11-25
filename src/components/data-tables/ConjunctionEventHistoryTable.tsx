import type { TypeDataSourcesOut, TypeEventSummaryOut } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';

import { ConjunctionEventHistoryDetailedTable } from '../conjunctions/conjunction/event-history-table/informations-tables/ConjunctionEventHistoryDetailedTable';
import { ConjunctionEventHistoryGeneralTable } from '../conjunctions/conjunction/event-history-table/informations-tables/ConjunctionEventHistoryGeneralTable';
import { getEventHistoryColumns } from './columns/ConjunctionEventHistoryColumns/ConjunctionEventHistoryColumns';

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
          <div className="govuk-details__text">
            <ConjunctionEventHistoryGeneralTable object={event} />
            <ConjunctionEventHistoryDetailedTable object={{
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
