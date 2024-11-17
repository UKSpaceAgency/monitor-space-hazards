import { useTranslations } from 'next-intl';

import type { TypeEpoch } from '@/__generated__/data-contracts';
import { SatelliteConjunctionsDataTable } from '@/components/data-tables/SatelliteConjunctionsDataTable';
import { SearchBar } from '@/components/SearchBar';

type SatelliteConjunctionEventsProps = {
  noradId: string;
  epoch: TypeEpoch;
  query?: string;
};

const SatelliteConjunctionEvents = ({ noradId, query, epoch }: SatelliteConjunctionEventsProps) => {
  const t = useTranslations('SatellitePage.ConjunctionEvents');
  const type = epoch === 'future' ? t('type.future') : t('type.past');
  const searchParamName = epoch === 'future' ? 'upcoming_search_like' : 'previous_search_link';

  return (
    <div className="mb-12">
      <h2 className="govuk-heading-l" data-anchor="upcoming-conjunction-events">{t('title', { type })}</h2>
      <SearchBar label={t('search_bar.label')} placeholder={t('search_bar.placeholder')} paramName={searchParamName} />
      <SatelliteConjunctionsDataTable noradId={noradId} query={query} epoch={epoch} />
    </div>
  );
};

export { SatelliteConjunctionEvents };
