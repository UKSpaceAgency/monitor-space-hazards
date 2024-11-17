import { getTranslations } from 'next-intl/server';

import type { TypeGetSatellitesWithMetadataParams, TypeSatelliteWithMetadataOut } from '@/__generated__/data-contracts';
import { getSatellites } from '@/actions/getSatellites';
import { DownloadData } from '@/components/DownloadData';
import InfiniteTable from '@/components/InfiniteTable';
import { LastIntegration } from '@/components/LastIntegration';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { satellitesColumns } from './columns/SatellitesColumns';

type SatellitesDataTableProps = {
  query?: string;
  downloadable?: true;
};

const SatellitesDataTable = async ({ query }: SatellitesDataTableProps) => {
  const t = await getTranslations('Tables');
  const params: TypeGetSatellitesWithMetadataParams = {
    search_like: query,
    limit: 50,
  };

  const data = await getSatellites(params);

  const downloadData = async () => {
    'use server';
    const downloadParams: TypeGetSatellitesWithMetadataParams = {
      ...params,
      limit: 9999999,
    };
    return await getSatellites(downloadParams);
  };

  return (
    <>
      <InfiniteTable<TypeSatelliteWithMetadataOut, TypeGetSatellitesWithMetadataParams>
        initialData={data}
        params={params}
        columns={satellitesColumns}
        fetcher={getSatellites}
        queryKeys={[QUERY_KEYS.Satellites]}
      />
      <DownloadData type={t('Download.types.satellites')} downloadData={downloadData} />
      <LastIntegration />
    </>
  );
};

export { SatellitesDataTable };
