'use client';
import { useQuery } from '@tanstack/react-query';
import { uniq } from 'lodash';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { TypeGetStatsEventsByOrganizationParams } from '@/__generated__/data-contracts';
import { getStatsEventsByOrganization } from '@/actions/getStatsEventsByOrganization';
import { FORMAT_API_DATE_TIME, TODAY_DATE_TIME } from '@/libs/Dayjs';
import Select from '@/ui/select/select';
import Spinner from '@/ui/spinner/spinner';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';
import { assertUnreachable } from '@/utils/Helpers';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import EventsByOrganizationChart from '../charts/events-by-organisation/EventsByOrganisation';
import { MonitoringEventsByOrganisationDataTable } from './data-table/MonitoringEventsByOrganisationDataTable';

type PerformanceMonitoringConjunctionEventsByOrganisationContentProps = {
  isAnalysist: boolean;
};

type DataRangeType = 'Upcoming events' | 'Last 7d' | 'Last 1 month' | 'Last 6 months';

const MonitoringEventsByOrganisationContent = ({ isAnalysist }: PerformanceMonitoringConjunctionEventsByOrganisationContentProps) => {
  const t = useTranslations('Charts.Events_by_organisation');

  const params: TypeGetStatsEventsByOrganizationParams = {
    start_date: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
  };

  const [dataRange, setDataRange] = useState<DataRangeType>('Upcoming events');
  const [dates, setDates] = useState<{ startDate: string; endDate?: string }>({
    startDate: params.start_date ?? '',
    endDate: params.end_date ?? '',
  });

  const fetchParams = {
    ...params,
    start_date: dates.startDate,
    end_date: dates.endDate,
  };

  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.StatsEventByOrganisation, dates],
    queryFn: () => getStatsEventsByOrganization(fetchParams),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const [organisation, setOrganisation] = useState('');

  const organisations = useMemo(() => {
    return uniq(
      (data || []).filter(obj => obj.name !== 'Total')
        .map(obj => obj.name),
    )
      .sort()
      .map(organisationName => ({
        children: organisationName,
        value: organisationName,
      }));
  }, [data]);

  const filteredData = useMemo(() => {
    return [...(organisation ? (data || []).filter(obj => obj.name === organisation) : data || [])];
  }, [organisation, data]);

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setOrganisation(value);
  };

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
      name="events-by-organization-days"
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
      title="Date range"
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
      {isAnalysist && (
        <Select
          name="event-by-organisation-select"
          value={organisation}
          options={[
            {
              children: t('all_organisations'),
              value: '',
            },
            ...organisations,
          ]}
          onChange={selectChange}
        />
      )}
      <EventsByOrganizationChart data={filteredData} actionButtons={actionButtons} />
      <MonitoringEventsByOrganisationDataTable data={filteredData} params={fetchParams} />
    </div>
  );
};

export { MonitoringEventsByOrganisationContent };
