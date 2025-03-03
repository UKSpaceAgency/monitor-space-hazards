'use client';

import type { NotificationsSentStatsType } from '@/actions/getStatsNotificationsSent';
import { DataTable } from '@/components/DataTable';
import { Scrollable } from '@/components/Scrollable';

import { notificationsSentColumns } from './NotificationsSentDataTableColumns';

type MonitoringNotificationsSentDataTableProps = {
  data: NotificationsSentStatsType[];
};

const MonitoringNotificationsSentDataTable = ({ data }: MonitoringNotificationsSentDataTableProps) => {
  return (
    <Scrollable>
      <DataTable
        data={data}
        columns={notificationsSentColumns}
      />
    </Scrollable>
  );
};

export { MonitoringNotificationsSentDataTable };
