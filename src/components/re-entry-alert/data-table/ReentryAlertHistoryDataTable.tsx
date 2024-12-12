import { useTranslations } from 'next-intl';

import type { TypeGetReentryEventReportsReentryEventShortIdParams, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import { getReentryReports } from '@/actions/getReentryReports';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';

import { reentryAlertHistoryColumns } from './ReentryAlertHistoryDataTableColumns';

type ReentryAlertHistoryDataTableProps = {
  shortId: string;
  reports?: TypeReentryEventReportOut[];
};

const ReentryAlertHistoryDataTable = async ({ shortId, reports }: ReentryAlertHistoryDataTableProps) => {
  const t = useTranslations('Tables');

  const params: TypeGetReentryEventReportsReentryEventShortIdParams = {
    shortId,
  };

  return (
    <div>
      <DataTable
        columns={reentryAlertHistoryColumns}
        data={reports ?? []}
      />
      <DownloadData type={t('Download.types.reentry_reports')} params={params} downloadAction={getReentryReports} />
    </div>

  );
};

export { ReentryAlertHistoryDataTable };
