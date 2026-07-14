'use client';

import type { StatsMonthlyConjunctionEvent } from '@/actions/getStatsMonthlyConjunctionEvents';
import { DataTable } from '@/components/DataTable';

import { eventsByProbabilityOfCollisionColumns } from './MonitoringEventsByProbabilityOfCollisionDataTableColumns';

type MonitoringEventsByProbabilityOfCollisionDataTableProps = {
  data: StatsMonthlyConjunctionEvent[];
};

const MonitoringEventsByProbabilityOfCollisionDataTable = ({ data }: MonitoringEventsByProbabilityOfCollisionDataTableProps) => {
  return (
    <div className="overflow-auto max-h-[500px]">
      <DataTable
        columns={eventsByProbabilityOfCollisionColumns}
        data={[...data].reverse()}
        ariaLabel="Information on Conjunction Events by probability of collision"
      />
    </div>
  );
};

export { MonitoringEventsByProbabilityOfCollisionDataTable };
