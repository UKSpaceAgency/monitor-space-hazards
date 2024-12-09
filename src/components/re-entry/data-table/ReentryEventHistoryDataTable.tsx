import { getTips } from '@/actions/getTips';
import { DataTable } from '@/components/DataTable';

import { renderReentryHistoryDetailAsSubcomponent } from '../tables/ReentryEventHistoryDetailTable';
import { reentryEventHistoryColumns } from './ReentryEventHistoryDataTableColumns';

type ReentryEventHistoryDataTableProps = {
  noradId: string;
  dataPdf?: string;
};

const ReentryEventHistoryDataTable = async ({ noradId, dataPdf }: ReentryEventHistoryDataTableProps) => {
  const tips = await getTips(noradId);

  return (
    <div data-pdf={dataPdf}>
      <DataTable
        columns={reentryEventHistoryColumns}
        data={tips}
        renderSubComponent={renderReentryHistoryDetailAsSubcomponent}
      />
    </div>
  );
};

export { ReentryEventHistoryDataTable };
