'use client';
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

      return presignedUrl
        ? (
            <Link
              href={presignedUrl}
              className="govuk-details__summary govuk-details__summary-text"
              target="_blank"
              rel="noreferrer"
            >
              {shortId}
              <br />
              {report}
            </Link>
          )
        : report;
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
    cell: ({ row: { original: { probability } } }) => {
      if (probability > 0.05) {
        return (
          <Tag color="red">High</Tag>
        );
      } else if (probability <= 0.05 && probability > 0.01) {
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
    accessorKey: 'probability',
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
      return value[0] ? dayjs(value[0]).format(FORMAT_DATE_TIME) : 'Unknown';
    },
  },
];
