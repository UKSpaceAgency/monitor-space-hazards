'use client';

import type { ColumnSort } from '@tanstack/react-table';
import { camelCase } from 'lodash';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import type { TypeGetReentryEventsParams, TypeReentryEventOut } from '@/__generated__/data-contracts';
import { getReentryEvents } from '@/actions/getReentryEvents';
import { getSatellites } from '@/actions/getSatellites';
import { DownloadData } from '@/components/DownloadData';
import InfiniteTable from '@/components/InfiniteTable';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { reentriesColumns } from './ReentriesDataTableColumns';

type ReentriesDataTableProps = {
  initialData: TypeReentryEventOut[];
  params: TypeGetReentryEventsParams;
  haveAccessToAlerts?: boolean;
};

const ReentriesDataTable = ({ initialData, params, haveAccessToAlerts }: ReentriesDataTableProps) => {
  const t = useTranslations('Tables');

  const initialSort: ColumnSort[] = useMemo(() => [{
    id: camelCase(params.sort_by),
    desc: params.sort_order === 'desc',
  }], [params]);

  return (
    <>
      <InfiniteTable<TypeReentryEventOut, TypeGetReentryEventsParams>
        initialData={initialData}
        params={params}
        columns={reentriesColumns(haveAccessToAlerts)}
        fetcher={getReentryEvents}
        queryKeys={[QUERY_KEYS.Reentries]}
        initialSort={initialSort}
      />
      <DownloadData type={t('Download.types.reentry_events')} params={params} downloadAction={getSatellites} />
    </>
  );
};

export { ReentriesDataTable };
