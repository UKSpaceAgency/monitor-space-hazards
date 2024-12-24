import type { TypeGetStatsNotificationsSentParams } from '@/__generated__/data-contracts';
import { getStatsNotificationsSent } from '@/actions/getStatsNotificationsSent';

import { PerformanceMonitoringNotificationsSentDataTable } from './data-table/PerformanceMonitoringNotificationsSentDataTable';

const PerformanceMonitoringNotificationsSent = async () => {
  const params: TypeGetStatsNotificationsSentParams = {
    limit: 50,
  };

  const data = await getStatsNotificationsSent(params);

  return (
    <div>
      <PerformanceMonitoringNotificationsSentDataTable data={data} params={params} />
    </div>
  );
};

export { PerformanceMonitoringNotificationsSent };
