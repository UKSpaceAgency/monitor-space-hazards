import { getTranslations } from 'next-intl/server';

import type { TypeConjunctionEventCount } from '@/__generated__/data-contracts';
import { getConjunctionEventsStats } from '@/actions/getConjunctionEventsStats';

import type { InformationsTableRow } from '../InformationsTable';
import { InformationsTable } from '../InformationsTable';

type ConjunctionsSummaryTableInformations = Pick<TypeConjunctionEventCount, 'conjunction_event_alert_count' | 'conjunction_event_normal_count'>;

export const ConjunctionsSummaryTable = async () => {
  const t = await getTranslations('Tables.Conjunctions');

  const eventsStats: ConjunctionsSummaryTableInformations = await getConjunctionEventsStats();

  const baseInformations: InformationsTableRow<ConjunctionsSummaryTableInformations>[] = [{
    header: t('upcoming_conjunction', { item: 'alerts' }),
    renderCell: row => <div className="govuk-!-text-align-right">{row.conjunction_event_alert_count}</div>,
    accessorKey: 'conjunction_event_alert_count',
  }, {
    header: t('upcoming_conjunction', { item: 'events' }),
    renderCell: row => <div className="govuk-!-text-align-right">{row.conjunction_event_normal_count}</div>,
    accessorKey: 'conjunction_event_normal_count',
  }];

  return <InformationsTable rows={baseInformations} data={eventsStats} headerCellWidth="sm" />;
};
