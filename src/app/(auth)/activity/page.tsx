import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import type { TypeGetActivityEventsParams } from '@/__generated__/data-contracts';
import { getActivityEvents } from '@/actions/getActivityEvents';
import { ActivitiesDataTable } from '@/components/activities/data-table/ActivitiesDataTable';
import { SearchBar } from '@/components/SearchBar';
import Details from '@/ui/details/details';
import Spinner from '@/ui/spinner/spinner';

export const metadata: Metadata = {
  title: 'Monitor UK satellite activity',
};

type PageProps = {
  searchParams?: Promise<{
    search_like?: string;
  }>;
};

export default async function ActivitiesPage(props: PageProps) {
  const t = await getTranslations('Activity');

  const searchParams = await props.searchParams;

  const params: TypeGetActivityEventsParams = {
    search_query: searchParams?.search_like,
    limit: 50,
  };

  const initialData = await getActivityEvents(params);

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      {t.rich('description')}
      <SearchBar label={t('search_bar.label')} id="satellites_search_bar" placeholder={t('search_bar.placeholder')} ariaLabel="Satellite Search Bar" />
      <Suspense fallback={<Spinner />}>
        <ActivitiesDataTable initialData={initialData} params={params} />
      </Suspense>
      <Details summary={t.rich('help.title')}>
        {t.rich('help.content')}
      </Details>
    </div>
  );
}
