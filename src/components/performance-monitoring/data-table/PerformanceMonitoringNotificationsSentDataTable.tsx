'use client';
import { useTranslations } from 'next-intl';

import type { TypeGetStatsNotificationsSentParams } from '@/__generated__/data-contracts';
import type { NotificationsSentStatsType } from '@/actions/getStatsNotificationsSent';
import { getStatsNotificationsSent } from '@/actions/getStatsNotificationsSent';
import InfiniteTable from '@/components/InfiniteTable';

import { notificationsSentColumns } from './PerformanceMonitoringNotificationsSentDataTableColumns';

type PerformanceMonitoringNotificationsSentDataTableProps = {
  params: TypeGetStatsNotificationsSentParams;
  data: NotificationsSentStatsType[];
};

const PerformanceMonitoringNotificationsSentDataTable = ({ params, data }: PerformanceMonitoringNotificationsSentDataTableProps) => {
  const t = useTranslations('Tables.Performance_monitoring.notifications_sent');

  return (
    <InfiniteTable<NotificationsSentStatsType, TypeGetStatsNotificationsSentParams>
      initialData={data}
      params={params}
      columns={notificationsSentColumns}
      fetcher={getStatsNotificationsSent}
      queryKeys={[]}
      emptyLabel={t('empty_label')}
    />
  );
};

export { PerformanceMonitoringNotificationsSentDataTable };