import Link from 'next/link';

import type { ScreeningResults } from '@/actions/getFragmentationEventScreeningResults';
import type { TranslatedColumnDef } from '@/types';

export const fragmentationAdditionalRiskTableColumns: TranslatedColumnDef<ScreeningResults>[] = [
  {
    accessorKey: 'object_name',
    header: 'Fragmentation_additional_risk.object_name',
    cell: ({ row: { original: { norad_id, object_name } } }) => {
      return <Link className="govuk-link" href={`/satellites/${norad_id}`}>{object_name}</Link>;
    },
  },
  {
    accessorKey: 'norad_id',
    header: 'Fragmentation_additional_risk.norad_id',
  },
  {
    accessorKey: 'current_tally',
    header: 'Fragmentation_additional_risk.current_tally',
  },
  {
    accessorKey: 'fragments_tally',
    header: 'Fragmentation_additional_risk.fragments_tally',
  },
  {
    accessorKey: 'apogee',
    header: 'Fragmentation_additional_risk.apogee',
  },
  {
    accessorKey: 'perigee',
    header: 'Fragmentation_additional_risk.perigee',
  },
  {
    accessorKey: 'inclination',
    header: 'Fragmentation_additional_risk.inclination',
  },
];
