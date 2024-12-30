import { getTranslations } from 'next-intl/server';

import type { AnalysisAndManoeuvreSupportStatsParams } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import { getStatsAnalysisAndManoeuvreSupport } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import { dayjs, FORMAT_API_DATE } from '@/libs/Dayjs';
import Details from '@/ui/details/details';

import { PerformanceMonitoringUksaConjunctionEventContent } from './PerformanceMonitoringUksaConjunctionEventContent';

const PerformanceMonitoringUksaConjunctionEvent = async () => {
  const t = await getTranslations('Performance_monitoring.performance_accordion.uksa');

  const params: AnalysisAndManoeuvreSupportStatsParams = {
    start_date: dayjs().subtract(7, 'day').format(FORMAT_API_DATE),
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
