import type { TypeGetStatsEventsTypeParams } from '@/__generated__/data-contracts';
import { getStatsEventsType } from '@/actions/getStatsEventsType';
import { FORMAT_API_DATE_TIME, TODAY_DATE_TIME } from '@/libs/Dayjs';

import { MonitoringEventsByTypeContent } from './MonitoringEventsByTypeContent';

const MonitoringEventsByType = async () => {
  const params: TypeGetStatsEventsTypeParams = {
    start_date: TODAY_DATE_TIME.subtract(7, 'day').format(FORMAT_API_DATE_TIME),
    end_date: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
  };

  const data = await getStatsEventsType(params);

  return (
    <MonitoringEventsByTypeContent initialData={data} params={params} />
  );
};

export { MonitoringEventsByType };
