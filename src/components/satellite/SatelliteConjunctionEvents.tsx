import { getTranslations } from 'next-intl/server';

import type { TypeEpoch, TypeGetConjunctionEventsListParams } from '@/__generated__/data-contracts';
import { getConjunctions } from '@/actions/getConjunctions';
import { SearchBar } from '@/components/SearchBar';

import { SatelliteConjunctionsDataTable } from './data-table/SatelliteConjunctionsDataTable';

type SatelliteConjunctionEventsProps = {
  noradId: string;
  epoch: TypeEpoch;
  query?: string;
};

const SatelliteConjunctionEvents = async ({ noradId, query, epoch }: SatelliteConjunctionEventsProps) => {
  const t = await getTranslations('Satellite.ConjunctionEvents');
  const type = epoch === 'future' ? t('type.future') : t('type.past');
  const searchParamName = epoch === 'future' ? 'upcoming_search_like' : 'previous_search_link';

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
      <h2 className="govuk-heading-l" data-anchor="upcoming-conjunction-events">{t('title', { type })}</h2>
      <SearchBar label={t('search_bar.label')} placeholder={t('search_bar.placeholder')} paramName={searchParamName} />
      <SatelliteConjunctionsDataTable params={params} initialData={initialData} />
    </div>
  );
};

export { SatelliteConjunctionEvents };
