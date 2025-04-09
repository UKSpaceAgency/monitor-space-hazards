'use client';

import { useQuery } from '@tanstack/react-query';

import type { TypeGetStatsNotificationsSentParams } from '@/__generated__/data-contracts';
import { getStatsNotificationsSent } from '@/actions/getStatsNotificationsSent';
import NotificationsSentChart, { } from '@/components/charts/notifications-sent/NotificationsSent';
import { useDataRange } from '@/hooks/useDataRange';
import { FORMAT_API_DATE_TIME, TODAY_DATE_TIME } from '@/libs/Dayjs';
import Spinner from '@/ui/spinner/spinner';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { MonitoringNotificationsSentDataTable } from './data-table/NotificationsSentDataTable';

const NotificationsSentDaily = () => {
  const params: TypeGetStatsNotificationsSentParams = {
    limit: 9999,
    sort_order: 'desc',
    start_date: TODAY_DATE_TIME.subtract(7, 'day').format(FORMAT_API_DATE_TIME),
  };
  const { startDate, dataRange, handleDataRangeChange } = useDataRange({ initialStartDate: params.start_date ?? '' });

  const fetchParams = {
    ...params,
    start_date: startDate,
  };

  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.StatsNotificationsSent, startDate],
    queryFn: () => getStatsNotificationsSent(fetchParams),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    placeholderData: prev => prev,
  });

  if (isFetching || !data) {
    return (
      <div className="p-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <NotificationsSentChart data={data} dataRange={dataRange} handleDataRangeChange={handleDataRangeChange} />
      <MonitoringNotificationsSentDataTable data={data} />
    </div>
  );
};

export { NotificationsSentDaily };
