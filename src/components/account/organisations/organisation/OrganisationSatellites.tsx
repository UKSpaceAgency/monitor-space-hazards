import { getTranslations } from 'next-intl/server';

import { getSatellites } from '@/actions/getSatellites';

import { OrganisationSatellitesTable } from './data-table/OrganisationSatellitesTable';

type OrganisationSatellitesProps = {
  organisationId: string;
};

const OrganisationSatellites = async ({ organisationId }: OrganisationSatellitesProps) => {
  const t = await getTranslations('Organisation.satellites_table');

  const satellites = await getSatellites({ organization_id: organisationId });

  return (
    <div>
      <h2 className="govuk-heading-l">{t('registered_satellites')}</h2>
      <OrganisationSatellitesTable satellites={satellites} />
    </div>

  );
};

export { OrganisationSatellites };
