'use client';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { getStatsMonthlyConjunctionEvents } from '@/actions/getStatsMonthlyConjunctionEvents';
import EventsByProbabilityOfCollisionChart from '@/components/charts/events-by-probability/EventsByProbability';
import Spinner from '@/ui/spinner/spinner';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { MonitoringEventsByProbabilityOfCollisionDataTable } from './data-table/MonitoringEventsByProbabilityOfCollisionDataTable';

const MonitoringEventsByProbabilityOfCollisionContent = () => {
  const t = useTranslations('Charts.Events_by_probability_of_collision');
  const [showMonths, setShowMonths] = useState(12);

  const actionButtons = (
    <ToggleButtons
      name="organisations-and-users-data-range"
      items={[
        {
          title: t('12_months'),
          ariaLabel: t('12_months'),
          value: 12,
        },
        {
          title: t('all_time'),
          ariaLabel: t('all_time'),
          value: 0,
        },
      ]}
      active={showMonths}
      setActive={setShowMonths}
      title={t('data_range')}
    />
  );

  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.StatsEventByOrganisation, showMonths],
    queryFn: () => getStatsMonthlyConjunctionEvents({ months: showMonths }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

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
      <EventsByProbabilityOfCollisionChart data={data ?? []} actionButtons={actionButtons} />
      <MonitoringEventsByProbabilityOfCollisionDataTable data={data ?? []} />
    </div>
  );
};

export { MonitoringEventsByProbabilityOfCollisionContent };
