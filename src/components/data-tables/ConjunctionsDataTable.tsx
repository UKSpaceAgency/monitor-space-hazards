'use client';

import { useTranslations } from 'next-intl';

import type { TypeEventOut, TypeGetConjunctionEventsListParams, TypeUserRole } from '@/__generated__/data-contracts';
import { getConjunctions } from '@/actions/getConjunctions';
import { DownloadData } from '@/components/DownloadData';
import InfiniteTable from '@/components/InfiniteTable';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { conjunctionColumns } from './columns/ConjunctionsColumns';

type ConjunctionsDataTableProps = {
  params: TypeGetConjunctionEventsListParams;
  initialData: TypeEventOut[];
  role: TypeUserRole;
};

const ConjunctionsDataTable = async ({ params, initialData, role }: ConjunctionsDataTableProps) => {
  const t = useTranslations('Tables');

  return (
    <>
      <InfiniteTable<TypeEventOut, TypeGetConjunctionEventsListParams>
        initialData={initialData}
        params={params}
        columns={conjunctionColumns({ role, displayUnit: 'scientific' })}
        fetcher={getConjunctions}
        queryKeys={[QUERY_KEYS.Satellites]}
      />
      <DownloadData type={t('Download.types.satellites')} params={params} downloadAction={getConjunctions} />
    </>
  );
};

export { ConjunctionsDataTable };
