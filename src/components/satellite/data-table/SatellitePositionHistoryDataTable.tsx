'use client';

import type { TypeActivityReportOut } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';

import { satellitePositionHistoryColumns } from './SatellitePositionHistoryDataTableColumns';

type SatellitePositionHistoryDataTableProps = {
  data: TypeActivityReportOut[];
};

const SatellitePositionHistoryDataTable = ({ data }: SatellitePositionHistoryDataTableProps) => {
  return (
    <DataTable<TypeActivityReportOut>
      data={data}
      columns={satellitePositionHistoryColumns}
      emptyLabel="No position history found."
    />
  );
};

export { SatellitePositionHistoryDataTable };
