'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import type { TypeActivityEvent, TypeActivityReasonForFlag } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';
import { dayjs, FORMAT_DATE_FULL_MONTH } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import Details from '@/ui/details/details';
import Select from '@/ui/select/select';
import { renderReasonForFlagTag } from '@/utils/Tags';

const activityFlagsColumns: TranslatedColumnDef<TypeActivityEvent>[] = [
  {
    id: 'event_information',
    header: 'Organisation_activity_flags.event_information',
    enableSorting: false,
    columns: [
      {
        accessorKey: 'reason_for_flag',
        header: 'Organisation_activity_flags.reason_for_flag',
        enableSorting: false,
        cell: ({ getValue }) => renderReasonForFlagTag(getValue<TypeActivityReasonForFlag>()),
      },
      {
        accessorKey: 'short_id',
        header: 'Organisation_activity_flags.flag_id',
        enableSorting: false,
        cell: ({ getValue }) => (
          <Link href={`/activity/${getValue<string>()}`} className="govuk-link">
            {getValue<string>()}
          </Link>
        ),
      },
      {
        accessorKey: 'common_name',
        header: 'Organisation_activity_flags.satellite',
        enableSorting: false,
        cell: ({ row }) => (
          <Link href={`/satellites/${row.original.norad_id}`} className="govuk-link">
            {row.original.common_name}
          </Link>
        ),
      },
      {
        accessorKey: 'flag_date',
        header: 'Organisation_activity_flags.flag_date',
        enableSorting: false,
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return value ? dayjs(value).format(FORMAT_DATE_FULL_MONTH) : '-';
        },
      },
    ],
  },
];

const REASON_OPTIONS = [
  'All flags',
  'Position change',
  'Manoeuvre (unplanned)',
  'Manoeuvre (planned)',
  'Missing data',
];

type OrganisationActivityDataTableProps = {
  initialData: TypeActivityEvent[];
  satellites: { name: string; noradId: string }[];
  organisationName: string;
};

const OrganisationActivityDataTable = ({
  initialData,
  satellites,
  organisationName,
}: OrganisationActivityDataTableProps) => {
  const [selectedSatellite, setSelectedSatellite] = useState('All satellites');
  const [selectedReason, setSelectedReason] = useState('All flags');

  const filtered = useMemo(() => {
    return initialData.filter((item) => {
      const matchSatellite
        = selectedSatellite === 'All satellites'
        || item.common_name === selectedSatellite;
      const matchReason
        = selectedReason === 'All flags'
        || item.reason_for_flag === selectedReason
        || (selectedReason === 'Missing data' && item.reason_for_flag == null);
      return matchSatellite && matchReason;
    });
  }, [initialData, selectedSatellite, selectedReason]);

  const satelliteOptions = [
    { children: 'All satellites', value: 'All satellites' },
    ...satellites.map(s => ({ children: s.name, value: s.name })),
  ];

  const downloadAction = async () => filtered;

  return (
    <div>
      <p className="govuk-body">
        This table shows all activity flags involving
        {' '}
        {organisationName}
        &apos;s satellites. You can apply filters to view past events.
      </p>
      <p className="govuk-body govuk-!-font-weight-bold">Apply filters to this table:</p>
      <div className="govuk-grid-row mb-4">
        <div className="govuk-grid-column-one-half">
          <Select
            name="activity-satellite"
            id="activity-satellite"
            label="Filter by satellite"
            value={selectedSatellite}
            options={satelliteOptions}
            onChange={e => setSelectedSatellite(e.target.value)}
          />
        </div>
        <div className="govuk-grid-column-one-half">
          <Select
            name="activity-reason"
            id="activity-reason"
            label="Filter by reason for flag"
            value={selectedReason}
            options={REASON_OPTIONS.map(r => ({ children: r, value: r }))}
            onChange={e => setSelectedReason(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <DataTable<TypeActivityEvent>
          data={filtered}
          columns={activityFlagsColumns}
          enableSorting={false}
          emptyLabel="No activity flags found."
        />
      </div>
      <DownloadData
        type="activity flags"
        params={{}}
        downloadAction={downloadAction}
        ariaLabel="Organisation activity flags"
      />
      <Details summary="Help with this table">
        <p>
          This table shows all activity flags involving
          {organisationName}
          &apos;s UK-licensed satellites.
        </p>
        <p>Select the flag ID to view more information.</p>
      </Details>
    </div>
  );
};

export { OrganisationActivityDataTable };
