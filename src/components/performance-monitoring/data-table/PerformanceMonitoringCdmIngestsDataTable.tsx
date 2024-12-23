'use client';
import { useTranslations } from 'next-intl';

import type { TypeExternalDataPerformanceOut, TypeGetExternalDataPerformanceParams } from '@/__generated__/data-contracts';
import { getExternalDataPerformance } from '@/actions/getExternalDataPerformance';
import InfiniteTable from '@/components/InfiniteTable';

import { cdmIngestsColumns } from './PerformanceMonitoringCdmIngestsDataTableColumns';

type PerformanceMonitoringCdmIngestsDataTableProps = {
  params: TypeGetExternalDataPerformanceParams;
  data: TypeExternalDataPerformanceOut[];
};

const PerformanceMonitoringCdmIngestsDataTable = ({ params, data }: PerformanceMonitoringCdmIngestsDataTableProps) => {
  const t = useTranslations('Tables.Performance_monitoring.cdm_ingests');

  return (
    <InfiniteTable<TypeExternalDataPerformanceOut, TypeGetExternalDataPerformanceParams>
      initialData={data}
      params={params}
      columns={cdmIngestsColumns}
      fetcher={getExternalDataPerformance}
      queryKeys={[]}
      emptyLabel={t('empty_label')}
    />
  );
};

export { PerformanceMonitoringCdmIngestsDataTable };
