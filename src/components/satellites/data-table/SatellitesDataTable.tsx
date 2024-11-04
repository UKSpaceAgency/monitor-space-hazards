import { getTranslations } from 'next-intl/server';

import type { TypeReadSatellitesWithMetadataV1SatellitesWithMetadataGetParams, TypeSatelliteWithMetadataOut } from '@/__generated__/data-contracts';
import { getSatellites } from '@/actions/getSatellites';
import { DownloadData } from '@/components/DownloadData';
import InfiniteTable from '@/components/InfiniteTable';

import { columns } from './columns';

type SatellitesDataTableProps = {
  query?: string;
  downloadable?: true;
};

const SatellitesDataTable = async ({ query }: SatellitesDataTableProps) => {
  const t = await getTranslations('Tables');
  const params: TypeReadSatellitesWithMetadataV1SatellitesWithMetadataGetParams = {
    search_like: query,
    limit: 50,
  };

  const { data } = await getSatellites(params);

  // We need to ask should we donwload with query or not
  const downloadParams: TypeReadSatellitesWithMetadataV1SatellitesWithMetadataGetParams = {
    search_like: query,
    limit: 9999999,
  };

  const downloadData = async () => {
    'use server';
    return await getSatellites(downloadParams);
  };

  return (
    <>
      <InfiniteTable<TypeSatelliteWithMetadataOut, TypeReadSatellitesWithMetadataV1SatellitesWithMetadataGetParams> initialData={data} params={params} columns={columns} fetcher={getSatellites} />
      <DownloadData type={t('Download.types.satellites')} downloadData={downloadData} />
    </>
  );
};

export { SatellitesDataTable };
