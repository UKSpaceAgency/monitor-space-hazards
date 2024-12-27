'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import type { TypeGetStatsNotificationsSentParams } from '@/__generated__/data-contracts';
import { getStatsNotificationsSent, type NotificationsSentStatsType } from '@/actions/getStatsNotificationsSent';
import Spinner from '@/ui/spinner/spinner';

import NotificationsSentChart from '../charts/notifications-sent/NotificationsSent';
import { DownloadData } from '../DownloadData';
import { PerformanceMonitoringNotificationsSentDataTable } from './data-table/PerformanceMonitoringNotificationsSentDataTable';

export type PerformanceMonitoringNotificationsSentContentProps = {
  data: NotificationsSentStatsType[];
  params: TypeGetStatsNotificationsSentParams;
};

const PerformanceMonitoringNotificationsSentContent = ({ data, params }: PerformanceMonitoringNotificationsSentContentProps) => {
  const t = useTranslations('Tables.Performance_monitoring.notifications_sent');

  const [startDate, setStartDate] = useState<string>(params.start_date ?? '');

  const fetchParams = {
    ...params,
    start_date: startDate,
  };

  const { data: fetchedData, isFetching, refetch } = useQuery({
    queryKey: ['stats-notifications-sent'],
    queryFn: () => getStatsNotificationsSent(fetchParams),
    initialData: data,
  });

  useEffect(() => {
    refetch();
  }, [refetch, startDate]);

  if (isFetching) {
    return (
      <div className="p-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <NotificationsSentChart data={fetchedData} setStartDate={setStartDate} startDate={startDate} />
      <PerformanceMonitoringNotificationsSentDataTable data={fetchedData} params={fetchParams} />
      <DownloadData type={t('this_table')} params={fetchParams} downloadAction={getStatsNotificationsSent} />
    </div>
  );
};

export { PerformanceMonitoringNotificationsSentContent };
