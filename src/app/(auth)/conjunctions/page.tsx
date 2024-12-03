import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import type { TypeEpoch, TypeReportFlagSettings } from '@/__generated__/data-contracts';
import { ConjunctionsDataFilters } from '@/components/conjunctions/ConjunctionsDataFilters';
import { ConjunctionsDataTableWrapper } from '@/components/conjunctions/ConjunctionsDataTableWrapper';
import { ConjunctionsSummaryTable } from '@/components/conjunctions/ConjunctionsSummaryTable';
import { SearchBar } from '@/components/SearchBar';
import Details from '@/ui/details/details';
import Spinner from '@/ui/spinner/spinner';

export const metadata: Metadata = {
  title: 'Track conjunction events (Monitor your satellites)',
};

export type ConjunctionsPageSearchParams = {
  report?: TypeReportFlagSettings;
  epoch?: TypeEpoch;
  search_like?: string;
};

export default async function ConjunctionsPage(props: {
  searchParams?: Promise<ConjunctionsPageSearchParams>;
}) {
  const t = await getTranslations('Conjunctions');

  const searchParams = await props.searchParams;
  const params: ConjunctionsPageSearchParams = searchParams || {};

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <Suspense key={params.search_like} fallback={<Spinner />}>
        <ConjunctionsSummaryTable />
      </Suspense>
      <Details summary={t('help1.title')}>
        {t.rich('help1.content')}
      </Details>
      <h2 className="govuk-heading-m">{t('section_title')}</h2>
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
      <p className="govuk-body">{t('description')}</p>
      <SearchBar label={t('search_bar.label')} placeholder={t('search_bar.placeholder')} />
      <ConjunctionsDataFilters params={params} />

      <Suspense key={Object.values(params).toString()} fallback={<Spinner />}>
        <ConjunctionsDataTableWrapper params={params} />
      </Suspense>

      <Details summary={t('help2.title')}>
        {t.rich('help2.content', {
          bold: chunks => <b>{chunks}</b>,
        })}
      </Details>
    </div>
  );
}
