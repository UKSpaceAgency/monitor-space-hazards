import dayjs from 'dayjs';

import type { NotificationsSentStatsType } from '@/actions/getStatsNotificationsSent';
import { FORMAT_DATE } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';

export const notificationsSentColumns: TranslatedColumnDef<NotificationsSentStatsType>[] = [
  {
    accessorKey: 'date',
    id: 'date',
    header: 'Performance_monitoring.notifications_sent.date',
    cell: ({ getValue }) => {
      const date = getValue<Date>();

      return dayjs(date).format(FORMAT_DATE);
    },
    enableSorting: false,
  },
  {
    accessorKey: 'totalCount',
    id: 'totalCount',
    header: 'Performance_monitoring.notifications_sent.all',
    enableSorting: false,
  },
  {
    accessorKey: 'smsCount',
    id: 'smsCount',
    header: 'Performance_monitoring.notifications_sent.sms',
    enableSorting: false,
  },
  {
    accessorKey: 'emailCount',
    id: 'emailCount',
    header: 'Performance_monitoring.notifications_sent.email',
    enableSorting: false,
  },
];
