'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import type { ColumnSort, RowData } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

import type { TypeUserRole } from '@/__generated__/data-contracts';
import { getSession } from '@/actions/getSession';
import { DataTable } from '@/components/DataTable';
import { InfiniteScroller } from '@/components/InfiniteScroller';
import { useSorting } from '@/hooks/useSorting';
import type { DisplayUnit, TranslatedColumnDef } from '@/types';
import Spinner from '@/ui/spinner/spinner';

type InfiniteTableProps<T extends RowData, K extends object> = {
  initialData: T[];
  params: K;
  fetcher: (params: K) => Promise<T[]>;
  columns?: TranslatedColumnDef<T>[];
  columnsFn?: (options: {
    role?: TypeUserRole | null;
    displayUnit?: DisplayUnit;
  }) => Promise<TranslatedColumnDef<T>[]>;
  queryKeys: (string | K | undefined)[];
  initialSort?: ColumnSort[];
};

const InfiniteTable = <T extends RowData, K extends object>({ initialData, params, fetcher, columns, columnsFn, queryKeys, initialSort }: InfiniteTableProps<T, K>) => {
  const [dataColumns, setDataColumns] = useState<TranslatedColumnDef<T>[]>(columns || []);
  const [displayUnit] = useState<DisplayUnit>('scientific');

  const { sorting, onSortingChange, sortBy, sortOrder } = useSorting(initialSort ?? []);

  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery({
    queryKey: [...queryKeys, sortBy, sortOrder, params],
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

  useEffect(() => {
    if (columnsFn) {
      const getColumns = async () => {
        try {
          const sessions = await getSession();
          const cols = await columnsFn({
            role: sessions?.user.role,
            displayUnit,
          });
          setDataColumns(cols);
        } catch {
          return [];
        }
      };
      getColumns();
    }
  }, [columnsFn, displayUnit]);

  if (!dataColumns.length) {
    return <Spinner />;
  }

  return (
    <div>
      <InfiniteScroller isFetching={isFetching} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage}>
        <DataTable stickyHeader columns={dataColumns} data={flatData} sorting={sorting} onSortingChange={onSortingChange} />
      </InfiniteScroller>
    </div>
  );
};

export default InfiniteTable;
