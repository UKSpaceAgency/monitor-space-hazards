import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import type { TypeGetSatellitesWithMetadataParams } from '@/__generated__/data-contracts';
import { getSatellites } from '@/actions/getSatellites';
import { getSession } from '@/actions/getSession';
import { LastIntegration } from '@/components/LastIntegration';
import { SatellitesDataTable } from '@/components/satellites/data-table/SatellitesDataTable';
import { SearchBar } from '@/components/SearchBar';
import Spinner from '@/ui/spinner/spinner';
import { isInternationalUser } from '@/utils/Roles';

export const metadata: Metadata = {
  title: 'UK-licensed satellites',
};

type PageProps = {
  searchParams?: Promise<{
    search_like?: string;
  }>;
};

export default async function SatellitesPage(props: PageProps) {
  const t = await getTranslations('Satellites');
  const session = await getSession();

  if (isInternationalUser(session?.user?.role)) {
    return redirect('/forbidden');
  }

  const searchParams = await props.searchParams;

  const params: TypeGetSatellitesWithMetadataParams = {
    search_like: searchParams?.search_like,
    limit: 50,
  };

  const initialData = await getSatellites(params);

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <SearchBar label={t('search_bar.label')} id="satellites_search_bar" placeholder={t('search_bar.placeholder')} ariaLabel="Satellite Search Bar" />
      <Suspense fallback={<Spinner />}>
        <SatellitesDataTable initialData={initialData} params={params} />
        <LastIntegration />
      </Suspense>
    </div>
  );
}
