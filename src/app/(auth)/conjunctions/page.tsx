import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import type { TypeEpoch, TypeReportFlagSettings } from '@/__generated__/data-contracts';
import { getSession } from '@/actions/getSession';
import { ConjunctionsEventsTable } from '@/components/conjunctions/ConjunctionsEventsTable';
import { ConjunctionsEventsTableFilters } from '@/components/conjunctions/ConjunctionsEventsTableFilters';
import { ConjunctionsSummaryTable } from '@/components/conjunctions/ConjunctionsSummaryTable';
import { SearchBar } from '@/components/SearchBar';
import Details from '@/ui/details/details';
import Spinner from '@/ui/spinner/spinner';
import { isSatteliteUser } from '@/utils/Roles';

const getSearchBarLabel = async (epoch: TypeEpoch | undefined): Promise<string> => {
  const t = await getTranslations('Conjunctions');

  switch (epoch) {
    case 'all':
      return t('search_bar.allLabel');
    case 'future':
      return t('search_bar.upcomingLabel');
    case 'past':
      return t('search_bar.previousLabel');
    default:
      return t('search_bar.allLabel');
  }
};

export const metadata: Metadata = {
  title: 'Track conjunction events (Monitor your satellites)',
};

export type ConjunctionsPageSearchParams = {
  report?: TypeReportFlagSettings;
  epoch?: TypeEpoch;
  search_like?: string;
};

type PageProps = {
  searchParams?: Promise<ConjunctionsPageSearchParams>;
};

export default async function ConjunctionsPage(props: PageProps) {
  const t = await getTranslations('Conjunctions');
  const session = await getSession();

  const searchParams = await props.searchParams;
  const params: ConjunctionsPageSearchParams = searchParams || {};

  const searchBarLabel = await getSearchBarLabel(params.epoch);

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <Suspense key={params.search_like} fallback={<Spinner />}>
        <ConjunctionsSummaryTable />
        <Details summary={t('help1.title')}>
          {t.rich('help1.content')}
        </Details>
        <h2 className="govuk-heading-m">{t('section_title')}</h2>
        <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
        <p className="govuk-body">{t('description')}</p>
        <SearchBar label={`${searchBarLabel}:`} placeholder={t('search_bar.placeholder')} ariaLabel={searchBarLabel} />
        <ConjunctionsEventsTableFilters params={params} showFilterRadios={!isSatteliteUser(session?.user.role)} />
        <ConjunctionsEventsTable params={params} />
      </Suspense>
      <Details summary={t('help2.title')}>
        {t.rich('help2.content')}
      </Details>
    </div>
  );
}
