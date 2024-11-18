'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import type { ConjunctionsPageSearchParams } from '@/app/(auth)/conjunctions/page';
import Details from '@/ui/details/details';
import Radios from '@/ui/radios/radios';
import Select from '@/ui/select/select';

type ConjunctionsDataFiltersProps = {
  searchParams: ConjunctionsPageSearchParams | undefined;
};

const ConjunctionsDataFilters = ({ searchParams }: ConjunctionsDataFiltersProps) => {
  const t = useTranslations('Tables');

  const { replace } = useRouter();
  const pathname = usePathname();

  const handleRefreshParams = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.currentTarget;

      const params = new URLSearchParams(searchParams);

      params.set(name, value);

      replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
      e.preventDefault();
    },
    [pathname, replace, searchParams],
  );

  return (
    <Details id="applySummary" summary={t('Conjunctions.details.summary')}>
      <Radios
        inline
        items={[
          {
            id: 'viewAll',
            children: t('Conjunctions.details.option1'),
            value: 'no',
            name: 'has_report',
            checked: searchParams?.has_report !== 'yes',
            onChange: handleRefreshParams,
          },
          {
            id: 'viewOnly',
            children: t('Conjunctions.details.option2'),
            value: 'yes',
            name: 'has_report',
            checked: searchParams?.has_report === 'yes',
            onChange: handleRefreshParams,
          },
        ]}
        id="hasReport"
      />
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
      <Select
        name="epoch"
        id="epoch"
        label={t('Conjunctions.details.select_label')}
        value={searchParams?.epoch ?? 'future'}
        options={[
          {
            children: t('Conjunctions.details.all'),
            value: 'all',
          },
          {
            children: t('Conjunctions.details.upcoming'),
            value: 'future',
          },
          {
            children: t('Conjunctions.details.past'),
            value: 'past',
          },
        ]}
        onChange={handleRefreshParams}
      />
    </Details>
  );
};

export { ConjunctionsDataFilters };
