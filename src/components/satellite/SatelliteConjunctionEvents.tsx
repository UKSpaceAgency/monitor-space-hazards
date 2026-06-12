import { getTranslations } from 'next-intl/server';

import type { TypeEpoch, TypeGetConjunctionEventsListParams, TypeReportFlagSettings } from '@/__generated__/data-contracts';
import { getConjunctionEventsList } from '@/actions/getConjunctionEventsList';
import { getSession } from '@/actions/getSession';
import Details from '@/ui/details/details';
import { isAnalysist, isGovUser, isSatteliteUser } from '@/utils/Roles';

import { DownloadData } from '../DownloadData';
import { SatelliteConjunctionsDataTable } from './data-table/SatelliteConjunctionsDataTable';
import { SatelliteConjunctionEventsFilters } from './SatelliteConjunctionEventsFilters';

type SatelliteConjunctionEventsProps = {
  commonName: string;
  noradId: string;
  epoch?: TypeEpoch;
  report?: TypeReportFlagSettings;
};

const SatelliteConjunctionEvents = async ({ commonName, noradId, epoch, report }: SatelliteConjunctionEventsProps) => {
  const session = await getSession();
  const t = await getTranslations('Satellite.Conjunction_events');
  const tTables = await getTranslations('Tables');
  const role = session?.user.role;

  const params: TypeGetConjunctionEventsListParams = {
    norad_id: noradId,
    epoch,
    report,
    limit: 50,
  };

  const initialData = await getConjunctionEventsList(params);

  return (
    <div>
      <p className="govuk-body">{t('description', { commonName })}</p>
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
      <Details summary={t.rich('help.title')}>
        {t.rich('help.content', { commonName })}
      </Details>
      <DownloadData type={tTables('Download.types.conjunction_events', { epoch: params.epoch === 'future' ? 'upcoming' : 'previous' })} params={params} downloadAction={getConjunctionEventsList} ariaLabel="Satellite conjunctions" />
    </div>
  );
};

export { SatelliteConjunctionEvents };
