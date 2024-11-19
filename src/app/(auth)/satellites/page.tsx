import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import type { TypeGetSatellitesWithMetadataParams } from '@/__generated__/data-contracts';
import { getSatellites } from '@/actions/getSatellites';
import { SatellitesDataTable } from '@/components/data-tables/SatellitesDataTable';
import { LastIntegration } from '@/components/LastIntegration';
import { SearchBar } from '@/components/SearchBar';
import Spinner from '@/ui/spinner/spinner';

export const metadata: Metadata = {
  title: 'UK-licensed satellites',
};

export default async function SatellitesPage(props: {
  searchParams?: Promise<{
    search_like?: string;
  }>;
}) {
  const t = await getTranslations('SatellitesPage');

  const searchParams = await props.searchParams;

  const params: TypeGetSatellitesWithMetadataParams = {
    search_like: searchParams?.search_like,
    limit: 50,
  };

  const initialData = await getSatellites(params);

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <SearchBar label={t('search_bar.label')} placeholder={t('search_bar.placeholder')} />
      <Suspense fallback={<Spinner />}>
        <SatellitesDataTable initialData={initialData} params={params} />
        <LastIntegration />
      </Suspense>
    </div>
  );
}
