import type { TypeEpoch } from '@/__generated__/data-contracts';
import { getConjunctionEventsList } from '@/actions/getConjunctionEventsList';
import { getSatellites } from '@/actions/getSatellites';

import { OrganisationConjunctionsDataTable } from './data-table/OrganisationConjunctionsDataTable';

type OrganisationConjunctionEventsProps = {
  organisationId: string;
  organisationName: string;
  epoch?: TypeEpoch;
};

const OrganisationConjunctionEvents = async ({
  organisationId,
  organisationName,
  epoch,
}: OrganisationConjunctionEventsProps) => {
  const satellites = await getSatellites({ organization_id: organisationId });

  // TODO: The backend GET /v1/conjunction-events/list endpoint does not support filtering by
  // organisation_id. As a workaround we fetch per satellite NORAD ID and merge results.
  // Request backend to add organisation_id param to avoid N fetches per page load.
  const noradIds = satellites
    .map(s => s.norad_id)
    .filter((id): id is string => !!id);

  const conjunctionsByNorad = await Promise.all(
    noradIds.map(noradId =>
      getConjunctionEventsList({ norad_id: noradId, epoch: epoch ?? 'future', limit: 50 }),
    ),
  );

  const allConjunctions = conjunctionsByNorad
    .flat()
    .sort((a, b) => new Date(a.tca_time).getTime() - new Date(b.tca_time).getTime());

  return (
    <OrganisationConjunctionsDataTable
      initialData={allConjunctions}
      epoch={epoch}
      organisationName={organisationName}
    />
  );
};

export { OrganisationConjunctionEvents };
