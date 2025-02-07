'use client';

import { useTranslations } from 'next-intl';

import type { TypeGetSatellitesWithMetadataParams, TypeSatelliteWithMetadataOut } from '@/__generated__/data-contracts';
import { getSatellites } from '@/actions/getSatellites';
import { DownloadData } from '@/components/DownloadData';
import InfiniteTable from '@/components/InfiniteTable';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { satellitesColumns } from './SatellitesDataTableColumns';

type SatellitesDataTableProps = {
  initialData: TypeSatelliteWithMetadataOut[];
  params: TypeGetSatellitesWithMetadataParams;
};

const SatellitesDataTable = ({ initialData, params }: SatellitesDataTableProps) => {
  const t = useTranslations('Tables');

  return (
    <>
      <InfiniteTable<TypeSatelliteWithMetadataOut, TypeGetSatellitesWithMetadataParams>
        initialData={initialData}
        params={params}
        columns={satellitesColumns}
        fetcher={getSatellites}
        queryKeys={[QUERY_KEYS.Satellites]}
      />
      <DownloadData type={t('Download.types.satellites')} params={params} downloadAction={getSatellites} />
    </>
  );
};

export { SatellitesDataTable };
