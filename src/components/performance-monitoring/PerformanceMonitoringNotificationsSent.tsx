import { getTranslations } from 'next-intl/server';

import type { TypeGetStatsNotificationsSentParams } from '@/__generated__/data-contracts';
import { getStatsNotificationsSent } from '@/actions/getStatsNotificationsSent';

import { DownloadData } from '../DownloadData';
import { PerformanceMonitoringNotificationsSentDataTable } from './data-table/PerformanceMonitoringNotificationsSentDataTable';

const PerformanceMonitoringNotificationsSent = async () => {
  const t = await getTranslations('Tables.Performance_monitoring.notifications_sent');

  const params: TypeGetStatsNotificationsSentParams = {
    limit: 50,
    sort_order: 'desc',
  };

  const data = await getStatsNotificationsSent(params);

  return (
    <div>
      <PerformanceMonitoringNotificationsSentDataTable data={data} params={params} />
      <DownloadData type={t('this_table')} params={params} downloadAction={getStatsNotificationsSent} />
    </div>
  );
};

export { PerformanceMonitoringNotificationsSent };
