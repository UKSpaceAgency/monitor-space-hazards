import { useTranslations } from 'next-intl';

import type { TypeConjunctionReportOut, TypeGetReentryEventReportsReentryEventShortIdParams } from '@/__generated__/data-contracts';
import { getConjunctionReports } from '@/actions/getConjunctionReports';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';

import { conjunctionAlertHistoryColumns } from './ConjunctionAlertHistoryDataTableColumns';

type ConjunctionAlertHistoryDataTableProps = {
  shortId: string;
  reports?: TypeConjunctionReportOut[];
};

const ConjunctionAlertHistoryDataTable = async ({ shortId, reports }: ConjunctionAlertHistoryDataTableProps) => {
  const t = useTranslations('Tables');

  const params: TypeGetReentryEventReportsReentryEventShortIdParams = {
    shortId,
  };

  return (
    <div>
      <DataTable
        columns={conjunctionAlertHistoryColumns}
        data={reports ?? []}
      />
      <DownloadData type={t('Download.types.conjunction_reports')} params={params} downloadAction={getConjunctionReports} />
    </div>

  );
};

export { ConjunctionAlertHistoryDataTable };
