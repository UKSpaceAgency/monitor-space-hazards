import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { getSession } from '@/actions/getSession';
import { OrganisationsTable } from '@/components/organisations/OrganisationsTable';
import { SearchBar } from '@/components/SearchBar';
import Spinner from '@/ui/spinner/spinner';
import { isInternationalUser } from '@/utils/Roles';

export const metadata: Metadata = {
  title: 'Organisations',
};

type PageProps = {
  searchParams?: Promise<{
    search_like?: string;
  }>;
};

export default async function OrganisationsPage(props: PageProps) {
  const t = await getTranslations('Organisations');
  const session = await getSession();

  if (isInternationalUser(session?.user?.role)) {
    return redirect('/forbidden');
  }

  const params = await props.searchParams;

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <SearchBar label={t('search_bar.label')} id="organisations_search_bar" placeholder={t('search_bar.placeholder')} ariaLabel="Organisation Search Bar" />
      <Suspense key={`operators-table-${params?.search_like}`} fallback={<Spinner />}>
        <OrganisationsTable searchLike={params?.search_like} />
      </Suspense>
    </div>
  );
}
