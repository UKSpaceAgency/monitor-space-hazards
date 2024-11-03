import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import type { TypeSatellitesSortBy, TypeSortOrder } from '@/__generated__/data-contracts';
import { SatellitesDataTable } from '@/components/data-tables/satellites/SatellitesDataTable';
import { SearchBar } from '@/components/SearchBar';
import Spinner from '@/ui/spinner/spinner';

export const metadata: Metadata = {
  title: 'UK-licensed satellites',
};

export default async function SatellitesPage(props: {
  searchParams?: Promise<{
    search_like?: string;
    sort_by?: TypeSatellitesSortBy;
    sort_order?: TypeSortOrder;
  }>;
}) {
  const t = await getTranslations('SatellitesPage');

  const searchParams = await props.searchParams;
  const query = searchParams?.search_like;

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <SearchBar label={t('search_bar.label')} placeholder={t('search_bar.placeholder')} />
      <Suspense key={query} fallback={<Spinner />}>
        <SatellitesDataTable query={query} />
      </Suspense>
    </div>
  );
}
