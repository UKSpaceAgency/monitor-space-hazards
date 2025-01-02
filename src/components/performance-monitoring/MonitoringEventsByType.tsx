'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { TypeGetStatsEventsTypeParams } from '@/__generated__/data-contracts';
import { getStatsEventsType } from '@/actions/getStatsEventsType';
import { assertUnreachable } from '@/libs/assertUnreachable';
import { FORMAT_API_DATE_TIME, TODAY_DATE_TIME } from '@/libs/Dayjs';
import Details from '@/ui/details/details';
import Spinner from '@/ui/spinner/spinner';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import EventsTypeChart from '../charts/events-type-chart/EventsTypeChart';
import { MonitoringEventsByTypeDataTable } from './data-table/MonitoringEventsByTypeDataTable';

type DataRangeType = 'Upcoming events' | 'Last 7d' | 'Last 1 month' | 'Last 6 months';

const MonitoringEventsByType = () => {
  const t = useTranslations('Charts.Events_type');

  const params: TypeGetStatsEventsTypeParams = {
    start_date: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
  };

  const [dataRange, setDataRange] = useState<DataRangeType>('Upcoming events');
  const [dates, setDates] = useState<{ startDate: string; endDate?: string }>({
    startDate: params.start_date ?? '',
    endDate: params.end_date ?? '',
  });

  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.StatsEventByType, dates],
    queryFn: () => getStatsEventsType({
      ...params,
      start_date: dates.startDate,
      end_date: dates.endDate,
    }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
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
      case 'Upcoming events':
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
      name="events-type-days"
      items={[
        {
          title: t('upcoming_events'),
          ariaLabel: 'Upcoming events',
          value: 'Upcoming events',
        },
        {
          title: t('last_7d'),
          ariaLabel: 'Last 7 days',
          value: 'Last 7d',
        },
        {
          title: t('last_1_month'),
          ariaLabel: 'Last 1 month',
          value: 'Last 1 month',
        },
        {
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

  if (isFetching || !data) {
    return (
      <div className="p-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <p className="govuk-body">{t('description')}</p>
      <EventsTypeChart data={data} actionButtons={actionButtons} />
      <MonitoringEventsByTypeDataTable data={data} params={params} />
      <Details summary={t('details.title')}>
        {t('details.content')}
      </Details>
    </div>
  );
};

export { MonitoringEventsByType };
