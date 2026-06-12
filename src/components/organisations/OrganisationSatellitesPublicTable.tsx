'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import type { TypeSatelliteWithMetadataOut } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';
import { dayjs } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';

// TODO: orbit_regime, altitude (km) and longitude (°) are not available on TypeSatelliteWithMetadataOut.
// The backend GET /v1/satellites/with-metadata endpoint needs to include TLE-derived positional
// fields (orbit regime, current altitude, longitude slot) to populate the "Latest recorded position" group.
const publicSatellitesColumns: TranslatedColumnDef<TypeSatelliteWithMetadataOut>[] = [
  {
    id: 'satellite_information',
    header: 'Organisation_public_satellites.satellite_information',
    enableSorting: false,
    columns: [
      {
        accessorKey: 'common_name',
        id: 'common_name',
        header: 'Organisation_public_satellites.common_name',
        cell: ({ row }) => (
          <Link className="govuk-link" href={`/satellites/${row.original.norad_id}`}>
            {row.original.common_name}
          </Link>
        ),
      },
      {
        accessorKey: 'norad_id',
        id: 'norad_id',
        header: 'Organisation_public_satellites.norad_id',
        cell: ({ row }) => row.original.norad_id ?? '-',
      },
      {
        accessorKey: 'launch_date',
        id: 'launch_date',
        header: 'Organisation_public_satellites.launch_date',
        cell: ({ row }) =>
          row.original.launch_date
            ? dayjs(row.original.launch_date).year()
            : '-',
      },
    ],
  },
  {
    id: 'latest_position',
    header: 'Organisation_public_satellites.latest_position',
    enableSorting: false,
    columns: [
      {
        id: 'orbit',
        accessorKey: 'object_type',
        header: 'Organisation_public_satellites.orbit',
        // TODO: Replace with orbit regime (GEO/LEO/MEO) once available from backend
        cell: () => 'N/A',
      },
      {
        id: 'altitude',
        accessorKey: 'apogee',
        header: 'Organisation_public_satellites.altitude',
        // TODO: Replace with live altitude (km) from TLE-derived position once available from backend
        cell: ({ row }) => row.original.apogee ?? 'N/A',
      },
      {
        id: 'longitude',
        accessorKey: 'inclination',
        header: 'Organisation_public_satellites.longitude',
        // TODO: Replace with longitude slot once available from backend
        cell: () => 'N/A',
      },
    ],
  },
];

type OrganisationSatellitesPublicTableProps = {
  satellites: TypeSatelliteWithMetadataOut[];
};

const OrganisationSatellitesPublicTable = ({
  satellites,
}: OrganisationSatellitesPublicTableProps) => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) {
      return satellites;
    }
    const lower = search.toLowerCase();
    return satellites.filter(
      s =>
        s.common_name.toLowerCase().includes(lower)
        || (s.norad_id && s.norad_id.toLowerCase().includes(lower)),
    );
  }, [satellites, search]);

  const downloadAction = async () => satellites;

  return (
    <div>
      <div className="govuk-form-group mb-4">
        <label className="govuk-label govuk-!-font-weight-bold" htmlFor="satellite-search">
          Find a satellite:
        </label>
        <input
          className="govuk-input"
          id="satellite-search"
          type="search"
          placeholder="Search by common name or NORAD ID"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <DataTable<TypeSatelliteWithMetadataOut>
          data={filtered}
          columns={publicSatellitesColumns}
          enableSorting={false}
          emptyLabel="No satellites found."
        />
      </div>
      <DownloadData
        type="UK-licensed satellites"
        params={{}}
        downloadAction={downloadAction}
        ariaLabel="UK-licensed satellites"
      />
    </div>
  );
};

export { OrganisationSatellitesPublicTable };
