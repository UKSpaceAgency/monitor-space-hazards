import { getTranslations } from 'next-intl/server';

import type { TypeEpoch, TypeEventOut, TypeGetConjunctionEventsListParams, TypeReportFlagSettings } from '@/__generated__/data-contracts';
import { getConjunctions } from '@/actions/getConjunctions';
import { DownloadData } from '@/components/DownloadData';
import InfiniteTable from '@/components/InfiniteTable';
import { LastIntegration } from '@/components/LastIntegration';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { conjunctionColumns } from './columns/ConjunctionsColumns';

type ConjunctionsDataTableProps = {
  query?: string;
  epoch?: TypeEpoch;
  report?: TypeReportFlagSettings;
  downloadable?: true;
};

const ConjunctionsDataTable = async ({ query, epoch, report }: ConjunctionsDataTableProps) => {
  const t = await getTranslations('Tables');
  const params: TypeGetConjunctionEventsListParams = {
    search_like: query,
    epoch,
    report,
    limit: 50,
  };

  const data = await getConjunctions(params);

  const downloadData = async () => {
    'use server';
    const downloadParams: TypeGetConjunctionEventsListParams = {
      ...params,
      limit: 9999999,
    };
    return await getConjunctions(downloadParams);
  };

  return (
    <>
      <InfiniteTable<TypeEventOut, TypeGetConjunctionEventsListParams>
        initialData={data}
        params={params}
        columnsFn={conjunctionColumns}
        fetcher={getConjunctions}
        queryKeys={[QUERY_KEYS.Satellites]}
      />
      <DownloadData type={t('Download.types.satellites')} downloadData={downloadData} />
      <LastIntegration />
    </>
  );
};

export { ConjunctionsDataTable };
