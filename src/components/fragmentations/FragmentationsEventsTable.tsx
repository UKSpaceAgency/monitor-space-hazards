import { getTranslations } from 'next-intl/server';

import { getCdmsLatest } from '@/actions/getCdmsLatest';
import { getFragmentationEventsList } from '@/actions/getFragmentationEventsList';
import type { FragmentationsPageSearchParams } from '@/app/(auth)/fragmentations/page';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';

import { DownloadData } from '../DownloadData';
import { FragmentationsDataTable } from './data-table/FragmentationsDataTable';

type FragmentationsEventsTableProps = {
  params: FragmentationsPageSearchParams;
};

const FragmentationsEventsTable = async ({ params }: FragmentationsEventsTableProps) => {
  const t = await getTranslations('Tables');

  const latestCdms = await getCdmsLatest();
  const fragmentations = await getFragmentationEventsList(params);

  const downloadData = async () => {
    'use server';
    return await getFragmentationEventsList();
  };

  return (
    <>
      <FragmentationsDataTable
        fragmentations={fragmentations}
        params={params}
      />
      <DownloadData type={t('Download.types.fragmentation_events')} params={params} downloadAction={downloadData} ariaLabel="Fragmentation events" />
      <div className="govuk-inset-text">
        {t('Fragmentations.fragmentations_events_as_of')}
        {dayjs(latestCdms.data.updatedAt).format(FORMAT_DATE_TIME)}
      </div>
    </>
  );
};

export { FragmentationsEventsTable };
