import { getTranslations } from 'next-intl/server';

import type { TypeEpoch, TypeReentryRisk, TypeReportFlagSettings } from '@/__generated__/data-contracts';
import { FragmentationsEventsTable } from '@/components/fragmentations/FragmentationsEventsTable';
import { SearchBar } from '@/components/SearchBar';
import Details from '@/ui/details/details';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';
import { renderRiskTag } from '@/utils/Risk';

const getSearchBarLabel = async (epoch: TypeEpoch | undefined): Promise<string> => {
  const t = await getTranslations('Fragmentations');

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

export type FragmentationsPageSearchParams = {
  report?: TypeReportFlagSettings;
  epoch?: TypeEpoch;
  search_like?: string;
};

type PageProps = {
  searchParams?: Promise<FragmentationsPageSearchParams>;
};

export default async function FragmentationsPage(props: PageProps) {
  const t = await getTranslations('Fragmentations');

  const searchParams = await props.searchParams;
  const params: FragmentationsPageSearchParams = searchParams || {};

  const searchBarLabel = await getSearchBarLabel(params.epoch);

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <h2 className="govuk-heading-m">{t('section_title')}</h2>
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
      <p className="govuk-body">{t('description')}</p>
      <SearchBar label={`${searchBarLabel}:`} id="conjunctions_search_bar" placeholder={t('search_bar.placeholder')} ariaLabel={searchBarLabel} />
      <FragmentationsEventsTable params={params} />
      <Details summary={t.rich('help.title')}>
        {t.rich('help.content', {
          table: chunks => <Table className="text-sm md:text-base">{chunks}</Table>,
          thead: chunks => <TableHead>{chunks}</TableHead>,
          tbody: chunks => <TableBody>{chunks}</TableBody>,
          tr: chunks => <TableRow>{chunks}</TableRow>,
          th: chunks => <TableCellHeader className="w-1/2">{chunks}</TableCellHeader>,
          td: chunks => <TableCell>{chunks}</TableCell>,
          tag: chunks => renderRiskTag(chunks as TypeReentryRisk),
        })}
      </Details>
    </div>
  );
}
