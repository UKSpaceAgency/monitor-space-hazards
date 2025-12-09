import { useTranslations } from 'next-intl';

import type { TypeGetFragmentationReportsFragmentationEventShortIdParams } from '@/__generated__/data-contracts';
import { getFragmentationReports } from '@/actions/getFragmentationReports';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';

import { fragmentationHistoryColumns } from './FragmentationHistoryDataTableColumns';

type FragmentationHistoryDataTableProps = {
  shortId: string;
  dataPdf?: string;
};

const FragmentationHistoryDataTable = async ({ shortId, dataPdf }: FragmentationHistoryDataTableProps) => {
  const t = useTranslations('Tables');

  const reports = await getFragmentationReports({ shortId });

  const params: TypeGetFragmentationReportsFragmentationEventShortIdParams = {
    shortId,
  };

  return (
    <div data-pdf={dataPdf}>
      <div className="overflow-x-auto">
        <DataTable
          columns={fragmentationHistoryColumns}
          data={reports ?? []}
        />
      </div>
      <DownloadData type={t('Download.types.fragmentation_events')} params={params} downloadAction={getFragmentationReports} data-pdf-ignore ariaLabel="Fragmentation alert history" />
    </div>

  );
};

export { FragmentationHistoryDataTable };
