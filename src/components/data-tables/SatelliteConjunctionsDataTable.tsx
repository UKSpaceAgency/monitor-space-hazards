import type { ColumnSort } from '@tanstack/react-table';
import camelCase from 'lodash/camelCase';
import { getTranslations } from 'next-intl/server';

import type { TypeEpoch, TypeEventOut, TypeGetConjunctionEventsListParams } from '@/__generated__/data-contracts';
import { getConjunctions } from '@/actions/getConjunctions';
import { DownloadData } from '@/components/DownloadData';
import InfiniteTable from '@/components/InfiniteTable';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { satteliteConjunctionColumns } from './columns/SatelliteConjunctionsColumns';

type SatelliteConjunctionsDataTableProps = {
  query?: string;
  epoch?: TypeEpoch;
  noradId?: string;
};

const SatelliteConjunctionsDataTable = async ({ query, epoch, noradId }: SatelliteConjunctionsDataTableProps) => {
  const t = await getTranslations('Tables');
  const params: TypeGetConjunctionEventsListParams = {
    search_like: query,
    norad_id: noradId,
    sort_by: 'tca_time',
    sort_order: epoch === 'future' ? 'asc' : 'desc',
    epoch,
    limit: 50,
  };
  const initialSort: ColumnSort[] = [{
    id: camelCase(params.sort_by),
    desc: params.sort_order === 'desc',
  }];

  const data = await getConjunctions(params);

  const downloadData = async () => {
    'use server';
    const downloadParams: TypeGetConjunctionEventsListParams = {
      ...params,
      limit: 9999999,
    };
    return getConjunctions(downloadParams);
  };

  return (
    <>
      <InfiniteTable<TypeEventOut, TypeGetConjunctionEventsListParams>
        initialData={data}
        params={params}
        columnsFn={satteliteConjunctionColumns}
        fetcher={getConjunctions}
        queryKeys={[QUERY_KEYS.Conjunctions]}
        initialSort={initialSort}
      />
      <DownloadData type={t('Download.types.satellite_events', { epoch: epoch === 'future' ? 'upcoming' : 'previous' })} downloadData={downloadData} />
    </>
  );
};

export { SatelliteConjunctionsDataTable };
