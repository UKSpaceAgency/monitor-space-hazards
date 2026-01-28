'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { TypeGetStatsEventsTypeParams } from '@/__generated__/data-contracts';
import { getStatsReentryEventsType } from '@/actions/getStatsReentryEventsType';
import { ReentryEventsTypeChart } from '@/components/charts/reentry-events-type-chart/ReentryEventsTypeChart';
import { DataTable } from '@/components/DataTable';
import { Scrollable } from '@/components/Scrollable';
import { FORMAT_API_DATE_TIME, TODAY_DATE_TIME } from '@/libs/Dayjs';
import Spinner from '@/ui/spinner/spinner';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';
import { assertUnreachable } from '@/utils/Helpers';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { eventsByTypeDailyReentryMonitoringColumns } from './data-table/MonitoringReentryEventsByTypeDailyDataTableColumns';

type DataRangeType = 0 | 7 | 30 | 180;

const MonitoringReentryEventsByTypeDaily = () => {
  const t = useTranslations('Charts.Events_type');
  const tActions = useTranslations('Charts.Actions');

  const params: TypeGetStatsEventsTypeParams = {
    start_date: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
  };

  const [dataRange, setDataRange] = useState<DataRangeType>(0);
  const [dates, setDates] = useState<{ startDate: string; endDate?: string }>({
    startDate: params.start_date ?? '',
    endDate: params.end_date ?? '',
  });

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.StatsReentryEventByType, dates],
    queryFn: () => getStatsReentryEventsType({
      ...params,
      start_date: dates.startDate,
      end_date: dates.endDate,
    }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    placeholderData: prev => prev,
  });

  const handleDataRangeChange = (dataRange: DataRangeType) => {
    setDataRange(dataRange);

    switch (dataRange) {
      case 7:
        setDates({
          startDate: TODAY_DATE_TIME.subtract(7, 'day').format(FORMAT_API_DATE_TIME),
          endDate: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
        });
        break;
      case 30:
        setDates({
          startDate: TODAY_DATE_TIME.subtract(1, 'month').format(FORMAT_API_DATE_TIME),
          endDate: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
        });
        break;
      case 180:
        setDates({
          startDate: TODAY_DATE_TIME.subtract(6, 'month').format(FORMAT_API_DATE_TIME),
          endDate: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
        });
        break;
      case 0:
        setDates({
          startDate: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
        });
        break;
      default:
        assertUnreachable(dataRange);
    }
  };

  const actionButtons = (
    <ToggleButtons
      name="reentry-events-by-type-daily"
      ariaLabel="Reentry events by type"
      items={[
        {
          id: 'upcoming_events',
          title: tActions('upcoming_events'),
          ariaLabel: tActions('upcoming_events'),
          value: 0,
        },
        {
          id: 'last_7d',
          title: tActions('last_7_days'),
          ariaLabel: tActions('last_7_days'),
          value: 7,
        },
        {
          id: 'last_1_month',
          title: tActions('last_30_days'),
          ariaLabel: tActions('last_30_days'),
          value: 30,
        },
        {
          id: 'last_6_months',
          title: tActions('last_6_months'),
          ariaLabel: tActions('last_6_months'),
          value: 180,
        },
      ]}
      active={dataRange}
      setActive={handleDataRangeChange}
      title={t('data_range')}
    />
  );

  if (isLoading || !data) {
    return (
      <div className="p-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <ReentryEventsTypeChart data={data} actionButtons={actionButtons} />
      <Scrollable>
        <DataTable
          columns={eventsByTypeDailyReentryMonitoringColumns}
          data={data}
          ariaLabel="Information on Reentry Events by type Daily"
        />
      </Scrollable>
    </div>
  );
};

export { MonitoringReentryEventsByTypeDaily };
