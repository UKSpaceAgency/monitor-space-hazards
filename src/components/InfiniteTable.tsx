'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import type { RowData } from '@tanstack/react-table';
import { useMemo } from 'react';

import { DataTable } from '@/components/DataTable';
import { InfiniteScroller } from '@/components/InfiniteScroller';
import { useSorting } from '@/hooks/useSorting';
import type { TranslatedColumnDef } from '@/types';

type InfiniteTableProps<T extends RowData, K extends object> = {
  initialData: T[];
  params: K;
  fetcher: (params: K) => Promise<T[]>;
  columns: TranslatedColumnDef<T>[];
};

const InfiniteTable = <T extends RowData, K extends object>({ initialData, params, fetcher, columns }: InfiniteTableProps<T, K>) => {
  const { sorting, onSortingChange, sortBy, sortOrder } = useSorting();

  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery({
    queryKey: ['satellites', sortBy, sortOrder, params],
    queryFn: async ({ pageParam }) => {
      return await fetcher({ ...params, offset: pageParam, sort_order: sortOrder, sort_by: sortBy });
    },
    initialPageParam: 0,
    initialData: { pages: [initialData], pageParams: [0] },
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const limit = 'limit' in params && typeof params.limit === 'number' ? params.limit : 50;
      if (lastPage.length < limit) {
        return undefined;
      }
      return lastPageParam + lastPage.length;
    },
    placeholderData: prev => prev,
  });

  const flatData = useMemo(
    () => data?.pages?.flatMap(page => page) ?? [],
    [data],
  );

  return (
    <div>
      <InfiniteScroller isFetching={isFetching} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage}>
        <DataTable columns={columns} data={flatData} sorting={sorting} onSortingChange={onSortingChange} />
      </InfiniteScroller>
    </div>
  );
};

export default InfiniteTable;
