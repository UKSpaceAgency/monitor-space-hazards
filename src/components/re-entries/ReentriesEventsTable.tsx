import { getTranslations } from 'next-intl/server';

import type { TypeGetReentryEventsParams } from '@/__generated__/data-contracts';
import { getReentryEvents } from '@/actions/getReentryEvents';
import { getSession } from '@/actions/getSession';
import { isAgencyUser, isGovUser, isSatteliteUser } from '@/utils/Roles';

import { SearchBar } from '../SearchBar';
import { ReentriesDataTable } from './data-table/ReentriesDataTable';
import { ReentriesEventsTableFilters } from './ReentriesEventsTableFilters';

type ReentriesEventsTableProps = {
  initialParams?: TypeGetReentryEventsParams;
};

const ReentriesEventsTable = async ({ initialParams }: ReentriesEventsTableProps) => {
  const t = await getTranslations('Tables.Reentries');
  const session = await getSession();
  const role = session?.user.role;

  const params: TypeGetReentryEventsParams = {
    ...initialParams,
    sort_by: 'time_window_start',
    sort_order: 'desc',
    limit: 50,
  };

  const initialData = await getReentryEvents(initialParams);

  return (
    <div>
      <SearchBar label={t('search_bar.label')} placeholder={t('search_bar.placeholder')} />
      <ReentriesEventsTableFilters showFilterRadios={!isSatteliteUser(session?.user.role)} />
      <ReentriesDataTable params={params} initialData={initialData} haveAccessToAlerts={isAgencyUser(role) || isGovUser(role)} />
    </div>
  );
};

export { ReentriesEventsTable };
