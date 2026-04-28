'use client';

import { useMemo, useState } from 'react';

import type { TypeActivityEvent } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';

import { satteliteActivityEventsColumns } from './SatelliteActivitiesDataTableColumns';
import { SatelliteActivityDataTableFilters } from './SatelliteActivityDataTableFilters';

type SatelliteActivitiesDataTableProps = {
  initialData: TypeActivityEvent[];
};

const SatelliteActivitiesDataTable = ({ initialData }: SatelliteActivitiesDataTableProps) => {
  const [value, setValue] = useState<string>('All flags');

  const filtredData = useMemo(() => {
    return value === 'All flags' ? initialData : initialData.filter(item => item.reason_for_flag ?? value === 'Missing data');
  }, [initialData, value]);

  return (
    <div className="mb-12">
      <SatelliteActivityDataTableFilters value={value} onChange={setValue} />
      <DataTable<TypeActivityEvent>
        data={filtredData}
        columns={satteliteActivityEventsColumns}
      />
    </div>
  );
};

export { SatelliteActivitiesDataTable };
