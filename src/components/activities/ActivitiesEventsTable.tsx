import dayjs from 'dayjs';
import { getTranslations } from 'next-intl/server';

import type { TypeGetActivityEventsParams } from '@/__generated__/data-contracts';
import { getActivityEvents } from '@/actions/getActivityEvents';
import { getCdmsLatest } from '@/actions/getCdmsLatest';
import { getConjunctionEventsList } from '@/actions/getConjunctionEventsList';
import { FORMAT_DATE_TIME } from '@/libs/Dayjs';

import { DownloadData } from '../DownloadData';
import { ActivitiesDataTable } from './data-table/ActivitiesDataTable';

type ActivitiesEventsTableProps = {
  params: TypeGetActivityEventsParams;
};

const ActivitiesEventsTable = async ({ params }: ActivitiesEventsTableProps) => {
  const t = await getTranslations('Tables');

  const latestCdms = await getCdmsLatest();
  const activities = await getActivityEvents(params);

  const downloadData = async () => {
    'use server';
    return await getConjunctionEventsList();
  };

  return (
    <>
      <ActivitiesDataTable
        activities={activities}
        params={params}
      />
      <DownloadData type={t('Download.types.activities')} params={params} downloadAction={downloadData} ariaLabel="Activities" />
      {latestCdms && (
        <div className="govuk-inset-text">
          {t('Activities.activity_events_as_of')}
          {dayjs(latestCdms.data.updated_at).format(FORMAT_DATE_TIME)}
        </div>
      )}
    </>
  );
};

export { ActivitiesEventsTable };
