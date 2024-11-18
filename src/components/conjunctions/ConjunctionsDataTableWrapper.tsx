import dayjs from 'dayjs';
import { getTranslations } from 'next-intl/server';

import type { TypeGetConjunctionEventsParams } from '@/__generated__/data-contracts';
import { getCdmsLatest } from '@/actions/getCdmsLatest';
import { getConjunctionEventsList } from '@/actions/getConjunctionEventsList';
import { getUsersMe } from '@/actions/getUsersMe';
import type { ConjunctionsPageSearchParams } from '@/app/(auth)/conjunctions/page';
import { FORMAT_DATE_TIME } from '@/libs/Dayjs';
import { isAnalysist } from '@/utils/Roles';

import { DownloadData } from '../DownloadData';
import { ConjunctionsDataTable } from './ConjunctionsDataTable';

type ConjunctionsDataTableWrapperProps = {
  searchParams: ConjunctionsPageSearchParams | undefined;
};

const ConjunctionsDataTableWrapper = async ({ searchParams }: ConjunctionsDataTableWrapperProps) => {
  const t = await getTranslations('Tables');

  const latestCdms = await getCdmsLatest();
  const user = await getUsersMe();
  const conjunctions = await getConjunctionEventsList(searchParams);

  const downloadData = async () => {
    'use server';
    const downloadParams: TypeGetConjunctionEventsParams = {
      limit: 9999999,
    };

    return await getConjunctionEventsList(downloadParams);
  };

  return (
    <>
      <ConjunctionsDataTable
        conjunctions={conjunctions}
        isAnalyst={isAnalysist(user.role)}
        searchParams={searchParams}
      />
      <DownloadData type={t('Download.types.conjunction_events')} downloadData={downloadData} />
      <div className="govuk-inset-text">
        {t('Conjunctions.conjunctions_events_as_of')}
        {dayjs(latestCdms.data.updatedAt).format(FORMAT_DATE_TIME)}
      </div>
    </>
  );
};

export { ConjunctionsDataTableWrapper };
