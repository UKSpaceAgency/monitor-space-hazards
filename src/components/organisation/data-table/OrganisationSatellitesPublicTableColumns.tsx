import Link from 'next/link';

import type { TypeSatelliteWithMetadataOut } from '@/__generated__/data-contracts';
import { dayjs } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';

// TODO: orbit_regime, altitude (km) and longitude (°) are not available on TypeSatelliteWithMetadataOut.
// The backend GET /v1/satellites/with-metadata endpoint needs to include TLE-derived positional
// fields (orbit regime, current altitude, longitude slot) to populate the "Latest recorded position" group.
const getPublicSatellitesColumns = (isInternational: boolean): TranslatedColumnDef<TypeSatelliteWithMetadataOut>[] => ([
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
          isInternational
            ? row.original.common_name
            : (
                <Link className="govuk-link" href={`/satellites/${row.original.norad_id}`}>
                  {row.original.common_name}
                </Link>
              )
        ),
      },
      {
        accessorKey: 'norad_id',
        id: 'norad_id',
        header: 'Organisation_public_satellites.norad_id',
        enableSorting: true,
        cell: ({ row }) => row.original.norad_id ?? '-',
      },
      {
        accessorKey: 'launch_date',
        id: 'launch_date',
        header: 'Organisation_public_satellites.launch_date',
        enableSorting: false,
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
        id: 'apogee',
        accessorKey: 'apogee',
        header: 'Organisation_public_satellites.apogee',
        enableSorting: false,
      },
      {
        id: 'perigee',
        accessorKey: 'perigee',
        header: 'Organisation_public_satellites.perigee',
        enableSorting: false,
      },
      {
        id: 'inclination',
        accessorKey: 'inclination',
        header: 'Organisation_public_satellites.inclination',
        enableSorting: false,
      },
      {
        id: 'period',
        accessorKey: 'period',
        header: 'Organisation_public_satellites.period',
        enableSorting: false,
      },
    ],
  },
]);

export { getPublicSatellitesColumns };
