'use client';

import type { TypeEventHighestImpact, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import Tag from '@/ui/tag/tag';
import { getReentryFragmentsRisk } from '@/utils/ReentryRisk';
import { renderRiskTag } from '@/utils/Tags';

import { ReentryReportDownloadButton } from './ReentryReportDownloadButton';

export const reentryAlertHistoryColumns: TranslatedColumnDef<TypeReentryEventReportOut>[] = [
  {
    header: 'Reentry_alert_history.report_number',
    id: 'report_number',
    enableSorting: false,
    cell: ({ row }) => {
      const { id, report_number, short_id, download_url, file_name } = row.original;
      const report = `Report ${report_number}`;
      const isClosed = row.original.alert_type?.includes('closedown');

      return (
        <>
          {download_url && id
            ? (
                <ReentryReportDownloadButton
                  id={id}
                  fileName={file_name ?? `${short_id}-report-${report_number}.json`}
                  shortId={short_id}
                  report={report}
                />
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
    accessorKey: 'decay_epoch',
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
    cell: ({ getValue, row: { original: { object_name } } }) => {
      const highestImpact = getValue<TypeEventHighestImpact | null>();
      const risk = getReentryFragmentsRisk({
        fragmentsRisk: highestImpact?.highest_risk,
        objectName: object_name,
      });
      return renderRiskTag(risk);
    },
  },
  {
    header: 'Reentry_alert_history.reentry_time',
    enableSorting: false,
    accessorKey: 'reentry_time',
    size: 70,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value ? dayjs(value).format(FORMAT_DATE_TIME) : '-';
    },
  },
  {
    header: 'Reentry_alert_history.uncertainty_window',
    enableSorting: false,
    accessorKey: 'uncertainty_window',
    size: 70,
    cell: ({ getValue }) => `+/- ${getValue<number>()}`,
  },
];
