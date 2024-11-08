/* eslint-disable no-console */
import { getTranslations } from 'next-intl/server';

import type { TypeAnalysisOut, TypeGetAnalysesParams } from '@/__generated__/data-contracts';
import { getAnalyses } from '@/actions/getAnalyses';
import { DownloadData } from '@/components/DownloadData';
import InfiniteTable from '@/components/InfiniteTable';
import { LastIntegration } from '@/components/LastIntegration';

import { columns } from './columns';

type AnalysisDataTableProps = {
  query?: string;
  downloadable?: true;
};

const AnalysisDataTable = async ({ query }: AnalysisDataTableProps) => {
  const t = await getTranslations('Tables');
  const params: TypeGetAnalysesParams = {
    sort_by: 'cdm_external_id',
    offset: 10,
    limit: 50,
  };

  const { data } = await getAnalyses(params);
  console.log('query', query);
  console.log('data', data);

  // We need to ask should we download with query or not
  const downloadParams: TypeGetAnalysesParams = {
    sort_by: 'cdm_external_id',
    offset: 10,
    limit: 9999999,
  };

  const downloadData = async () => {
    'use server';
    return await getAnalyses(downloadParams);
  };

  return (
    <>
      <InfiniteTable<TypeAnalysisOut, TypeGetAnalysesParams> initialData={data} params={params} columns={columns} fetcher={getAnalyses} />
      <DownloadData type={t('Download.types.satellites')} downloadData={downloadData} />
      <LastIntegration />
    </>
  );
};

export { AnalysisDataTable };
