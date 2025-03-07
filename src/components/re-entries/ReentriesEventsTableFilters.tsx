'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import Details from '@/ui/details/details';
import Radios from '@/ui/radios/radios';
import Select from '@/ui/select/select';

const ReentriesEventsTableFilters = ({ showFilterRadios }: { showFilterRadios: boolean }) => {
  const t = useTranslations('Tables.Reentries.filters');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleRefreshParams = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.currentTarget;

      const queryParams = new URLSearchParams(searchParams);

      queryParams.set(name, value);

      replace(`${pathname}?${queryParams.toString()}`, {
        scroll: false,
      });
      e.preventDefault();
    },
    [pathname, replace, searchParams],
  );

  return (
    <Details id="applySummary" summary={t('summary')}>
      {showFilterRadios && (
        <>
          <Radios
            inline
            items={[
              {
                id: 'viewAll',
                children: t('option1'),
                value: 'all',
                name: 'report',
                checked: !searchParams.get('report') || searchParams.get('report') === 'all',
                onChange: handleRefreshParams,
              },
              {
                id: 'viewOnly',
                children: t('option2'),
                value: 'present',
                name: 'report',
                checked: searchParams.get('report') === 'present',
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
        label={t('select_label')}
        defaultValue={searchParams.get('epoch') ?? 'all'}
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
    </Details>
  );
};

export { ReentriesEventsTableFilters };
