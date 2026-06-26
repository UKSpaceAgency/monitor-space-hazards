import Link from 'next/link';

import type { TypeSatelliteWithMetadataOut } from '@/__generated__/data-contracts';
import { dayjs } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';

// Placeholder for table cells whose backing field is not yet returned by the backend.
// Cell renderers run outside React, so they can't use the i18n hook; kept as a single constant.
const NO_DATA = 'NO DATA';

// TODO: orbit_regime, altitude (km) and longitude (°) are not available on TypeSatelliteWithMetadataOut.
// The backend GET /v1/satellites/with-metadata endpoint needs to include TLE-derived positional
// fields (orbit regime, current altitude, longitude slot) to populate the "Latest recorded position" group.
const publicSatellitesColumns: TranslatedColumnDef<TypeSatelliteWithMetadataOut>[] = [
  {
    id: 'satellite_information',
    header: 'Organisation_public_satellites.satellite_information',
    columns: [
      {
        accessorKey: 'common_name',
        id: 'common_name',
        header: 'Organisation_public_satellites.common_name',
        enableSorting: true,
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
        cell: () => NO_DATA,
      },
      {
        id: 'altitude',
        accessorKey: 'apogee',
        header: 'Organisation_public_satellites.altitude',
        // TODO: Replace with live altitude (km) from TLE-derived position once available from backend
        cell: ({ row }) => row.original.apogee ?? NO_DATA,
      },
      {
        id: 'longitude',
        accessorKey: 'inclination',
        header: 'Organisation_public_satellites.longitude',
        // TODO: Replace with longitude slot once available from backend
        cell: () => NO_DATA,
      },
    ],
  },
];

export { publicSatellitesColumns };
