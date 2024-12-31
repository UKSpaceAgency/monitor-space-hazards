'use client';
import type { ColumnSort } from '@tanstack/react-table';
import { camelCase } from 'lodash';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import type { TypeExternalDataPerformanceOut, TypeGetExternalDataPerformanceParams } from '@/__generated__/data-contracts';
import { getExternalDataPerformance } from '@/actions/getExternalDataPerformance';
import InfiniteTable from '@/components/InfiniteTable';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { dataPerformanceColumns } from './MonitoringDataPerformanceDataTableColumns';

type MonitoringDataPerformanceDataTableProps = {
  params: TypeGetExternalDataPerformanceParams;
  data: TypeExternalDataPerformanceOut[];
};

const MonitoringDataPerformanceDataTable = ({ params, data }: MonitoringDataPerformanceDataTableProps) => {
  const t = useTranslations('Tables.Performance_monitoring.data_performance');

  const initialSort: ColumnSort[] = useMemo(() => [{
    id: camelCase(params.sort_by ?? ''),
    desc: params.sort_order === 'desc',
  }], [params]);

  return (
    <InfiniteTable<TypeExternalDataPerformanceOut, TypeGetExternalDataPerformanceParams>
      initialData={data}
      params={params}
      columns={dataPerformanceColumns}
      fetcher={getExternalDataPerformance}
      queryKeys={[QUERY_KEYS.DataPerformance]}
      emptyLabel={t('empty_label')}
      initialSort={initialSort}
    />
  );
};

export { MonitoringDataPerformanceDataTable };
