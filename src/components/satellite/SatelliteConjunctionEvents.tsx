import { getTranslations } from 'next-intl/server';

import type { TypeEpoch, TypeGetConjunctionEventsListParams } from '@/__generated__/data-contracts';
import { getConjunctions } from '@/actions/getConjunctions';

import { SearchBar } from '../SearchBar';
import { SatelliteConjunctionsDataTable } from './data-table/SatelliteConjunctionsDataTable';

type SatelliteConjunctionEventsProps = {
  noradId: string;
  epoch: TypeEpoch;
  id: string;
  query?: string;
  ariaLabel?: string;
};

const SatelliteConjunctionEvents = async ({ noradId, query, epoch, id, ariaLabel }: SatelliteConjunctionEventsProps) => {
  const t = await getTranslations('Satellite.Conjunction_events');
  const type = epoch === 'future' ? t('type.future') : t('type.past');
  const searchParamName = epoch === 'future' ? 'upcoming_search_like' : 'previous_search_link';
  const searchBarLabel = epoch === 'future' ? t('search_bar.upcomingLabel') : t('search_bar.previousLabel');

  const params: TypeGetConjunctionEventsListParams = {
    search_like: query,
    norad_id: noradId,
    sort_by: 'tca_time',
    sort_order: epoch === 'future' ? 'asc' : 'desc',
    epoch,
    limit: 50,
  };

  const initialData = await getConjunctions(params);

  return (
    <div className="mb-12">
      <h2 className="govuk-heading-l" data-anchor={`${epoch}-conjunction-events`}>{t('title', { type })}</h2>
      <SearchBar label={searchBarLabel} placeholder={t('search_bar.placeholder')} paramName={searchParamName} ariaLabel={ariaLabel} id={id} />
      <SatelliteConjunctionsDataTable params={params} initialData={initialData} />
    </div>
  );
};

export { SatelliteConjunctionEvents };
// import type { TypeEpoch, TypeGetConjunctionEventsListParams, TypeReportFlagSettings } from '@/__generated__/data-contracts';
// import { getConjunctionEventsList } from '@/actions/getConjunctionEventsList';
// import { getSession } from '@/actions/getSession';
// import { isAnalysist, isGovUser, isSatteliteUser } from '@/utils/Roles';

// import { SatelliteConjunctionsDataTable } from './data-table/SatelliteConjunctionsDataTable';
// import { SatelliteConjunctionEventsFilters } from './SatelliteConjunctionEventsFilters';

// type SatelliteConjunctionEventsProps = {
//   noradId: string;
//   epoch?: TypeEpoch;
//   report?: TypeReportFlagSettings;
// };

// const SatelliteConjunctionEvents = async ({ noradId, epoch, report }: SatelliteConjunctionEventsProps) => {
//   const session = await getSession();
//   const role = session?.user.role;

//   const params: TypeGetConjunctionEventsListParams = {
//     norad_id: noradId,
//     epoch,
//     report,
//     limit: 50,
//   };

//   const initialData = await getConjunctionEventsList(params);

//   return (
//     <div className="mb-12">
//       <SatelliteConjunctionEventsFilters
//         params={{
//           epoch,
//           report,
//         }}
//         showFilterRadios={!isSatteliteUser(session?.user.role)}
//       />
//       <SatelliteConjunctionsDataTable
//         params={params}
//         initialData={initialData}
//         isAnalyst={isAnalysist(role) || isGovUser(role)}
//         haveAccessToAlerts={!isSatteliteUser(role)}
//       />
//     </div>
//   );
// };

// export { SatelliteConjunctionEvents };
