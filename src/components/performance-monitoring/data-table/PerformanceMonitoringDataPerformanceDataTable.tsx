'use client';
import { useTranslations } from 'next-intl';

import type { TypeExternalDataPerformanceOut, TypeGetExternalDataPerformanceParams } from '@/__generated__/data-contracts';
import { getExternalDataPerformance } from '@/actions/getExternalDataPerformance';
import InfiniteTable from '@/components/InfiniteTable';

import { dataPerformanceColumns } from './PerformanceMonitoringDataPerformanceDataTableColumns';

type PerformanceMonitoringDataPerformanceDataTableProps = {
  params: TypeGetExternalDataPerformanceParams;
  data: TypeExternalDataPerformanceOut[];
};

const PerformanceMonitoringDataPerformanceDataTable = ({ params, data }: PerformanceMonitoringDataPerformanceDataTableProps) => {
  const t = useTranslations('Tables.Performance_monitoring.data_performance');

  return (
    <InfiniteTable<TypeExternalDataPerformanceOut, TypeGetExternalDataPerformanceParams>
      initialData={data}
      params={params}
      columns={dataPerformanceColumns}
      fetcher={getExternalDataPerformance}
      queryKeys={[]}
      emptyLabel={t('empty_label')}
    />
  );
};

export { PerformanceMonitoringDataPerformanceDataTable };
