'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import type { TypeActivityEvent } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';
import type { TranslatedColumnDef } from '@/types';
import Details from '@/ui/details/details';
import Select from '@/ui/select/select';

type ReasonRow = {
  satellite: string;
  noradId: string;
  planned: number;
  unplanned: number;
  positionChange: number;
  missingData: number;
  total: number;
};

const reasonColumns: TranslatedColumnDef<ReasonRow>[] = [
  {
    accessorKey: 'satellite',
    id: 'satellite',
    header: 'Organisation_activity_by_reason.satellite',
    enableSorting: false,
    cell: ({ row }) => (
      <Link href={`/satellites/${row.original.noradId}`} className="govuk-link">
        {row.original.satellite}
      </Link>
    ),
  },
  {
    accessorKey: 'planned',
    id: 'planned',
    header: 'Organisation_activity_by_reason.manoeuvre_planned',
    enableSorting: false,
  },
  {
    accessorKey: 'unplanned',
    id: 'unplanned',
    header: 'Organisation_activity_by_reason.manoeuvre_unplanned',
    enableSorting: false,
  },
  {
    accessorKey: 'positionChange',
    id: 'positionChange',
    header: 'Organisation_activity_by_reason.position_change',
    enableSorting: false,
  },
  {
    accessorKey: 'missingData',
    id: 'missingData',
    header: 'Organisation_activity_by_reason.missing_data',
    enableSorting: false,
  },
  {
    accessorKey: 'total',
    id: 'total',
    header: 'Organisation_activity_by_reason.total',
    enableSorting: false,
  },
];

type OrganisationActivityEventsByReasonProps = {
  initialData: TypeActivityEvent[];
  satellites: { name: string; noradId: string }[];
  organisationName: string;
};

const OrganisationActivityEventsByReason = ({
  initialData,
  satellites,
  organisationName,
}: OrganisationActivityEventsByReasonProps) => {
  const [selectedSatellite, setSelectedSatellite] = useState('All satellites');

  const rows: ReasonRow[] = useMemo(() => {
    const satelliteList = selectedSatellite === 'All satellites'
      ? satellites
      : satellites.filter(s => s.name === selectedSatellite);

    return satelliteList.map(({ name, noradId }) => {
      const events = initialData.filter(e => e.norad_id === noradId);
      return {
        satellite: name,
        noradId,
        planned: events.filter(e => e.reason_for_flag === 'Manoeuvre (planned)').length,
        unplanned: events.filter(e => e.reason_for_flag === 'Manoeuvre (unplanned)').length,
        positionChange: events.filter(e => e.reason_for_flag === 'Position change').length,
        missingData: events.filter(e => e.reason_for_flag === 'Missing data' || e.reason_for_flag == null).length,
        total: events.length,
      };
    });
  }, [initialData, satellites, selectedSatellite]);

  const satelliteOptions = [
    { children: 'All satellites', value: 'All satellites' },
    ...satellites.map(s => ({ children: s.name, value: s.name })),
  ];

  const downloadAction = async () => rows;

  return (
    <div>
      <p className="govuk-!-font-weight-bold">
        Total number of activity flags for
        {' '}
        {organisationName}
        &apos;s UK-licensed satellites and a breakdown of the reason for flag.
      </p>
      <Select
        name="reason-satellite"
        id="reason-satellite"
        label="Select satellite"
        value={selectedSatellite}
        options={satelliteOptions}
        onChange={e => setSelectedSatellite(e.target.value)}
        className="mb-4"
      />
      {/* TODO: Add chart visualisation once chart component supports activity flag breakdown */}
      <div className="overflow-x-auto">
        <DataTable<ReasonRow>
          data={rows}
          columns={reasonColumns}
          enableSorting={false}
          emptyLabel="No activity flags found."
        />
      </div>
      <DownloadData
        type="activity flags by reason"
        params={{}}
        downloadAction={downloadAction}
        ariaLabel="Activity flags by reason"
      />
      <Details summary="Help with this table">
        This table shows the total number of activity flags for
        {' '}
        {organisationName}
        &apos;s UK-licensed satellites and a breakdown of the reason for flag.
      </Details>
    </div>
  );
};

export { OrganisationActivityEventsByReason };
