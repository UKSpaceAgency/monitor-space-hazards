import type { AnalysisAndManoeuvreSupportStatsParams } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import { getStatsAnalysisAndManoeuvreSupport } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import { dayjs, FORMAT_API_DATE } from '@/libs/Dayjs';

import { PerformanceMonitoringUksaConjunctionEventContent } from './PerformanceMonitoringUksaConjunctionEventContent';

const PerformanceMonitoringUksaConjunctionEvent = async () => {
  const params: AnalysisAndManoeuvreSupportStatsParams = {
    start_date: dayjs().subtract(7, 'day').format(FORMAT_API_DATE),
  };

  const data = await getStatsAnalysisAndManoeuvreSupport(params);

  return <PerformanceMonitoringUksaConjunctionEventContent data={data} params={params} />;
};

export { PerformanceMonitoringUksaConjunctionEvent };
