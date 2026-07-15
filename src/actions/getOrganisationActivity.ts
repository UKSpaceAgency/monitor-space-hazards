'use server';

import type { TypeActivityEvent } from '@/__generated__/data-contracts';

import { getActivityEventsByNoradId } from './getActivityEventsNoradId';
import { getSatellites } from './getSatellites';

export type OrganisationActivityData = {
  allActivity: TypeActivityEvent[];
  satellites: { noradId: string; name: string }[];
};

export async function getOrganisationActivity(organisationId: string): Promise<OrganisationActivityData> {
  const satellites = await getSatellites({ organization_id: organisationId });

  const satelliteList = satellites
    .map(s => ({ noradId: s.norad_id, name: s.common_name }))
    .filter((s): s is { noradId: string; name: string } => !!s.noradId);

  // TODO: The backend GET /v1/activity-events/ endpoint does not support filtering by
  // organisation_id. As a workaround we fetch per satellite NORAD ID and merge results.
  // Request backend to add organisation_id param to avoid N fetches per request.
  const activityBySatellite = await Promise.all(
    satelliteList.map(({ noradId }) => getActivityEventsByNoradId(noradId)),
  );

  const allActivity = activityBySatellite
    .flat()
    .sort((a, b) => new Date(b.flag_date).getTime() - new Date(a.flag_date).getTime());

  return { allActivity, satellites: satelliteList };
}
