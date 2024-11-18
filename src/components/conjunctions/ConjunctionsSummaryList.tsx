import { getTranslations } from 'next-intl/server';

import { getConjunctionEventsStats } from '@/actions/getConjunctionEventsStats';
import SummaryList from '@/ui/summary-list/summary-list';

import { ConjunctionsDataTable } from './ConjunctionsDataTable';

export const ConjunctionSummaryList = async () => {
  const t = await getTranslations('Conjunctions');

  const eventsStats = await getConjunctionEventsStats();

  return (
    <SummaryList
      rows={[
        {
          key: {
            className: 'govuk-!-width-one-half',
            children: t('upcoming_conjunction', { item: 'alerts' }),
          },
          value: {
            className: 'govuk-!-text-align-right',
            children: eventsStats.conjunctionEventAlertCount,
          },
        },
        {
          key: {
            className: 'govuk-!-width-one-half',
            children: t('upcoming_conjunction', { item: 'events' }),
          },
          value: {
            className: 'govuk-!-text-align-right',
            children: eventsStats.conjunctionEventNormalCount,
          },
        },
      ]}
    />
  );
};

export { ConjunctionsDataTable };
