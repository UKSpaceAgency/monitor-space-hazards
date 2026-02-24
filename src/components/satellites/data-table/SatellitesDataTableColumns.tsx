'use client';

import Link from 'next/link';

import type { TypeSatelliteWithMetadataOut } from '@/__generated__/data-contracts';
import type { TranslatedColumnDef } from '@/types';

export const satellitesColumns: TranslatedColumnDef<TypeSatelliteWithMetadataOut>[] = [
  {
    accessorKey: 'common_name',
    header: 'Satellites.common_name',
    cell: ({ renderValue, row }) => (
      <Link
        href={`/satellites/${row?.original.norad_id}`}
        className="govuk-link"
      >
        {renderValue<string>()}
      </Link>
    ),
  },
  {
    accessorKey: 'norad_id',
    header: 'Satellites.norad_id',
  },
  {
    accessorKey: 'international_designator',
    header: 'Satellites.international_designator',
  },
  {
    id: 'future_events_count',
    accessorKey: 'metadata.future_events_count',
    header: 'Satellites.upcoming_known_conjunction_events',
    size: 200,
  },
];
