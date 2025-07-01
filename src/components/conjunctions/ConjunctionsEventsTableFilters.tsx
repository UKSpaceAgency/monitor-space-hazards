'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import type { ConjunctionsPageSearchParams } from '@/app/(auth)/conjunctions/page';
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
    <div>
      <h4 className="govuk-heading-s mb-0">{t.rich('Conjunctions.details.summary')}</h4>
      <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center border-b border-midGrey mb-4">
        {showFilterRadios && (
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
            className="m-0"
          />
        )}
        <Select
          name="epoch"
          id="epoch"
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
      </div>
    </div>
  );
};

export { ConjunctionsEventsTableFilters };
