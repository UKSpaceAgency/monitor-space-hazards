import { isNumber } from 'lodash';
import Link from 'next/link';

import type { TypeReentryEventOut, TypeRisk } from '@/__generated__/data-contracts';
import { objectTypeIndex } from '@/emails/_utils/utils';
import { dayjs, FORMAT_DATE_FULL_MONTH, FORMAT_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import { roundedFixed } from '@/utils/Math';
import type { riskClasses } from '@/utils/Tags';
import { renderRiskTag } from '@/utils/Tags';

export const reentriesColumns = (haveAccessToAlerts?: boolean): TranslatedColumnDef<TypeReentryEventOut>[] => [
  {
    id: 'uk_reentry_probability',
    accessorKey: 'fragments_risk',
    header: 'Reentries.table.risk',
    size: 100,
    cell: ({ getValue, row: { original: { object_name } } }) => {
      const value = getValue<TypeRisk>();
      let risk: typeof riskClasses[keyof typeof riskClasses] | null | undefined | 'None' = value;
      if (!value) {
        risk = object_name?.toLowerCase().includes('starlink') ? 'Very low' : 'Pending';
      }

      return renderRiskTag(risk);
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
    id: 'fragments_probability',
    accessorKey: 'fragments_probability',
    header: 'Reentries.table.probability_of_fragmentation',
    size: 70,
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return isNumber(value) ? `${roundedFixed(value)}` : '-';
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
