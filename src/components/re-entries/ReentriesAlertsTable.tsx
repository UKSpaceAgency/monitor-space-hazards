import type { TypeGetReentryEventsParams } from '@/__generated__/data-contracts';
import { getReentryEvents } from '@/actions/getReentryEvents';
import { getSession } from '@/actions/getSession';
import { isAgencyUser, isGovUser } from '@/utils/Roles';

import { ReentriesAlertsDataTable } from './data-table/ReentriesAlertsDataTable';

const params: TypeGetReentryEventsParams = {
  report: 'present',
};

const ReentriesAlertsTable = async () => {
  const data = await getReentryEvents(params);
  const session = await getSession();

  if (!data.length) {
    return null;
  }

  return (
    <ReentriesAlertsDataTable data={data} haveAccessToAlerts={isAgencyUser(session?.user.role) || isGovUser(session?.user.role)} />
  );
};

export { ReentriesAlertsTable };
