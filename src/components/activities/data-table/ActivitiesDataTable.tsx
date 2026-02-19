'use client';

import { useTranslations } from 'next-intl';

import type { TypeActivityEventOut, TypeGetActivityEventsParams } from '@/__generated__/data-contracts';
import { getActivityEvents } from '@/actions/getActivityEvents';
import { DownloadData } from '@/components/DownloadData';
import InfiniteTable from '@/components/InfiniteTable';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { activitiesColumns } from './ActivitiesDataTableColumns';

type ActivitiesDataTableProps = {
  initialData: TypeActivityEventOut[];
  params: TypeGetActivityEventsParams;
};

const ActivitiesDataTable = ({ initialData, params }: ActivitiesDataTableProps) => {
  const t = useTranslations('Tables');

  return (
    <>
      <InfiniteTable<TypeActivityEventOut, TypeGetActivityEventsParams>
        initialData={initialData}
        params={params}
        columns={activitiesColumns}
        fetcher={getActivityEvents}
        queryKeys={[QUERY_KEYS.Activities]}
        focusable
      />
      <DownloadData type={t('Download.types.activities')} params={params} downloadAction={getActivityEvents} ariaLabel="Activities" />
    </>
  );
};

export { ActivitiesDataTable };
