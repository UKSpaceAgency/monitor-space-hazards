import { isNumber } from 'lodash';
import Link from 'next/link';

import type { TypeEventHighestImpact, TypeReentryEventOut, TypeRisk } from '@/__generated__/data-contracts';
import { objectTypeIndex } from '@/emails/_utils/utils';
import { dayjs, FORMAT_DATE_FULL_MONTH, FORMAT_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import { roundedFixed } from '@/utils/Math';
import { getReentryFragmentsRisk } from '@/utils/ReentryRisk';
import { jsonRegionsMap } from '@/utils/Regions';
import { renderRiskTag } from '@/utils/Tags';

export const reentriesColumns = (haveAccessToAlerts?: boolean): TranslatedColumnDef<TypeReentryEventOut>[] => [
  {
    id: 'highest_impact',
    accessorKey: 'highest_impact',
    header: 'Reentries.table.risk',
    size: 100,
    cell: ({ getValue, row: { original: { object_name } } }) => {
      const highestImpact = getValue<TypeEventHighestImpact | null>();
      const risk = getReentryFragmentsRisk({
        fragmentsRisk: highestImpact?.highest_risk,
        objectName: object_name,
      });
      return renderRiskTag(risk as TypeRisk);
    },
  },
  {
    id: 'short_id',
    accessorKey: 'short_id',
    header: 'Reentries.table.event_id',
    size: 100,
    cell: ({ getValue, row: { original: { reentry_report_number } } }) => {
      const value = getValue<string>();

      const href = reentry_report_number && reentry_report_number > 0 && haveAccessToAlerts
        ? `/re-entries/${value}/alert`
        : `/re-entries/${value}`;

      return (
        <Link href={href} className="govuk-link">
          <strong>{value}</strong>
        </Link>
      );
    },
  },
  {
    id: 'object_name',
    accessorKey: 'object_name',
    header: 'Reentries.table.object',
    cell: ({ row: { original: { object_name, object_type } } }) => `${object_name ?? 'Unknown object'.toUpperCase()} ${object_type ? `(${objectTypeIndex[object_type as keyof typeof objectTypeIndex].toUpperCase()})` : ''}`,
  },
  {
    id: 'norad_id',
    accessorKey: 'norad_id',
    header: 'Reentries.table.norad_id',
    size: 100,
  },
  {
    id: 'region',
    accessorKey: 'region',
    header: 'Reentries.table.detailed_region',
    size: 100,
    enableSorting: false,
    cell: ({ row: { original: { highest_impact } } }) => highest_impact?.region ? jsonRegionsMap[highest_impact.region] ?? highest_impact?.region : 'None',
  },
  {
    id: 'probability_of_fragmentation',
    enableSorting: false,
    accessorKey: 'fragments_probability',
    header: 'Reentries.table.probability_of_fragmentation',
    size: 70,
    cell: ({ row: { original: { highest_impact } } }) => {
      const value = highest_impact?.highest_impact_data?.fragments_probability;
      return isNumber(value) ? `${roundedFixed(value)}` : 'None';
    },
  },
  {
    id: 'decay_epoch',
    accessorKey: 'decay_epoch',
    header: 'Reentries.table.date',
    size: 150,
    cell: ({ getValue }) => dayjs(getValue<string>()).format(FORMAT_DATE_FULL_MONTH),
  },
  {
    id: 'time',
    enableSorting: false,
    accessorKey: 'decay_epoch',
    header: 'Reentries.table.time',
    size: 80,
    cell: ({ getValue }) => dayjs(getValue<string>()).format(FORMAT_TIME),
  },
  {
    id: 'uncertainty_window',
    enableSorting: false,
    accessorKey: 'uncertainty_window',
    header: 'Reentries.table.window',
    size: 70,
    cell: ({ getValue }) => `+/- ${getValue<number>()}`,
  },
];
