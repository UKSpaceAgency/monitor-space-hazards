import { getSatellites } from '@/actions/getSatellites';
import { OrganisationSatellitesTable } from '@/components/account/organisations/organisation/data-table/OrganisationSatellitesTable';

type OrganisationSatellitesListProps = {
  organisationId?: string;
};

const OrganisationSatellitesList = async ({ organisationId }: OrganisationSatellitesListProps) => {
  if (!organisationId) {
    return <p className="govuk-body mb-0">No licensed satellites available.</p>;
  }

  const satellites = await getSatellites({ organization_id: organisationId });

  return <OrganisationSatellitesTable satellites={satellites} emptyLabel="No licensed satellites available." />;
};

export { OrganisationSatellitesList };
