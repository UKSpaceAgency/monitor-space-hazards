'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { getStatsEventsBySatelliteForOrg } from '@/actions/getStatsEventsBySatelliteForOrg';
import Spinner from '@/ui/spinner/spinner';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { OrganisationConjunctionEventsByPoC } from './data-table/OrganisationConjunctionEventsByPoC';

type OrganisationConjunctionEventsByPoCSectionProps = {
  organisationId: string;
  organisationName: string;
};

const OrganisationConjunctionEventsByPoCSection = ({
  organisationId,
  organisationName,
}: OrganisationConjunctionEventsByPoCSectionProps) => {
  const tActions = useTranslations('Charts.Actions');
  const [showMonths, setShowMonths] = useState(12);

  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.StatsEventBySatellite, 'organisation', organisationId, showMonths],
    queryFn: () => getStatsEventsBySatelliteForOrg(organisationId, showMonths),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const actionButtons = (
    <ToggleButtons
      name="conjunction-events-by-poc-data-range"
      ariaLabel="Conjunction events by poc"
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
      title={tActions('data_range')}
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
    <OrganisationConjunctionEventsByPoC
      stats={data}
      organisationName={organisationName}
      actionButtons={actionButtons}
    />
  );
};

export { OrganisationConjunctionEventsByPoCSection };
