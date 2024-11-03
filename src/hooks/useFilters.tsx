import { useState } from 'react';

export function useFitlers<T>(initialState?: T) {
  const [filters, setFilters] = useState(initialState);

  return {
    filters,
    setFilters,
  };
}
