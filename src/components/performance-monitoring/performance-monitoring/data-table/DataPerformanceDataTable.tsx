'use client';
import { useQuery } from '@tanstack/react-query';
import type { ColumnSort } from '@tanstack/react-table';
import { camelCase } from 'lodash';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import type { TypeExternalDataPerformanceOut, TypeGetExternalDataPerformanceParams } from '@/__generated__/data-contracts';
import { getExternalDataPerformance } from '@/actions/getExternalDataPerformance';
import InfiniteTable from '@/components/InfiniteTable';
import Spinner from '@/ui/spinner/spinner';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { dataPerformanceColumns } from './DataPerformanceDataTableColumns';

type DataPerformanceDataTableProps = {
  params: TypeGetExternalDataPerformanceParams;
  ariaLabel?: string;
};

const DataPerformanceDataTable = ({ params, ariaLabel }: DataPerformanceDataTableProps) => {
  const t = useTranslations('Tables.Performance_monitoring.data_performance');

  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.DataPerformance, params],
    queryFn: () => getExternalDataPerformance(params),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const initialSort: ColumnSort[] = useMemo(() => [{
    id: camelCase(params.sort_by ?? ''),
    desc: params.sort_order === 'desc',
  }], [params]);

  if (isFetching || !data) {
    return (
      <div className="p-10">
        <Spinner />
      </div>
    );
  }

  return (
    <InfiniteTable<TypeExternalDataPerformanceOut, TypeGetExternalDataPerformanceParams>
      initialData={data}
      params={params}
      columns={dataPerformanceColumns}
      fetcher={getExternalDataPerformance}
      queryKeys={[QUERY_KEYS.DataPerformance]}
      emptyLabel={t('empty_label')}
      initialSort={initialSort}
      ariaLabel={ariaLabel}
    />
  );
};

export { DataPerformanceDataTable };
