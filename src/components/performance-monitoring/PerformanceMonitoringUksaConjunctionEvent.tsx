import { getTranslations } from 'next-intl/server';

import type { TypeGetExternalDataPerformanceAggregatedParams } from '@/__generated__/data-contracts';
import { getStatsAnalysisAndManoeuvreSupport } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import Details from '@/ui/details/details';

import { PerformanceMonitoringUksaConjunctionEventContent } from './PerformanceMonitoringUksaConjunctionEventContent';

const PerformanceMonitoringUksaConjunctionEvent = async () => {
  const t = await getTranslations('Performance_monitoring.performance_accordion.uksa');

  const params: TypeGetExternalDataPerformanceAggregatedParams = {
    limit: 9999,
    max_age_days: 7,
  };

  const data = await getStatsAnalysisAndManoeuvreSupport(params);

  return (
    <>
      <PerformanceMonitoringUksaConjunctionEventContent data={data} params={params} />
      <Details summary={t('details.title')}>
        {t('details.content')}
      </Details>
    </>
  );
};

export { PerformanceMonitoringUksaConjunctionEvent };
