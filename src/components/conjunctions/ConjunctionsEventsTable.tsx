import { getTranslations } from 'next-intl/server';

import { getCdmsLatest } from '@/actions/getCdmsLatest';
import { getConjunctionEventsList } from '@/actions/getConjunctionEventsList';
import { getUsersMe } from '@/actions/getUsersMe';
import type { ConjunctionsPageSearchParams } from '@/app/(auth)/conjunctions/page';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import { isAnalysist } from '@/utils/Roles';

import { DownloadData } from '../DownloadData';
import { ConjunctionsDataTable } from './data-table/ConjunctionsDataTable';

type ConjunctionsEventsTableProps = {
  params: ConjunctionsPageSearchParams;
};

const ConjunctionsEventsTable = async ({ params }: ConjunctionsEventsTableProps) => {
  const t = await getTranslations('Tables');

  const latestCdms = await getCdmsLatest();
  const user = await getUsersMe();
  const conjunctions = await getConjunctionEventsList(params);

  const downloadData = async () => {
    'use server';
    return await getConjunctionEventsList();
  };

  return (
    <>
      <ConjunctionsDataTable
        conjunctions={conjunctions}
        isAnalyst={isAnalysist(user.role)}
        params={params}
      />
      <DownloadData type={t('Download.types.conjunction_events')} params={params} downloadAction={downloadData} />
      <div className="govuk-inset-text">
        {t('Conjunctions.conjunctions_events_as_of')}
        {dayjs(latestCdms.data.updatedAt).format(FORMAT_DATE_TIME)}
      </div>
    </>
  );
};

export { ConjunctionsEventsTable };
