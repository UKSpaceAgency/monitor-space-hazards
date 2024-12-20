import { useTranslations } from 'next-intl';

import type { TypeConjunctionReportOut, TypeGetReentryEventReportsReentryEventShortIdParams } from '@/__generated__/data-contracts';
import { getConjunctionReports } from '@/actions/getConjunctionReports';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';

import { conjunctionAlertHistoryColumns } from './ConjunctionAlertHistoryDataTableColumns';

type ConjunctionAlertHistoryDataTableProps = {
  shortId: string;
  reports?: TypeConjunctionReportOut[];
  dataPdf?: string;
};

const ConjunctionAlertHistoryDataTable = async ({ shortId, reports, dataPdf }: ConjunctionAlertHistoryDataTableProps) => {
  const t = useTranslations('Tables');

  const params: TypeGetReentryEventReportsReentryEventShortIdParams = {
    shortId,
  };

  return (
    <div data-pdf={dataPdf}>
      <DataTable
        columns={conjunctionAlertHistoryColumns}
        data={reports ?? []}
      />
      <DownloadData type={t('Download.types.conjunction_reports')} params={params} downloadAction={getConjunctionReports} data-pdf-ignore />
    </div>

  );
};

export { ConjunctionAlertHistoryDataTable };
