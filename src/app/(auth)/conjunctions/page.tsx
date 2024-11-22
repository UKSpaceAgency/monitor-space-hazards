import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import type { TypeEpoch } from '@/__generated__/data-contracts';
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
  has_report?: string;
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
        <p>{t('help1.heading')}</p>
        <ul className="govuk-list--bullet">
          <li>
            <b>{t('help1.conjunctions_alerts')}</b>
            {t('help1.conjunctions_alerts_description')}
          </li>
          <li>
            <b>{t('help1.all_conjunction_events')}</b>
            {t('help1.all_conjunction_description')}
          </li>
        </ul>
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
        <p>{t('help2.heading')}</p>
        <p>
          {t('help2.select_the')}
          <b>{t('help2.event_id')}</b>
          {t('help2.view_more_info')}
        </p>
        <p>
          {t('help2.each_event_id')}
          <b>{t('help2.one_conjunction_event')}</b>
          {t('help2.including_all')}
        </p>
        <p>
          {t('help2.the')}
          <b>{t('help2.your_interest')}</b>
          {t('help2.column_contains')}
        </p>
      </Details>
    </div>
  );
}
