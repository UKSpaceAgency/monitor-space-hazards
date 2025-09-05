import Link from 'next/link';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_SHORT_DATE } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import { getFullCountry } from '@/utils/Regions';

export const organisationSatellitesTableColumns: TranslatedColumnDef<TypeSatelliteOut>[] = [
  {
    accessorKey: 'commonName',
    id: 'commonName',
    header: 'Organisation_satellites.common_name',
    cell: ({ row }) => <Link className="govuk-link" href={`/satellites/${row.original.noradId}`}>{row.original.commonName}</Link>,
  },
  {
    accessorKey: 'noradId',
    id: 'noradId',
    header: 'Organisation_satellites.norad_id',
    cell: ({ row }) => row.original.noradId,
  },
  {
    accessorKey: 'internationalDesignator',
    id: 'internationalDesignator',
    header: 'Organisation_satellites.international_designator',
  },
  {
    accessorKey: 'licenseCountry',
    id: 'licenseCountry',
    header: 'Organisation_satellites.country',
    cell: ({ row }) => getFullCountry(row.original.licenseCountry),
  },
  {
    accessorKey: 'launchSite',
    id: 'launchSite',
    header: 'Organisation_satellites.launch_site',
  },
  {
    accessorKey: 'launchDate',
    id: 'launchDate',
    header: 'Organisation_satellites.launch_date',
    cell: ({ row }) => dayjs(row.original.launchDate).format(FORMAT_SHORT_DATE),
  },
];
