'use client';

import Link from 'next/link';

import type { TypeSatelliteWithMetadataOut } from '@/__generated__/data-contracts';
import type { TranslatedColumnDef } from '@/types';

export const satellitesColumns: TranslatedColumnDef<TypeSatelliteWithMetadataOut>[] = [
  {
    accessorKey: 'commonName',
    header: 'Satellites.common_name',
    size: 150,
    cell: ({ renderValue, row }) => (
      <Link
        href={`/satellites/${row?.original.noradId}`}
        passHref
        className="govuk-link"
      >
        {renderValue<string>()}
      </Link>
    ),
  },
  {
    accessorKey: 'noradId',
    header: 'Satellites.norad_id',
    size: 100,
  },
  {
    accessorKey: 'internationalDesignator',
    header: 'Satellites.international_designator',
    size: 100,
  },
  {
    id: `futureEventsCount`,
    accessorKey: `metadata.futureEventsCount`,
    header: 'Satellites.upcoming_known_conjunction_events',
  },
];
