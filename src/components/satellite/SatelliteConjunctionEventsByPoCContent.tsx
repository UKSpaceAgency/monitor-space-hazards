'use client';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { getStatsMonthlyConjunctionEventsByNoradId } from '@/actions/getStatsMonthlyConjunctionEventsByNoradId';
import EventsByProbabilityOfCollisionChart from '@/components/charts/events-by-probability/EventsByProbability';
import { MonitoringEventsByProbabilityOfCollisionDataTable } from '@/components/performance-monitoring/conjunction-events-monitoring/data-table/MonitoringEventsByProbabilityOfCollisionDataTable';
import Spinner from '@/ui/spinner/spinner';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';
import { QUERY_KEYS } from '@/utils/QueryKeys';

type SatelliteConjunctionEventsByPoCContentProps = {
  noradId: string;
};

const SatelliteConjunctionEventsByPoCContent = ({ noradId }: SatelliteConjunctionEventsByPoCContentProps) => {
  const t = useTranslations('Charts.Events_by_probability_of_collision');
  const tActions = useTranslations('Charts.Actions');
  const [showMonths, setShowMonths] = useState(12);

  const actionButtons = (
    <ToggleButtons
      name="satellite-events-by-probability-of-collision-data-range"
      ariaLabel="Conjunction events by probability of collision"
      items={[
        {
          id: '12_months',
          title: tActions('last_12_months'),
          ariaLabel: tActions('last_12_months'),
          value: 12,
        },
        {
          id: 'all_time',
          title: tActions('all_time'),
          ariaLabel: tActions('all_time'),
          value: 0,
        },
      ]}
      active={showMonths}
      setActive={setShowMonths}
      title={t('data_range')}
    />
  );

  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.StatsConjunctionEventByProbabilityOfCollision, noradId, showMonths],
    queryFn: () => getStatsMonthlyConjunctionEventsByNoradId({ noradId, months: showMonths }),
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

  if (!data || data.reduce((acc, curr) => {
    return acc + curr.high + curr.medium + curr.low;
  }, 0) === 0) {
    return <p className="govuk-body">{t('no_data')}</p>;
  }

  return (
    <div>
      <p className="govuk-body">{t('description')}</p>
      <EventsByProbabilityOfCollisionChart data={data ?? []} actionButtons={actionButtons} />
      <MonitoringEventsByProbabilityOfCollisionDataTable data={data ?? []} />
    </div>
  );
};

export { SatelliteConjunctionEventsByPoCContent };
