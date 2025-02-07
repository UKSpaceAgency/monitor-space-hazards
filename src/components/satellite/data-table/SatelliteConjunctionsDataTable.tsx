import type { ColumnSort } from '@tanstack/react-table';
import camelCase from 'lodash/camelCase';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import type { TypeEventOut, TypeGetConjunctionEventsListParams } from '@/__generated__/data-contracts';
import { getConjunctions } from '@/actions/getConjunctions';
import { DownloadData } from '@/components/DownloadData';
import InfiniteTable from '@/components/InfiniteTable';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { satteliteConjunctionColumns } from './SatelliteConjunctionsDataTableColumns';

type SatelliteConjunctionsDataTableProps = {
  params: TypeGetConjunctionEventsListParams;
  initialData: TypeEventOut[];
};

const SatelliteConjunctionsDataTable = async ({ params, initialData }: SatelliteConjunctionsDataTableProps) => {
  const t = useTranslations('Tables');

  const initialSort: ColumnSort[] = useMemo(() => [{
    id: camelCase(params.sort_by),
    desc: params.sort_order === 'desc',
  }], [params]);

  return (
    <>
      <InfiniteTable<TypeEventOut, TypeGetConjunctionEventsListParams>
        initialData={initialData}
        params={params}
        columns={satteliteConjunctionColumns}
        fetcher={getConjunctions}
        queryKeys={[QUERY_KEYS.Conjunctions]}
        initialSort={initialSort}
      />
      <DownloadData type={t('Download.types.satellite_events', { epoch: params.epoch === 'future' ? 'upcoming' : 'previous' })} params={params} downloadAction={getConjunctions} />
    </>
  );
};

export { SatelliteConjunctionsDataTable };
