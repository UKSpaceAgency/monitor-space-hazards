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
    header: t('upcoming_reentry_alerts'),
    renderCell: row => <div className="govuk-!-text-align-right">{row.reentry_event_alert_count}</div>,
    accessorKey: 'reentry_event_alert_count',
  }, {
    header: t('upcoming_reentry_events_worldwide'),
    renderCell: row => <div className="govuk-!-text-align-right">{row.reentry_event_total_count}</div>,
    accessorKey: 'reentry_event_total_count',
  }];

  return (
    <div>
      <InformationsTable rows={baseInformations} data={eventsStats} headerCellWidth="sm" />
      <Details summary={t.rich('help.title')}>
        {t.rich('help.content')}
      </Details>
    </div>
  );
};

export { ReentriesSummaryTable };
