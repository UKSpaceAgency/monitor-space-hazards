import type { TypeGetConjunctionEventsListParams } from '@/__generated__/data-contracts';
import { getConjunctionEventsList } from '@/actions/getConjunctionEventsList';
import { getSession } from '@/actions/getSession';
import { isAnalysist, isSatteliteUser } from '@/utils/Roles';

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
    <div className="max-h-[500px] overflow-auto">
      <ConjunctionsAlertsDataTable data={data} isAnalyst={isAnalysist(session?.user.role)} haveAccessToAlerts={!isSatteliteUser(session?.user.role)} />
    </div>
  );
};

export { ConjunctionsAlertsTable };
