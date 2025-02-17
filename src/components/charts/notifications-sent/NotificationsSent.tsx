'use client';

import { useTranslations } from 'next-intl';

import type { NotificationsSentStatsType } from '@/actions/getStatsNotificationsSent';
import type { DataRangeType } from '@/hooks/useDataRange';

import BaseChart from '../base/BaseChart';
import { chartPalette } from '../base/theme';
import { DateRange } from '../date-range/date-range';

export type NotificationsSentChartProps = {
  data: NotificationsSentStatsType[];
  dataRange: DataRangeType;
  handleDataRangeChange: (dataRange: DataRangeType) => void;
};

export function NotificationsSentChart({
  data,
  dataRange,
  handleDataRangeChange,
}: NotificationsSentChartProps) {
  const t = useTranslations('Charts.Notifications_sent');

  const actionButtons = <DateRange dataRange={dataRange} handleDataRangeChange={handleDataRangeChange} />;

  const datasets = {
    labels: data.map(({ date }) => date),
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
  };

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
