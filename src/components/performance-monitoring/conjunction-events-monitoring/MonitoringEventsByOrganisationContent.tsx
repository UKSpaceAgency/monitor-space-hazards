'use client';
import { useQuery } from '@tanstack/react-query';
import { uniq } from 'lodash';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { TypeGetStatsEventsByOrganizationParams } from '@/__generated__/data-contracts';
import { getStatsEventsByOrganization } from '@/actions/getStatsEventsByOrganization';
import EventsByOrganizationChart from '@/components/charts/events-by-organisation/EventsByOrganisation';
import { FORMAT_API_DATE_TIME, TODAY_DATE_TIME } from '@/libs/Dayjs';
import Select from '@/ui/select/select';
import Spinner from '@/ui/spinner/spinner';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';
import { assertUnreachable } from '@/utils/Helpers';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { MonitoringEventsByOrganisationDataTable } from './data-table/MonitoringEventsByOrganisationDataTable';

type PerformanceMonitoringConjunctionEventsByOrganisationContentProps = {
  isAnalysist: boolean;
};

type DataRangeType = 0 | 7 | 30 | 182;

const MonitoringEventsByOrganisationContent = ({ isAnalysist }: PerformanceMonitoringConjunctionEventsByOrganisationContentProps) => {
  const t = useTranslations('Charts.Events_by_organisation');
  const tActions = useTranslations('Charts.Actions');

  const params: TypeGetStatsEventsByOrganizationParams = {
    start_date: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
  };

  const [dataRange, setDataRange] = useState<DataRangeType>(0);
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
    return [...(organisation ? (data || []).filter(obj => obj.name === organisation) : data || [])].sort((a, b) => b.total_events - a.total_events);
  }, [organisation, data]);

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setOrganisation(value);
  };

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
      case 182:
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
      name="events-by-organization-days"
      ariaLabel="Conjunction events by organisation"
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
          id: 'last_30_days',
          title: tActions('last_30_days'),
          ariaLabel: tActions('last_30_days'),
          value: 30,
        },
        {
          id: 'last_6_months',
          title: tActions('last_6_months'),
          ariaLabel: tActions('last_6_months'),
          value: 182,
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
          label={t('events_by_organisation_select_label')}
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
