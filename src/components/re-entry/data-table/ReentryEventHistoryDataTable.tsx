import { getTips } from '@/actions/getTips';
import { DataTable } from '@/components/DataTable';

import { renderReentryHistoryDetailAsSubcomponent } from '../tables/ReentryEventHistoryDetailTable';
import { reentryEventHistoryColumns } from './ReentryEventHistoryDataTableColumns';

type ReentryEventHistoryDataTableProps = {
  noradId: string;
};

const ReentryEventHistoryDataTable = async ({ noradId }: ReentryEventHistoryDataTableProps) => {
  const tips = await getTips(noradId);

  return (
    <DataTable
      columns={reentryEventHistoryColumns}
      data={tips}
      renderSubComponent={renderReentryHistoryDetailAsSubcomponent}
    />
  );
};

export { ReentryEventHistoryDataTable };
