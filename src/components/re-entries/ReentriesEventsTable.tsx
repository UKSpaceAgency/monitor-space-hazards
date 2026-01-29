import dayjs from 'dayjs';
import { getTranslations } from 'next-intl/server';

import type { TypeEpoch, TypeGetReentryEventsParams } from '@/__generated__/data-contracts';
import { getCdmsLatest } from '@/actions/getCdmsLatest';
import { getReentryEvents } from '@/actions/getReentryEvents';
import { getSession } from '@/actions/getSession';
import { FORMAT_DATE_TIME } from '@/libs/Dayjs';
import { isAgencyUser, isSatteliteUser } from '@/utils/Roles';

import { SearchBar } from '../SearchBar';
import { ReentriesDataTable } from './data-table/ReentriesDataTable';
import { ReentriesEventsTableFilters } from './ReentriesEventsTableFilters';

const getSearchBarLabel = async (epoch: TypeEpoch | undefined): Promise<string> => {
  const t = await getTranslations('Tables.Reentries');

  switch (epoch) {
    case 'all':
      return t('search_bar.allLabel');
    case 'future':
      return t('search_bar.upcomingLabel');
    case 'past':
      return t('search_bar.previousLabel');
    default:
      return t('search_bar.allLabel');
  }
};

type ReentriesEventsTableProps = {
  initialParams?: TypeGetReentryEventsParams;
};

const ReentriesEventsTable = async ({ initialParams }: ReentriesEventsTableProps) => {
  const t = await getTranslations('Tables.Reentries');
  const session = await getSession();
  const role = session?.user.role;
  const latestCdms = await getCdmsLatest();
  const params: TypeGetReentryEventsParams = {
    ...initialParams,
    sort_by: 'decay_epoch',
    sort_order: 'desc',
    limit: 50,
  };

  const searchBarLabel = await getSearchBarLabel(params.epoch);
  const initialData = await getReentryEvents(initialParams);

  return (
    <div>
      <SearchBar label={`${searchBarLabel}:`} id="reentries_search_bar" placeholder={t('search_bar.placeholder')} ariaLabel={searchBarLabel} />
      <ReentriesEventsTableFilters showFilterRadios={!isSatteliteUser(session?.user.role)} />
      <ReentriesDataTable params={params} initialData={initialData} haveAccessToAlerts={isAgencyUser(role)} />
      <div className="govuk-inset-text">
        {t('reentries_events_as_of')}
        {dayjs(latestCdms.data.updatedAt).format(FORMAT_DATE_TIME)}
      </div>
    </div>
  );
};

export { ReentriesEventsTable };
