'use client';

import { useQuery } from '@tanstack/react-query';

import { getStatsEventsBySatelliteForOrg } from '@/actions/getStatsEventsBySatelliteForOrg';
import Spinner from '@/ui/spinner/spinner';
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
  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.StatsEventBySatellite, 'organisation', organisationId],
    queryFn: () => getStatsEventsBySatelliteForOrg(organisationId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

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
    />
  );
};

export { OrganisationConjunctionEventsByPoCSection };
