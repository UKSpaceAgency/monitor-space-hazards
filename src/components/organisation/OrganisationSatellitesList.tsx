import { getTranslations } from 'next-intl/server';

import { getSatellites } from '@/actions/getSatellites';

import { OrganisationSatellitesPublicTable } from './data-table/OrganisationSatellitesPublicTable';

type OrganisationSatellitesListProps = {
  organisationId?: string;
};

const OrganisationSatellitesList = async ({ organisationId }: OrganisationSatellitesListProps) => {
  const t = await getTranslations('Organisation.satellites_list');

  if (!organisationId) {
    return <p className="govuk-body mb-0">{t('empty')}</p>;
  }

  const satellites = await getSatellites({ organization_id: organisationId });

  return <OrganisationSatellitesPublicTable satellites={satellites} />;
};

export { OrganisationSatellitesList };
