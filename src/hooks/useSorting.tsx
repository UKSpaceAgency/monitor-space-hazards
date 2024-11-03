import type { ColumnSort } from '@tanstack/react-table';
import snakeCase from 'lodash/snakeCase';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

import type { TypeSortOrder } from '@/__generated__/data-contracts';

type UseSortingReturn<T extends string> = {
  sorting: ColumnSort[];
  onSortingChange: Dispatch<SetStateAction<ColumnSort[]>>;
  sortOrder?: TypeSortOrder;
  sortBy?: T;
};

export function useSorting<T extends string>(): UseSortingReturn<T> {
  const [sorting, setSorting] = useState<ColumnSort[]>([]);

  return {
    // 🔽 Table sorting state
    sorting,
    onSortingChange: setSorting,
    // 🔽 API sorting parameters
    sortOrder: sorting.length ? sorting[0]?.desc ? 'desc' : 'asc' : undefined,
    sortBy: sorting.length ? snakeCase(sorting[0]?.id) as T : undefined,
  };
}
