import { getSatellites } from '@/actions/getSatellites';

import { OrganisationSatellitesPublicTable } from './OrganisationSatellitesPublicTable';

type OrganisationSatellitesListProps = {
  organisationId?: string;
};

const OrganisationSatellitesList = async ({ organisationId }: OrganisationSatellitesListProps) => {
  if (!organisationId) {
    return <p className="govuk-body mb-0">No licensed satellites available.</p>;
  }

  const satellites = await getSatellites({ organization_id: organisationId });

  return <OrganisationSatellitesPublicTable satellites={satellites} />;
};

export { OrganisationSatellitesList };
