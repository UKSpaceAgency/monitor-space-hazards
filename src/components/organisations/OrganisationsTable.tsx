import { getTranslations } from 'next-intl/server';

import { getOrganisations } from '@/actions/getOrganisations';

import { DownloadData } from '../DownloadData';
import { OrganisationsDataTable } from './data-table/OrganisationsDataTable';

type OrganisationsTableProps = {
  searchLike?: string;
};

const OrganisationsTable = async ({ searchLike }: OrganisationsTableProps) => {
  const t = await getTranslations('Tables');
  const organisations = await getOrganisations({
    search_like: searchLike,
    with_satellites: true,
  });

  const downloadData = async () => {
    'use server';
    const organisations = await getOrganisations({});
    return organisations.map(({ id, created_at, name, satellites_count }) => ({
      id,
      created_at,
      name,
      satellites_count,
    }));
  };

  return (
    <>
      <OrganisationsDataTable
        data={organisations}
      />
      <DownloadData type={t('Download.types.organisations')} params={{}} downloadAction={downloadData} ariaLabel="Organisations" />
    </>
  );
};

export { OrganisationsTable };
