import type { TypeDataSourcesOut, TypeEventSummaryOut } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';

import { getEventHistoryColumns } from './columns';
import { ConjunctionEventHistoryDetailedTable } from './informations-tables/ConjunctionEventHistoryDetailedTable';
import { ConjunctionEventHistoryGeneralTable } from './informations-tables/ConjunctionEventHistoryGeneralTable';

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
