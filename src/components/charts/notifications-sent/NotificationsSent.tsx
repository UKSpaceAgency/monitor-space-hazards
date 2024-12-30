'use client';

import { useTranslations } from 'next-intl';
import type { Dispatch, SetStateAction } from 'react';

import type { NotificationsSentStatsType } from '@/actions/getStatsNotificationsSent';
import { dayjs, FORMAT_API_DATE_TIME } from '@/libs/Dayjs';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';

import BaseChart from '../base/BaseChart';
import { chartPalette } from '../base/theme';

export type NotificationsSentChartProps = {
  data: NotificationsSentStatsType[];
  setStartDate: Dispatch<SetStateAction<string>>;
  startDate: string;
};

export function NotificationsSentChart({
  data,
  setStartDate,
  startDate,
}: NotificationsSentChartProps) {
  const t = useTranslations('Charts.Notifications_sent');

  const datasets = {
    labels: data.map(({ date }) => date as string),
    datasets: [
      {
        label: t('all_notifications'),
        data: data.map(({ totalCount }) => totalCount ?? 0),
        borderColor: chartPalette.darkBlue,
        backgroundColor: chartPalette.darkBlue,
      },
      {
        label: t('sms_messages'),
        data: data.map(({ smsCount }) => smsCount ?? 0),
        borderColor: chartPalette.orange,
        backgroundColor: chartPalette.orange,
      },
      {
        label: t('emails'),
        data: data.map(({ emailCount }) => emailCount ?? 0),
        borderColor: chartPalette.darkPink,
        backgroundColor: chartPalette.darkPink,
      },
    ],
  } as any;

  const today = dayjs().hour(12).minute(0).second(0);

  const actionButtons = (
    <ToggleButtons
      name="notifications-send-days"
      items={[
        {
          title: '7d',
          ariaLabel: '7 days',
          value: today.subtract(7, 'day').format(FORMAT_API_DATE_TIME),
        },
        {
          title: '30d',
          ariaLabel: '30 days',
          value: today.subtract(30, 'day').format(FORMAT_API_DATE_TIME),
        },
        {
          title: 'All',
          ariaLabel: 'All time',
          value: today.subtract(9999, 'day').format(FORMAT_API_DATE_TIME),
        },
      ]}
      active={startDate}
      setActive={setStartDate}
      title={t('data_range')}
    />
  );

  return (
    <div className="mb-4">
      <BaseChart
        name="notifications-send-chart"
        id="notifications-sent-chart"
        actionButtons={actionButtons}
        data={datasets}
        yAxisTitle={t('number_of_notifications')}
        xAxisTitle={t('date')}
        isDay
        legend={{ title: t('notification_type') }}
      />
    </div>
  );
}

export default NotificationsSentChart;
