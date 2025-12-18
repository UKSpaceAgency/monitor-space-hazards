'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { TypeGetStatsEventsTypeParams } from '@/__generated__/data-contracts';
import { getStatsFragmentationEventsType } from '@/actions/getStatsFragmentationEventsType';
import FragmentationEventsTypeChart from '@/components/charts/fragmentation-events-type-chart/FragmentationEventsTypeChart';
import { DataTable } from '@/components/DataTable';
import { Scrollable } from '@/components/Scrollable';
import { FORMAT_API_DATE_TIME, TODAY_DATE_TIME } from '@/libs/Dayjs';
import Spinner from '@/ui/spinner/spinner';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';
import { assertUnreachable } from '@/utils/Helpers';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { eventsByTypeDailyFragmentationMonitoringColumns } from './data-table/MonitoringFragmentationEventsByTypeDailyDataTableColumns';

type DataRangeType = 'Last 7d' | 'Last 1 month' | 'Last 6 months';

const MonitoringFragmentationEventsByTypeDaily = () => {
  const t = useTranslations('Charts.Events_type');

  const params: TypeGetStatsEventsTypeParams = {
    start_date: TODAY_DATE_TIME.subtract(7, 'day').format(FORMAT_API_DATE_TIME),
    end_date: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
  };

  const [dataRange, setDataRange] = useState<DataRangeType>('Last 7d');
  const [dates, setDates] = useState<{ startDate: string; endDate?: string }>({
    startDate: params.start_date ?? '',
    endDate: params.end_date ?? '',
  });

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.StatsFragmentationEventByType, dates],
    queryFn: () => getStatsFragmentationEventsType({
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
      case 'Last 7d':
        setDates({
          startDate: TODAY_DATE_TIME.subtract(7, 'day').format(FORMAT_API_DATE_TIME),
          endDate: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
        });
        break;
      case 'Last 1 month':
        setDates({
          startDate: TODAY_DATE_TIME.subtract(1, 'month').format(FORMAT_API_DATE_TIME),
          endDate: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
        });
        break;
      case 'Last 6 months':
        setDates({
          startDate: TODAY_DATE_TIME.subtract(6, 'month').format(FORMAT_API_DATE_TIME),
          endDate: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
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
          id: 'last_7d',
          title: t('last_7d'),
          ariaLabel: 'Last 7 days',
          value: 'Last 7d',
        },
        {
          id: 'last_1_month',
          title: t('last_1_month'),
          ariaLabel: 'Last 1 month',
          value: 'Last 1 month',
        },
        {
          id: 'last_6_months',
          title: t('last_6_months'),
          ariaLabel: 'Last 6 months',
          value: 'Last 6 months',
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
      <FragmentationEventsTypeChart data={data} actionButtons={actionButtons} />
      <Scrollable>
        <DataTable
          columns={eventsByTypeDailyFragmentationMonitoringColumns}
          data={data}
          ariaLabel="Information on Fragmentation Events by type Daily"
        />
      </Scrollable>
    </div>
  );
};

export { MonitoringFragmentationEventsByTypeDaily };
