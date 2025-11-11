'use client';
import { Download04Icon } from 'hugeicons-react';
import Link from 'next/link';

import type { TypeFragmentationReportOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import Tag from '@/ui/tag/tag';

export const fragmentationHistoryColumns: TranslatedColumnDef<TypeFragmentationReportOut>[] = [
  {
    header: 'Fragmentation_history.report_number',
    id: 'reportNumber',
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
    header: 'Fragmentation_history.report_time',
    enableSorting: false,
    cell: () => 'MISSING DATA',
  },
  {
    header: 'Fragmentation_history.event_epoch',
    accessorKey: 'event_epoch',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return dayjs(value).format(FORMAT_DATE_TIME);
    },
  },
];
