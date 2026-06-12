import { getActivityEventsByNoradId } from '@/actions/getActivityEventsNoradId';
import { getSatellites } from '@/actions/getSatellites';

import { OrganisationActivityDataTable } from './OrganisationActivityDataTable';

type OrganisationActivityEventsProps = {
  organisationId: string;
  organisationName: string;
};

const OrganisationActivityEvents = async ({
  organisationId,
  organisationName,
}: OrganisationActivityEventsProps) => {
  const satellites = await getSatellites({ organization_id: organisationId });

  // TODO: The backend GET /v1/activity-events/ endpoint does not support filtering by
  // organisation_id. As a workaround we fetch per satellite NORAD ID and merge results.
  // Request backend to add organisation_id param to avoid N fetches per page load.
  const noradIds = satellites
    .map(s => ({ noradId: s.norad_id, name: s.common_name }))
    .filter((s): s is { noradId: string; name: string } => !!s.noradId);

  const activityBySatellite = await Promise.all(
    noradIds.map(({ noradId }) => getActivityEventsByNoradId(noradId)),
  );

  const allActivity = activityBySatellite
    .flat()
    .sort((a, b) => new Date(b.flag_date).getTime() - new Date(a.flag_date).getTime());

  return (
    <OrganisationActivityDataTable
      initialData={allActivity}
      satellites={noradIds}
      organisationName={organisationName}
    />
  );
};

export { OrganisationActivityEvents };
