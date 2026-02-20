'use client';
import { Download04Icon } from 'hugeicons-react';
import Link from 'next/link';

import type { TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import Tag from '@/ui/tag/tag';
import { roundedPercent } from '@/utils/Math';
import { renderRiskTag } from '@/utils/Tags';

export const reentryAlertHistoryColumns: TranslatedColumnDef<TypeReentryEventReportOut>[] = [
  {
    header: 'Reentry_alert_history.report_number',
    id: 'report_number',
    enableSorting: false,
    cell: ({ row }) => {
      const { report_number, short_id, presigned_url } = row.original;
      const report = `Report ${report_number}`;
      const isClosed = row.original.alert_type.includes('closedown');

      return (
        <>
          {presigned_url
            ? (
                <Link
                  href={presigned_url}
                  className="govuk-link flex items-center gap-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Download04Icon />
                  <span>
                    {short_id}
                    <br />
                    {report}
                  </span>
                </Link>
              )
            : report}
          {`\n`}
          {isClosed && <Tag className="text-sm mt-2 ml-6">Closed</Tag>}
        </>
      );
    },
  },
  {
    header: 'Reentry_alert_history.report_time',
    accessorKey: 'report_time',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return dayjs(value).format(FORMAT_DATE_TIME);
    },
  },
  {
    header: 'Reentry_alert_history.risk',
    enableSorting: false,
    cell: ({ row: { original: { fragments_risk } } }) => renderRiskTag(fragments_risk ?? 'None'),
  },
  {
    header: 'Reentry_alert_history.probability',
    accessorKey: 'atmospheric_probability',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return value ? roundedPercent(value, 3) : '-';
    },
  },
  {
    header: 'Reentry_alert_history.overflight',
    accessorKey: 'overflight_time',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value[0] ? dayjs(value[0]).format(FORMAT_DATE_TIME) : '-';
    },
  },
];
