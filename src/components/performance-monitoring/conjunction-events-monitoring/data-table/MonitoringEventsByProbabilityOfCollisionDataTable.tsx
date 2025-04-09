'use client';

import { sortBy } from 'lodash';

import type { StatsMonthlyConjunctionEvent } from '@/actions/getStatsMonthlyConjunctionEvents';
import { DataTable } from '@/components/DataTable';

import { eventsByProbabilityOfCollisionColumns } from './MonitoringEventsByProbabilityOfCollisionDataTableColumns';

type MonitoringEventsByProbabilityOfCollisionDataTableProps = {
  data: StatsMonthlyConjunctionEvent[];
};

const MonitoringEventsByProbabilityOfCollisionDataTable = ({ data }: MonitoringEventsByProbabilityOfCollisionDataTableProps) => {
  const sortedData = sortBy(data, 'month').reverse();
  return (
    <DataTable
      columns={eventsByProbabilityOfCollisionColumns}
      data={sortedData}
    />
  );
};

export { MonitoringEventsByProbabilityOfCollisionDataTable };
