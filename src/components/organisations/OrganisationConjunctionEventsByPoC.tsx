'use client';

import { useMemo, useState } from 'react';

import type { EventsBySatelliteType } from '@/actions/getStatsEventsBySatellite';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';
import type { TranslatedColumnDef } from '@/types';
import Details from '@/ui/details/details';
import Select from '@/ui/select/select';

type PocRow = EventsBySatelliteType & { total: number };

const pocColumns: TranslatedColumnDef<PocRow>[] = [
  {
    accessorKey: 'name',
    id: 'satellite',
    header: 'Organisation_conjunction_poc.satellite',
    enableSorting: false,
  },
  {
    accessorKey: 'low',
    id: 'low',
    header: 'Organisation_conjunction_poc.low',
    enableSorting: false,
  },
  {
    accessorKey: 'medium',
    id: 'medium',
    header: 'Organisation_conjunction_poc.medium',
    enableSorting: false,
  },
  {
    accessorKey: 'high',
    id: 'high',
    header: 'Organisation_conjunction_poc.high',
    enableSorting: false,
  },
  {
    accessorKey: 'total',
    id: 'total',
    header: 'Organisation_conjunction_poc.total',
    enableSorting: false,
  },
];

type OrganisationConjunctionEventsByPoCProps = {
  stats: EventsBySatelliteType[];
  organisationName: string;
};

const OrganisationConjunctionEventsByPoC = ({
  stats,
  organisationName,
}: OrganisationConjunctionEventsByPoCProps) => {
  const [selectedSatellite, setSelectedSatellite] = useState('All satellites');

  const rows: PocRow[] = useMemo(
    () =>
      stats.map(s => ({
        ...s,
        total: s.low + s.medium + s.high,
      })),
    [stats],
  );

  const filtered = useMemo(
    () =>
      selectedSatellite === 'All satellites'
        ? rows
        : rows.filter(r => r.name === selectedSatellite),
    [rows, selectedSatellite],
  );

  const satelliteOptions = [
    { children: 'All satellites', value: 'All satellites' },
    ...stats.map(s => ({ children: s.name, value: s.name })),
  ];

  const downloadAction = async () => filtered;

  return (
    <div>
      <p className="govuk-!-font-weight-bold">
        Total number of conjunction events involving
        {' '}
        {organisationName}
        &apos;s UK-licensed satellites and a breakdown of their probabilities of collision (PoC).
      </p>
      <Select
        name="satellite-poc"
        id="satellite-poc"
        label="Select satellite"
        value={selectedSatellite}
        options={satelliteOptions}
        onChange={e => setSelectedSatellite(e.target.value)}
        className="mb-4"
      />
      {/* TODO: Add chart visualisation once chart component supports this breakdown */}
      <div className="overflow-x-auto">
        <DataTable<PocRow>
          data={filtered}
          columns={pocColumns}
          enableSorting={false}
          emptyLabel="No data available."
        />
      </div>
      <DownloadData
        type="conjunction events by probability of collision"
        params={{}}
        downloadAction={downloadAction}
        ariaLabel="Conjunction events by PoC"
      />
      <Details summary="Help with this table">
        This table shows the total number of conjunction events involving
        {' '}
        {organisationName}
        &apos;s UK-licensed satellites and a breakdown of their probabilities of collision.
      </Details>
    </div>
  );
};

export { OrganisationConjunctionEventsByPoC };
