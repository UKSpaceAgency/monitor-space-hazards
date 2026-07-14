import { getTranslations } from 'next-intl/server';

import type { TypeGetSatellitesWithMetadataParams } from '@/__generated__/data-contracts';
import { getSatellites } from '@/actions/getSatellites';
import { getSession } from '@/actions/getSession';
import { SearchBar } from '@/components/SearchBar';
import { isInternationalUser } from '@/utils/Roles';

import { OrganisationSatellitesPublicTable } from './data-table/OrganisationSatellitesPublicTable';

type OrganisationSatellitesListProps = {
  organisationId?: string;
  searchLike?: string;
};

const OrganisationSatellitesList = async ({
  organisationId,
  searchLike,
}: OrganisationSatellitesListProps) => {
  const t = await getTranslations('Organisation.satellites_list');
  const tTable = await getTranslations('Tables.Organisation_public_satellites');
  const session = await getSession();

  const isInternational = isInternationalUser(session?.user?.role);

  if (!organisationId) {
    return <p className="govuk-body mb-0">{t('empty')}</p>;
  }

  const params: TypeGetSatellitesWithMetadataParams = {
    organization_id: organisationId,
    search_like: searchLike || undefined,
  };

  const satellites = await getSatellites(params);

  return (
    <div>
      <SearchBar
        label={tTable('find_satellite_label')}
        id="organisation-satellites-search"
        placeholder={tTable('search_placeholder')}
        ariaLabel={tTable('find_satellite_label')}
      />
      <OrganisationSatellitesPublicTable satellites={satellites} params={params} isInternational={isInternational} />
    </div>
  );
};

export { OrganisationSatellitesList };
