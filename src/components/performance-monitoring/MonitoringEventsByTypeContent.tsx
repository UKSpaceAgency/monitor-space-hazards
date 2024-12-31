'use client';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import type { TypeGetStatsEventsTypeParams, TypeStatisticsEventsType } from '@/__generated__/data-contracts';
import { getStatsEventsType } from '@/actions/getStatsEventsType';
import { assertUnreachable } from '@/libs/assertUnreachable';
import { FORMAT_API_DATE_TIME } from '@/libs/Dayjs';
import Details from '@/ui/details/details';
import Spinner from '@/ui/spinner/spinner';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';

import EventsTypeChart from '../charts/events-type-chart/EventsTypeChart';
import { MonitoringEventsByTypeDataTable } from './data-table/MonitoringEventsByTypeDataTable';

type MonitoringEventsByTypeContentProps = {
  initialData: TypeStatisticsEventsType[];
  params: TypeGetStatsEventsTypeParams;
};

type DataRangeType = 'Upcoming events' | 'Last 7d' | 'Last 1 month' | 'Last 6 months';

const MonitoringEventsByTypeContent = ({ initialData, params }: MonitoringEventsByTypeContentProps) => {
  const t = useTranslations('Charts.Events_type');

  const [dataRange, setDataRange] = useState<DataRangeType>('Last 7d');
  const [dates, setDates] = useState<{ startDate: string; endDate?: string }>({
    startDate: params.start_date ?? '',
    endDate: params.end_date ?? '',
  });

  const today = dayjs().hour(12).minute(0).second(0);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['stats-event-type'],
    queryFn: () => getStatsEventsType({
      ...params,
      start_date: dates.startDate,
      end_date: dates.endDate,
    }),
    initialData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dates]);

  const handleDataRangeChange = (dataRange: DataRangeType) => {
    setDataRange(dataRange);

    switch (dataRange) {
      case 'Last 7d':
        setDates({
          startDate: today.subtract(7, 'day').format(FORMAT_API_DATE_TIME),
          endDate: today.format(FORMAT_API_DATE_TIME),
        });
        break;
      case 'Last 1 month':
        setDates({
          startDate: today.subtract(1, 'month').format(FORMAT_API_DATE_TIME),
          endDate: today.format(FORMAT_API_DATE_TIME),
        });
        break;
      case 'Last 6 months':
        setDates({
          startDate: today.subtract(6, 'month').format(FORMAT_API_DATE_TIME),
          endDate: today.format(FORMAT_API_DATE_TIME),
        });
        break;
      case 'Upcoming events':
        setDates({
          startDate: today.format(FORMAT_API_DATE_TIME),
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

  if (isFetching) {
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

export { MonitoringEventsByTypeContent };
