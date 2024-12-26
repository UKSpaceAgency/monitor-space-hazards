import { getTranslations } from 'next-intl/server';

import type { AnalysisAndManoeuvreSupportStatsParams } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import { getStatsAnalysisAndManoeuvreSupport } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import Details from '@/ui/details/details';

import { PerformanceMonitoringAnalysisAndManoeuvreSupportDataTable } from './data-table/PerformanceMonitoringAnalysisAndManoeuvreSupportDataTable';

const PerformanceMonitoringUksaConjunctionEvent = async () => {
  const t = await getTranslations('Performance_monitoring.performance_accordion.uksa');

  const params: AnalysisAndManoeuvreSupportStatsParams = {
    start_date: '2024-01-01',
  };

  const data = await getStatsAnalysisAndManoeuvreSupport(params);

  return (
    <div>
      <PerformanceMonitoringAnalysisAndManoeuvreSupportDataTable data={data} params={params} />
      <Details summary={t('details.title')}>
        {t('details.content')}
      </Details>
    </div>
  );
};

export { PerformanceMonitoringUksaConjunctionEvent };
