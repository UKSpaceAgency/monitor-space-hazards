'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import type { TypeGetStatsNotificationsSentParams } from '@/__generated__/data-contracts';
import { getStatsNotificationsSent, type NotificationsSentStatsType } from '@/actions/getStatsNotificationsSent';
import { assertUnreachable } from '@/libs/assertUnreachable';
import { FORMAT_API_DATE_TIME, TODAY_DATE_TIME } from '@/libs/Dayjs';
import Spinner from '@/ui/spinner/spinner';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import NotificationsSentChart from '../charts/notifications-sent/NotificationsSent';
import { DownloadData } from '../DownloadData';
import { MonitoringNotificationsSentDataTable } from './data-table/MonitoringNotificationsSentDataTable';

export type MonitoringNotificationsSentContentProps = {
  data: NotificationsSentStatsType[];
  params: TypeGetStatsNotificationsSentParams;
};

type DataRangeType = '7d' | '30d' | 'All';

const MonitoringNotificationsSentContent = ({ data, params }: MonitoringNotificationsSentContentProps) => {
  const t = useTranslations('Tables.Performance_monitoring.notifications_sent');

  const [startDate, setStartDate] = useState(params.start_date ?? '');
  const [dataRange, setDataRange] = useState<DataRangeType>('7d');

  const fetchParams = {
    ...params,
    start_date: startDate,
  };

  const { data: fetchedData, isFetching, refetch } = useQuery({
    queryKey: [QUERY_KEYS.StatsNotificationsSent],
    queryFn: () => getStatsNotificationsSent(fetchParams),
    initialData: data,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch, startDate]);

  const handleDataRangeChange = (dataRange: DataRangeType) => {
    setDataRange(dataRange);

    switch (dataRange) {
      case '7d':
        setStartDate(TODAY_DATE_TIME.subtract(7, 'day').format(FORMAT_API_DATE_TIME));
        break;
      case '30d':
        setStartDate(TODAY_DATE_TIME.subtract(1, 'month').format(FORMAT_API_DATE_TIME));
        break;
      case 'All':
        setStartDate(TODAY_DATE_TIME.subtract(9999, 'day').format(FORMAT_API_DATE_TIME));
        break;
      default:
        assertUnreachable(dataRange);
    }
  };

  const actionButtons = (
    <ToggleButtons
      name="notifications-send-days"
      items={[
        {
          title: '7d',
          ariaLabel: '7 days',
          value: '7d',
        },
        {
          title: '30d',
          ariaLabel: '30 days',
          value: '30d',
        },
        {
          title: 'All',
          ariaLabel: 'All time',
          value: 'All',
        },
      ]}
      active={dataRange}
      setActive={handleDataRangeChange}
      title={t('data_range')}
    />
  );

  if (isFetching) {
    return (
      <div className="p-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <NotificationsSentChart data={fetchedData} actionButtons={actionButtons} />
      <MonitoringNotificationsSentDataTable data={fetchedData} params={fetchParams} />
      <DownloadData type={t('this_table')} params={fetchParams} downloadAction={getStatsNotificationsSent} />
    </div>
  );
};

export { MonitoringNotificationsSentContent };
