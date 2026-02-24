import Link from 'next/link';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_SHORT_DATE } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import { getFullCountry } from '@/utils/Regions';

export const organisationSatellitesTableColumns: TranslatedColumnDef<TypeSatelliteOut>[] = [
  {
    accessorKey: 'common_name',
    id: 'common_name',
    header: 'Organisation_satellites.common_name',
    cell: ({ row }) => <Link className="govuk-link" href={`/satellites/${row.original.norad_id}`}>{row.original.common_name}</Link>,
  },
  {
    accessorKey: 'norad_id',
    id: 'norad_id',
    header: 'Organisation_satellites.norad_id',
    cell: ({ row }) => row.original.norad_id,
  },
  {
    accessorKey: 'international_designator',
    id: 'international_designator',
    header: 'Organisation_satellites.international_designator',
  },
  {
    accessorKey: 'license_country',
    id: 'license_country',
    header: 'Organisation_satellites.country',
    cell: ({ row }) => getFullCountry(row.original.license_country),
  },
  {
    accessorKey: 'launch_site',
    id: 'launch_site',
    header: 'Organisation_satellites.launch_site',
  },
  {
    accessorKey: 'launch_date',
    id: 'launch_date',
    header: 'Organisation_satellites.launch_date',
    cell: ({ row }) => dayjs(row.original.launch_date).format(FORMAT_SHORT_DATE),
  },
];
