'use client';
import { useTranslations } from 'next-intl';

import type { TypeGetExternalDataPerformanceAggregatedParams } from '@/__generated__/data-contracts';
import type { AnalysisAndManoeuvreSupportStatsType } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import { getStatsAnalysisAndManoeuvreSupport } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';

import { analysesAndManoeuvreSupport } from './PerformanceMonitoringAnalysisAndManoeuvreSupportDataTableColumns';

type PerformanceMonitoringConjunctionsByOrganisationDataTableProps = {
  params: TypeGetExternalDataPerformanceAggregatedParams;
  data: AnalysisAndManoeuvreSupportStatsType[];
};

const PerformanceMonitoringAnalysisAndManoeuvreSupportDataTable = ({ data, params }: PerformanceMonitoringConjunctionsByOrganisationDataTableProps) => {
  const t = useTranslations('Tables.Performance_monitoring.analyses_and_manoeuvre_support');

  return (
    <>
      <div className="overflow-auto max-h-[400px]">
        <DataTable
          columns={analysesAndManoeuvreSupport}
          data={data}
        />
      </div>
      <DownloadData type={t('analysis_and_manoeuvre_support')} params={params} downloadAction={getStatsAnalysisAndManoeuvreSupport} />
    </>
  );
};

export { PerformanceMonitoringAnalysisAndManoeuvreSupportDataTable };
