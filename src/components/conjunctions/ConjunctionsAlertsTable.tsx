import type { TypeGetConjunctionEventsListParams } from '@/__generated__/data-contracts';
import { getConjunctionEventsList } from '@/actions/getConjunctionEventsList';
import { getSession } from '@/actions/getSession';
import { isAgencyUser, isAnalysist, isGovUser } from '@/utils/Roles';

import { ConjunctionsAlertsDataTable } from './data-table/ConjunctionsAlertsDataTable';

const params: TypeGetConjunctionEventsListParams = {
  report: 'present',
};

const ConjunctionsAlertsTable = async () => {
  const data = await getConjunctionEventsList(params);
  const session = await getSession();

  if (!data.length) {
    return null;
  }

  return (
    <ConjunctionsAlertsDataTable data={data} isAnalyst={isAnalysist(session?.user.role)} haveAccessToAlerts={isAgencyUser(session?.user.role) || isGovUser(session?.user.role)} />
  );
};

export { ConjunctionsAlertsTable };
