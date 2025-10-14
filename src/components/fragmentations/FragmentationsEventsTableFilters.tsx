'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import type { FragmentationsPageSearchParams } from '@/app/(auth)/fragmentations/page';
import Select from '@/ui/select/select';

type FragmentationsEventsTableFiltersProps = {
  params: FragmentationsPageSearchParams;
};

const FragmentationsEventsTableFilters = ({ params }: FragmentationsEventsTableFiltersProps) => {
  const t = useTranslations('Tables.Conjunctions.details');

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
      <h4 className="govuk-heading-s mb-2">{t.rich('summary')}</h4>
      <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center border-b border-midGrey mb-4">
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
        />
      </div>
    </div>
  );
};

export { FragmentationsEventsTableFilters };
