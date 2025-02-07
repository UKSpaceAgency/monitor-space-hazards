'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import type { ConjunctionsPageSearchParams } from '@/app/(auth)/conjunctions/page';
import Details from '@/ui/details/details';
import Radios from '@/ui/radios/radios';
import Select from '@/ui/select/select';

type ConjunctionsEventsTableFiltersProps = {
  params: ConjunctionsPageSearchParams;
  showFilterRadios: boolean;
};

const ConjunctionsEventsTableFilters = ({ params, showFilterRadios }: ConjunctionsEventsTableFiltersProps) => {
  const t = useTranslations('Tables');

  const { replace } = useRouter();
  const pathname = usePathname();

  const handleRefreshParams = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.currentTarget;

      const queryParams = new URLSearchParams(params);

      queryParams.set(name, value);

      replace(`${pathname}?${queryParams.toString()}`, {
        scroll: false,
      });
      e.preventDefault();
    },
    [pathname, replace, params],
  );

  return (
    <Details id="applySummary" summary={t('Conjunctions.details.summary')}>
      {showFilterRadios && (
        <>
          <Radios
            inline
            items={[
              {
                id: 'viewAll',
                children: t('Conjunctions.details.option1'),
                value: 'all',
                name: 'report',
                checked: params.report !== 'present',
                onChange: handleRefreshParams,
              },
              {
                id: 'viewOnly',
                children: t('Conjunctions.details.option2'),
                value: 'present',
                name: 'report',
                checked: params.report === 'present',
                onChange: handleRefreshParams,
              },
            ]}
            id="hasReport"
          />
          <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
        </>
      )}
      <Select
        name="epoch"
        id="epoch"
        className="w-1/4"
        label={t('Conjunctions.details.select_label')}
        value={params.epoch ?? 'future'}
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

export { ConjunctionsEventsTableFilters };
