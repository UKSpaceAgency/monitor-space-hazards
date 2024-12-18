'use client';
import Link from 'next/link';

import type { TypeConjunctionReportOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import Tag from '@/ui/tag/tag';
import { roundedPercent } from '@/utils/Math';

export const conjunctionAlertHistoryColumns: TranslatedColumnDef<TypeConjunctionReportOut>[] = [
  {
    header: 'Conjunction_alert_history.report_number',
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
    header: 'Conjunction_alert_history.report_time',
    accessorKey: 'reportTime',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return dayjs(value).format(FORMAT_DATE_TIME);
    },
  },
  {
    header: 'Conjunction_alert_history.risk',
    accessorKey: 'risk',
    cell: ({ getValue }) => {
      const risk = getValue<string>();
      const classes = {
        Low: 'govuk-tag--green',
        Medium: 'govuk-tag--yellow',
        High: 'govuk-tag--red',
      };

      return risk
        ? (
            <Tag className={classes[risk as unknown as keyof typeof classes]}>
              {risk}
            </Tag>
          )
        : (
            <Tag>N/A</Tag>
          );
    },
  },
  {
    header: 'Conjunction_alert_history.probability',
    accessorKey: 'collisionProbability',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return roundedPercent(value);
    },
  },
  {
    header: 'Conjunction_alert_history.overflight',
    accessorKey: 'tcaTime',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value[0] ? dayjs(value[0]).format(FORMAT_DATE_TIME) : 'Unknown';
    },
  },
];
