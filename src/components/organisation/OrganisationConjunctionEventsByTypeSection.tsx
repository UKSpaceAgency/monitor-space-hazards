'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { getStatsEventsByTypeForOrg } from '@/actions/getStatsEventsByTypeForOrg';
import Spinner from '@/ui/spinner/spinner';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { OrganisationConjunctionEventsByType } from './data-table/OrganisationConjunctionEventsByType';

type OrganisationConjunctionEventsByTypeSectionProps = {
  organisationId: string;
  organisationName: string;
};

const OrganisationConjunctionEventsByTypeSection = ({
  organisationId,
  organisationName,
}: OrganisationConjunctionEventsByTypeSectionProps) => {
  const tActions = useTranslations('Charts.Actions');
  const [showMonths, setShowMonths] = useState(12);

  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.StatsConjunctionEventByType, 'organisation', organisationId, showMonths],
    queryFn: () => getStatsEventsByTypeForOrg(organisationId, showMonths),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const actionButtons = (
    <ToggleButtons
      name="conjunction-events-by-type-data-range"
      ariaLabel="Conjunction events by type"
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
    <OrganisationConjunctionEventsByType
      stats={data}
      organisationName={organisationName}
      actionButtons={actionButtons}
    />
  );
};

export { OrganisationConjunctionEventsByTypeSection };
