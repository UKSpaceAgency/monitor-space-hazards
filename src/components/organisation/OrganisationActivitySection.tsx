'use client';

import { useQuery } from '@tanstack/react-query';

import { getOrganisationActivity } from '@/actions/getOrganisationActivity';
import Spinner from '@/ui/spinner/spinner';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { OrganisationActivityDataTable } from './data-table/OrganisationActivityDataTable';
import { OrganisationActivityEventsByReason } from './data-table/OrganisationActivityEventsByReason';

type OrganisationActivitySectionProps = {
  organisationId: string;
  organisationName: string;
  section: 'all' | 'by_reason';
};

const OrganisationActivitySection = ({
  organisationId,
  organisationName,
  section,
}: OrganisationActivitySectionProps) => {
  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.Activities, 'organisation', organisationId],
    queryFn: () => getOrganisationActivity(organisationId),
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

  if (section === 'by_reason') {
    return (
      <OrganisationActivityEventsByReason
        initialData={data.allActivity}
        satellites={data.satellites}
        organisationName={organisationName}
      />
    );
  }

  return (
    <OrganisationActivityDataTable
      initialData={data.allActivity}
      satellites={data.satellites}
      organisationName={organisationName}
    />
  );
};

export { OrganisationActivitySection };
