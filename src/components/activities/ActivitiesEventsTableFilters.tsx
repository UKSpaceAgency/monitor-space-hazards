'use client';

import { useTranslations } from 'next-intl';

import type { ConjunctionsPageSearchParams } from '@/app/(auth)/conjunctions/page';

type ActivitiesEventsTableFiltersProps = {
  params: ConjunctionsPageSearchParams;
  showFilterRadios: boolean;
};

const ActivitiesEventsTableFilters = (_: ActivitiesEventsTableFiltersProps) => {
  const t = useTranslations('Tables.Activities.details');

  // const { replace } = useRouter();
  // const pathname = usePathname();

  // const handleRefreshParams = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //     const { name, value } = e.currentTarget;

  //     const queryParams = new URLSearchParams(params);

  //     queryParams.set(name, value);

  //     replace(`${pathname}?${queryParams.toString()}`, {
  //       scroll: false,
  //     });
  //     e.preventDefault();
  //   },
  //   [pathname, replace, params],
  // );

  return (
    <div>
      <h4 className="govuk-heading-s mb-0">{t.rich('summary')}</h4>
      <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center border-b border-midGrey mb-4">
        Filters to do
        {/* {showFilterRadios && (
          <Radios
            inline
            aria-label="View events"
            items={[
              {
                id: 'view_all',
                children: t('option1'),
                value: 'all',
                name: 'report',
                checked: params.report !== 'present',
                onChange: handleRefreshParams,
              },
              {
                id: 'view_only',
                children: t('option2'),
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
          label={t('select_label')}
          value={params.epoch ?? 'future'}
          options={[
            {
              children: t('all'),
              value: 'all',
            },
            {
              children: t('upcoming'),
              value: 'future',
            },
            {
              children: t('past'),
              value: 'past',
            },
          ]}
          onChange={handleRefreshParams}
        /> */}
      </div>
    </div>
  );
};

export { ActivitiesEventsTableFilters };
