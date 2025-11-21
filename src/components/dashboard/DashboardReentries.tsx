import { getTranslations } from 'next-intl/server';

import type { TypeGetReentryEventsParams } from '@/__generated__/data-contracts';
import { getReentryEvents } from '@/actions/getReentryEvents';
import { getSession } from '@/actions/getSession';
import { isAgencyUser, isGovUser } from '@/utils/Roles';

import { DashboardReentriesDataTable } from './data-table/ReentriesDataTable';

const params: TypeGetReentryEventsParams = {
  limit: 5,
};

const DashboardReentries = async () => {
  const t = await getTranslations('Reentries');
  const data = await getReentryEvents(params);
  const session = await getSession();

  if (!data.length) {
    return null;
  }

  return (
    <div>
      <h2 className="govuk-heading-m pb-5 mb-8 border-b border-midGrey">{t('title')}</h2>
      <DashboardReentriesDataTable data={data} haveAccessToAlerts={isAgencyUser(session?.user.role) || isGovUser(session?.user.role)} />
    </div>
  );
};

export { DashboardReentries };
