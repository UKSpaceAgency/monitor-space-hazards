import { getActivityEventsByNoradId } from '@/actions/getActivityEventsNoradId';
import { getSatellites } from '@/actions/getSatellites';

import { OrganisationActivityDataTable } from './OrganisationActivityDataTable';
import { OrganisationActivityEventsByReason } from './OrganisationActivityEventsByReason';

type OrganisationActivitySectionProps = {
  organisationId: string;
  organisationName: string;
  section: 'all' | 'by_reason';
};

const OrganisationActivitySection = async ({
  organisationId,
  organisationName,
  section,
}: OrganisationActivitySectionProps) => {
  const satellites = await getSatellites({ organization_id: organisationId });

  const satelliteList = satellites
    .map(s => ({ noradId: s.norad_id, name: s.common_name }))
    .filter((s): s is { noradId: string; name: string } => !!s.noradId);

  // TODO: The backend GET /v1/activity-events/ endpoint does not support filtering by
  // organisation_id. As a workaround we fetch per satellite NORAD ID and merge results.
  // Request backend to add organisation_id param to avoid N fetches per page load.
  const activityBySatellite = await Promise.all(
    satelliteList.map(({ noradId }) => getActivityEventsByNoradId(noradId)),
  );

  const allActivity = activityBySatellite
    .flat()
    .sort((a, b) => new Date(b.flag_date).getTime() - new Date(a.flag_date).getTime());

  if (section === 'by_reason') {
    return (
      <OrganisationActivityEventsByReason
        initialData={allActivity}
        satellites={satelliteList}
        organisationName={organisationName}
      />
    );
  }

  return (
    <OrganisationActivityDataTable
      initialData={allActivity}
      satellites={satelliteList}
      organisationName={organisationName}
    />
  );
};

export { OrganisationActivitySection };
