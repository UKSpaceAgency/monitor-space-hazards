import type { TypeEpoch, TypeGetConjunctionEventsListParams, TypeReportFlagSettings } from '@/__generated__/data-contracts';
import { getConjunctionEventsList } from '@/actions/getConjunctionEventsList';
import { getSession } from '@/actions/getSession';
import { isAnalysist, isGovUser, isSatteliteUser } from '@/utils/Roles';

import { SatelliteConjunctionsDataTable } from './data-table/SatelliteConjunctionsDataTable';
import { SatelliteConjunctionEventsFilters } from './SatelliteConjunctionEventsFilters';

type SatelliteConjunctionEventsProps = {
  noradId: string;
  epoch?: TypeEpoch;
  report?: TypeReportFlagSettings;
};

const SatelliteConjunctionEvents = async ({ noradId, epoch, report }: SatelliteConjunctionEventsProps) => {
  const session = await getSession();
  const role = session?.user.role;

  const params: TypeGetConjunctionEventsListParams = {
    norad_id: noradId,
    epoch,
    report,
    limit: 50,
  };

  const initialData = await getConjunctionEventsList(params);

  return (
    <div className="mb-12">
      <SatelliteConjunctionEventsFilters
        params={{
          epoch,
          report,
        }}
        showFilterRadios={!isSatteliteUser(session?.user.role)}
      />
      <SatelliteConjunctionsDataTable
        params={params}
        initialData={initialData}
        isAnalyst={isAnalysist(role) || isGovUser(role)}
        haveAccessToAlerts={!isSatteliteUser(role)}
      />
    </div>
  );
};

export { SatelliteConjunctionEvents };
