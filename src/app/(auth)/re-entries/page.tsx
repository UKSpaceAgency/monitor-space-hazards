import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import type { TypeGetReentryEventsParams } from '@/__generated__/data-contracts';
import { ReentriesAlertsTable } from '@/components/re-entries/ReentriesAlertsTable';
import { ReentriesEventsTable } from '@/components/re-entries/ReentriesEventsTable';
import { ReentriesSummaryTable } from '@/components/re-entries/ReentriesSummaryTable';
import Details from '@/ui/details/details';

export const metadata: Metadata = {
  title: 'Track re-entry events',
};

type ReentryPageSearchParams = TypeGetReentryEventsParams;

type PageProps = {
  searchParams?: Promise<ReentryPageSearchParams>;
};

export default async function ReentryPage(props: PageProps) {
  const t = await getTranslations('Reentries');
  const tTables = await getTranslations('Tables.Reentries_summary');

  const searchParams = await props.searchParams;

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <ReentriesSummaryTable />
      <h2 className="govuk-heading-m">{t('upcoming_reentry_alerts')}</h2>
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
      <ReentriesAlertsTable />
      <h2 className="govuk-heading-m">{t('all_reentry_events')}</h2>
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
      <p className="govuk-body">{t('description')}</p>
      <ReentriesEventsTable initialParams={searchParams} />
      <Details summary={tTables.rich('help.title')}>
        {tTables.rich('help.content')}
      </Details>
    </div>
  );
}
