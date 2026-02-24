'use client';
import { Download04Icon } from 'hugeicons-react';
import Link from 'next/link';

import type { TypeConjunctionReportOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import Tag from '@/ui/tag/tag';
import { roundedPercent } from '@/utils/Math';

export const conjunctionAlertHistoryColumns: TranslatedColumnDef<TypeConjunctionReportOut>[] = [
  {
    header: 'Conjunction_alert_history.report_number',
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
    header: 'Conjunction_alert_history.report_time',
    accessorKey: 'report_time',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return dayjs(value).format(FORMAT_DATE_TIME);
    },
  },
  {
    header: 'Conjunction_alert_history.risk',
    accessorKey: 'risk',
    enableSorting: false,
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
    accessorKey: 'collision_probability',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return roundedPercent(value);
    },
  },
  {
    header: 'Conjunction_alert_history.overflight',
    accessorKey: 'tca_time',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value ? dayjs(value).format(FORMAT_DATE_TIME) : 'Unknown';
    },
  },
];
