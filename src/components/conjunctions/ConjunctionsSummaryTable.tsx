import { getTranslations } from 'next-intl/server';

import type { TypeConjunctionEventCount } from '@/__generated__/data-contracts';
import { getConjunctionEventsStats } from '@/actions/getConjunctionEventsStats';

import type { InformationsTableRow } from '../InformationsTable';
import { InformationsTable } from '../InformationsTable';
import { ConjunctionsDataTable } from './ConjunctionsDataTable';

type ConjunctionsSummaryInformations = Pick<TypeConjunctionEventCount, 'conjunctionEventAlertCount' | 'conjunctionEventNormalCount'>;

export const ConjunctionsSummaryTable = async () => {
  const t = await getTranslations('Tables.Conjunctions');

  const eventsStats: ConjunctionsSummaryInformations = await getConjunctionEventsStats();

  const baseInformations: InformationsTableRow<ConjunctionsSummaryInformations>[] = [{
    header: t('upcoming_conjunction', { item: 'alerts' }),
    renderCell: row => <div className="govuk-!-text-align-right">{row.conjunctionEventAlertCount}</div>,
    accessorKey: 'conjunctionEventAlertCount',
  }, {
    header: t('upcoming_conjunction', { item: 'events' }),
    renderCell: row => <div className="govuk-!-text-align-right">{row.conjunctionEventNormalCount}</div>,
    accessorKey: 'conjunctionEventNormalCount',
  }];

  return <InformationsTable rows={baseInformations} data={eventsStats} headerCellWidth="sm" />;
};

export { ConjunctionsDataTable };