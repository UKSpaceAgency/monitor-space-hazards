import dayjs from 'dayjs';

import type { TypeGetStatsEventsTypeParams } from '@/__generated__/data-contracts';
import { getStatsEventsType } from '@/actions/getStatsEventsType';
import { FORMAT_API_DATE_TIME } from '@/libs/Dayjs';

import { PerformanceMonitoringConjunctionEventsByTypeContent } from './PerformanceMonitoringConjunctionEventsByTypeContent';

const PerformanceMonitoringConjunctionEventsByType = async () => {
  const today = dayjs().hour(12).minute(0).second(0);

  const params: TypeGetStatsEventsTypeParams = {
    start_date: today.subtract(7, 'day').format(FORMAT_API_DATE_TIME),
    end_date: today.format(FORMAT_API_DATE_TIME),
  };

  const data = await getStatsEventsType(params);

  return (
    <PerformanceMonitoringConjunctionEventsByTypeContent initialData={data} params={params} />
  );
};

export { PerformanceMonitoringConjunctionEventsByType };
