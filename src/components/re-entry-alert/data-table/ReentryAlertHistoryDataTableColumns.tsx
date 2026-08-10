'use client';
import { Download04Icon } from 'hugeicons-react';
import Link from 'next/link';

import type { TypeEventHighestImpact, TypeReentryEventReportOut, TypeRisk } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import Tag from '@/ui/tag/tag';
import { renderRiskTag } from '@/utils/Tags';

export const reentryAlertHistoryColumns: TranslatedColumnDef<TypeReentryEventReportOut>[] = [
  {
    header: 'Reentry_alert_history.report_number',
    id: 'report_number',
    enableSorting: false,
    cell: ({ row }) => {
      const { report_number, short_id, download_url } = row.original;
      const report = `Report ${report_number}`;
      const isClosed = row.original.alert_type?.includes('closedown');

      return (
        <>
          {download_url
            ? (
                <Link
                  href={download_url}
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
    accessorKey: 'highest_impact',
    enableSorting: false,
    cell: ({ getValue }) => {
      const highestImpact = getValue<TypeEventHighestImpact | null>();
      return renderRiskTag(highestImpact?.highest_risk as TypeRisk);
    },
  },
  {
    header: 'Reentry_alert_history.reentry_time',
    enableSorting: false,
    accessorKey: 'reentry_time',
    size: 70,
    cell: ({ getValue }) => dayjs(getValue<string>()).format(FORMAT_DATE_TIME),
  },
  {
    header: 'Reentry_alert_history.uncertainty_window',
    enableSorting: false,
    accessorKey: 'uncertainty_window',
    size: 70,
    cell: ({ getValue }) => `+/- ${getValue<number>()}`,
  },
];
