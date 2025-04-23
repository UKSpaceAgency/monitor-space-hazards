'use client';
import { Download04Icon } from 'hugeicons-react';
import Link from 'next/link';

import type { TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import Tag from '@/ui/tag/tag';
import { roundedPercent } from '@/utils/Math';

export const reentryAlertHistoryColumns: TranslatedColumnDef<TypeReentryEventReportOut>[] = [
  {
    header: 'Reentry_alert_history.report_number',
    id: 'reportNumber',
    enableSorting: false,
    cell: ({ row }) => {
      const { reportNumber, shortId, presignedUrl } = row.original;
      const report = `Report ${reportNumber}`;
      const isClosed = row.original.alertType.includes('closedown');

      return (
        <>
          {presignedUrl
            ? (
                <Link
                  href={presignedUrl}
                  className="govuk-link flex items-center gap-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Download04Icon />
                  <span>
                    {shortId}
                    <br />
                    {report}
                  </span>
                </Link>
              )
            : report}
          {isClosed && <Tag className="text-sm mt-2 ml-6">Closed</Tag>}
        </>
      );
    },
  },
  {
    header: 'Reentry_alert_history.report_time',
    accessorKey: 'reportTime',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return dayjs(value).format(FORMAT_DATE_TIME);
    },
  },
  {
    header: 'Reentry_alert_history.risk',
    enableSorting: false,
    cell: ({ row: { original: { monteCarloProbability } } }) => {
      if (monteCarloProbability > 0.05) {
        return (
          <Tag color="red">High</Tag>
        );
      } else if (monteCarloProbability <= 0.05 && monteCarloProbability > 0.01) {
        return (
          <Tag color="yellow">
            Medium
          </Tag>
        );
      } else {
        return (
          <Tag color="green">Low</Tag>
        );
      }
    },
  },
  {
    header: 'Reentry_alert_history.probability',
    accessorKey: 'monteCarloProbability',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return value ? roundedPercent(value, 3) : '-';
    },
  },
  {
    header: 'Reentry_alert_history.overflight',
    accessorKey: 'overflightTime',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value[0] ? dayjs(value[0]).format(FORMAT_DATE_TIME) : '-';
    },
  },
];
