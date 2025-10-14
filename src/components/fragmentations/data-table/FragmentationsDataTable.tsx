'use client';
import { useTranslations } from 'next-intl';

import type { TypeFragmentationEvent, TypeGetFragmentationEventsParams } from '@/__generated__/data-contracts';
import { getFragmentationEventsList } from '@/actions/getFragmentationEventsList';
import type { FragmentationsPageSearchParams } from '@/app/(auth)/fragmentations/page';
import InfiniteTable from '@/components/InfiniteTable';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { fragmentationsColumns } from './FragmentationsDataTableColumns';

type FragmentationsDataTableProps = {
  params: FragmentationsPageSearchParams;
  fragmentations: TypeFragmentationEvent[];
};

const FragmentationsDataTable = ({ params, fragmentations }: FragmentationsDataTableProps) => {
  const t = useTranslations('Tables');

  return (
    <InfiniteTable<TypeFragmentationEvent, TypeGetFragmentationEventsParams>
      initialData={fragmentations}
      params={params}
      columns={fragmentationsColumns}
      fetcher={getFragmentationEventsList}
      queryKeys={[QUERY_KEYS.Fragmentations]}
      emptyLabel={t('Conjunctions.empty_list_info')}
      focusable
    />
  );
};

export { FragmentationsDataTable };
