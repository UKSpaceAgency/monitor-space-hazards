'use client';

import { useTranslations } from 'next-intl';

import type {
  TypeGetSatellitesWithMetadataParams,
  TypeSatelliteWithMetadataOut,
} from '@/__generated__/data-contracts';
import { getSatellites } from '@/actions/getSatellites';
import { DownloadData } from '@/components/DownloadData';
import InfiniteTable from '@/components/InfiniteTable';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { getPublicSatellitesColumns } from './OrganisationSatellitesPublicTableColumns';

type OrganisationSatellitesPublicTableProps = {
  satellites: TypeSatelliteWithMetadataOut[];
  params: TypeGetSatellitesWithMetadataParams;
  isInternational: boolean;
};

const OrganisationSatellitesPublicTable = ({
  satellites,
  params,
  isInternational,
}: OrganisationSatellitesPublicTableProps) => {
  const t = useTranslations('Tables.Organisation_public_satellites');

  return (
    <div>
      <InfiniteTable<TypeSatelliteWithMetadataOut, TypeGetSatellitesWithMetadataParams>
        initialData={satellites}
        params={params}
        columns={getPublicSatellitesColumns(isInternational)}
        fetcher={getSatellites}
        queryKeys={[QUERY_KEYS.Satellites]}
        emptyLabel={t('empty')}
        focusable
      />
      <DownloadData
        type={t('download_type')}
        params={params}
        downloadAction={getSatellites}
        ariaLabel={t('download_aria')}
      />
    </div>
  );
};

export { OrganisationSatellitesPublicTable };
