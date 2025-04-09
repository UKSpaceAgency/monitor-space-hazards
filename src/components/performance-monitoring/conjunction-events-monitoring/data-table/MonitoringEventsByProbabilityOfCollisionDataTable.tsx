'use client';

import type { StatsMonthlyConjunctionEvent } from '@/actions/getStatsMonthlyConjunctionEvents';
import { DataTable } from '@/components/DataTable';

import { eventsByProbabilityOfCollisionColumns } from './MonitoringEventsByProbabilityOfCollisionDataTableColumns';

type MonitoringEventsByProbabilityOfCollisionDataTableProps = {
  data: StatsMonthlyConjunctionEvent[];
};

const MonitoringEventsByProbabilityOfCollisionDataTable = ({ data }: MonitoringEventsByProbabilityOfCollisionDataTableProps) => {
  return (
    <DataTable
      columns={eventsByProbabilityOfCollisionColumns}
      data={[...data].reverse()}
    />
  );
};

export { MonitoringEventsByProbabilityOfCollisionDataTable };
