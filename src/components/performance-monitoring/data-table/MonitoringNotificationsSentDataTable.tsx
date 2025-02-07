'use client';
import type { ColumnSort } from '@tanstack/react-table';
import { camelCase } from 'lodash';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import type { TypeGetStatsNotificationsSentParams } from '@/__generated__/data-contracts';
import type { NotificationsSentStatsType } from '@/actions/getStatsNotificationsSent';
import { getStatsNotificationsSent } from '@/actions/getStatsNotificationsSent';
import InfiniteTable from '@/components/InfiniteTable';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { notificationsSentColumns } from './MonitoringNotificationsSentDataTableColumns';

type MonitoringNotificationsSentDataTableProps = {
  params: TypeGetStatsNotificationsSentParams;
  data: NotificationsSentStatsType[];
};

const MonitoringNotificationsSentDataTable = ({ params, data }: MonitoringNotificationsSentDataTableProps) => {
  const t = useTranslations('Tables.Performance_monitoring.notifications_sent');

  const initialSort: ColumnSort[] = useMemo(() => [{
    id: camelCase(params.start_date ?? ''),
    desc: params.sort_order === 'desc',
  }], [params]);

  return (
    <InfiniteTable<NotificationsSentStatsType, TypeGetStatsNotificationsSentParams>
      initialData={data}
      params={params}
      columns={notificationsSentColumns}
      fetcher={getStatsNotificationsSent}
      queryKeys={[QUERY_KEYS.NotificationsSent]}
      emptyLabel={t('empty_label')}
      initialSort={initialSort}
    />
  );
};

export { MonitoringNotificationsSentDataTable };
