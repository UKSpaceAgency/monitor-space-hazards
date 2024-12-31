import type { TypeGetStatsNotificationsSentParams } from '@/__generated__/data-contracts';
import { getStatsNotificationsSent } from '@/actions/getStatsNotificationsSent';
import { dayjs, FORMAT_API_DATE_TIME } from '@/libs/Dayjs';

import { MonitoringNotificationsSentContent } from './MonitoringNotificationsSentContent';

const MonitoringNotificationsSent = async () => {
  const params: TypeGetStatsNotificationsSentParams = {
    limit: 9999,
    sort_order: 'desc',
    start_date: dayjs().hour(12).minute(0).second(0).subtract(7, 'day').format(FORMAT_API_DATE_TIME),
  };

  const data = await getStatsNotificationsSent(params);

  return <MonitoringNotificationsSentContent data={data} params={params} />;
};

export { MonitoringNotificationsSent };
