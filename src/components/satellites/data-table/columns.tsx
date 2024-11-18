'use client';

import Link from 'next/link';

import type { TypeSatelliteWithMetadataOut } from '@/__generated__/data-contracts';
import type { TranslatedColumnDef } from '@/types';

export const columns: TranslatedColumnDef<TypeSatelliteWithMetadataOut>[] = [
  {
    id: 'commonName',
    accessorKey: 'commonName',
    header: 'Satellites.common_name',
    size: 150,
    cell: ({ getValue, row }) => (
      <Link
        href={`/satellites/${row?.original.noradId}`}
        passHref
        className="govuk-link"
      >
        {getValue() as string}
      </Link>
    ),
  },
  {
    id: 'noradId',
    accessorKey: 'noradId',
    header: 'Satellites.norad_id',
    size: 100,
  },
  {
    id: 'internationalDesignator',
    accessorKey: 'internationalDesignator',
    header: 'Satellites.international_designator',
    size: 100,
  },
  {
    id: 'futureEventsCount',
    accessorKey: 'futureEventsCount',
    header: 'Satellites.upcoming_known_conjunction_events',
  },
];
