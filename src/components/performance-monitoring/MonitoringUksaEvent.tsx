import { getTranslations } from 'next-intl/server';

import type { TypeGetExternalDataPerformanceAggregatedParams } from '@/__generated__/data-contracts';
import { getStatsAnalysisAndManoeuvreSupport } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import Details from '@/ui/details/details';

import { MonitoringUksaEventContent } from './MonitoringUksaEventContent';

const MonitoringUksaEvent = async () => {
  const t = await getTranslations('Performance_monitoring.performance_accordion.uksa');

  const params: TypeGetExternalDataPerformanceAggregatedParams = {
    limit: 9999,
    sort_order: 'desc',
    max_age_days: 7,
  };

  const data = await getStatsAnalysisAndManoeuvreSupport(params);

  return (
    <>
      <MonitoringUksaEventContent data={data} params={params} />
      <Details summary={t('details.title')}>
        {t('details.content')}
      </Details>
    </>
  );
};

export { MonitoringUksaEvent };
