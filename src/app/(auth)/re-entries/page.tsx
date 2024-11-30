import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import type { TypeGetReentryEventsParams } from '@/__generated__/data-contracts';
import { ReentriesEventsTable } from '@/components/re-entries/ReentriesEventsTable';
import { ReentriesSummaryTable } from '@/components/re-entries/ReentriesSummaryTable';
import Spinner from '@/ui/spinner/spinner';

export const metadata: Metadata = {
  title: 'Track re-entry events',
};

type ReentryPageSearchParams = TypeGetReentryEventsParams;

export default async function ReentryPage(props: {
  searchParams?: Promise<ReentryPageSearchParams>;
}) {
  const t = await getTranslations('Re-entries');

  const searchParams = await props.searchParams;

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <Suspense key={searchParams?.search_like} fallback={<Spinner />}>
        <ReentriesSummaryTable />
        <h2 className="govuk-heading-m">{t('section_title')}</h2>
        <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
        <ReentriesEventsTable initialParams={searchParams} />
      </Suspense>
    </div>
  );
}
