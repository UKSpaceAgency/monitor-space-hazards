'use client';

import type { TypeActivityEventOut, TypeGetActivityEventsParams } from '@/__generated__/data-contracts';
import { getActivityEvents } from '@/actions/getActivityEvents';
import InfiniteTable from '@/components/InfiniteTable';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { activitiesColumns } from './ActivitiesDataTableColumns';

type ActivitiesDataTableProps = {
  activities: TypeActivityEventOut[];
  params: TypeGetActivityEventsParams;
};

const ActivitiesDataTable = ({ activities, params }: ActivitiesDataTableProps) => {
  return (
    <InfiniteTable<TypeActivityEventOut, TypeGetActivityEventsParams>
      initialData={activities}
      params={params}
      columns={activitiesColumns}
      fetcher={getActivityEvents}
      queryKeys={[QUERY_KEYS.Activities]}
      focusable
    />
  );
};

export { ActivitiesDataTable };
