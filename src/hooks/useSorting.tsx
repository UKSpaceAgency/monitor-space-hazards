import type { ColumnSort } from '@tanstack/react-table';
import { useState } from 'react';

export function useSorting() {
  const [sorting, setSorting] = useState<ColumnSort[]>([]);

  return {
    // 🔽 Table sorting state
    sorting,
    onSortingChange: setSorting,
    // 🔽 API sorting parameters
    sortOrder: sorting.length ? sorting[0]?.desc ? 'desc' : 'asc' : '',
    sortBy: sorting.length ? sorting[0]?.id : '',
  };
}
