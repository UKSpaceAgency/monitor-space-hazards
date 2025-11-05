import { getTranslations } from 'next-intl/server';

import type { TypeReentryEventCount } from '@/__generated__/data-contracts';
import { getReentryEventsStats } from '@/actions/getReentryEventsStats';
import Details from '@/ui/details/details';

import type { InformationsTableRow } from '../InformationsTable';
import { InformationsTable } from '../InformationsTable';

const ReentriesSummaryTable = async () => {
  const t = await getTranslations('Tables.Reentries_summary');

  const eventsStats = await getReentryEventsStats();

  const baseInformations: InformationsTableRow<TypeReentryEventCount>[] = [{
    header: t('upcoming_reentry', { item: 'alerts' }),
    renderCell: row => <div className="govuk-!-text-align-right">{row.reentryEventAlertCount}</div>,
    accessorKey: 'reentryEventAlertCount',
  }, {
    header: t('upcoming_reentry', { item: 'events worldwide' }),
    renderCell: row => <div className="govuk-!-text-align-right">{row.reentryEventTotalCount}</div>,
    accessorKey: 'reentryEventTotalCount',
  }];

  return (
    <div>
      <InformationsTable rows={baseInformations} data={eventsStats} headerCellWidth="sm" />
      <Details summary={t('help.title')} ariaLabel="Upcoming re-entry events - Help with this table">
        {t.rich('help.content')}
      </Details>
    </div>
  );
};

export { ReentriesSummaryTable };
