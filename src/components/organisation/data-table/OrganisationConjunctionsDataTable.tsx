'use client';

import type { ColumnSort } from '@tanstack/react-table';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { TypeEpoch, TypeEventOut, TypeGetConjunctionEventsListParams } from '@/__generated__/data-contracts';
import { getConjunctionEventsList } from '@/actions/getConjunctionEventsList';
import { DownloadData } from '@/components/DownloadData';
import InfiniteTable from '@/components/InfiniteTable';
import Details from '@/ui/details/details';
import Radios from '@/ui/radios/radios';
import Select from '@/ui/select/select';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { getSatteliteConjunctionColumns } from './OrganisationConjunctionsDataTableColumns';

type OrganisationConjunctionsDataTableProps = {
  initialData: TypeEventOut[];
  params: TypeGetConjunctionEventsListParams;
  epoch?: TypeEpoch;
  organisationName: string;
};

const OrganisationConjunctionsDataTable = ({
  initialData,
  params,
  epoch,
  organisationName,
}: OrganisationConjunctionsDataTableProps) => {
  const t = useTranslations('Tables.Organisation_conjunctions');
  const [probabilityUnit, setProbabilityUnit] = useState<'scientific' | 'percentage'>('scientific');
  const { replace } = useRouter();
  const pathname = usePathname();

  const initialSort: ColumnSort[] = useMemo(() => [{
    id: params.sort_by ?? 'tca_time',
    desc: params.sort_order === 'desc',
  }], [params]);

  const handleEpochChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('epoch', e.target.value);
    replace(`${pathname}?${searchParams.toString()}`, { scroll: false });
  };

  const columns = getSatteliteConjunctionColumns({
    isAnalyst: false,
    probabilityUnit,
    haveAccessToAlerts: true,
  });

  return (
    <div>
      <p className="govuk-body">
        {t('description', { organisationName })}
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-between md:items-end border-b border-midGrey pb-4 mb-4">
        <Select
          name="epoch"
          id="epoch-filter"
          label={t('filter_time_period')}
          value={epoch ?? 'future'}
          options={[
            { children: t('epoch_upcoming'), value: 'future' },
            { children: t('epoch_past'), value: 'past' },
            { children: t('epoch_all'), value: 'all' },
          ]}
          onChange={handleEpochChange}
        />
        <div className="flex items-center gap-2">
          <legend className="govuk-fieldset__legend govuk-!-font-weight-bold govuk-!-margin-0 govuk-!-margin-right-2">
            {t('display_poc')}
          </legend>
          <Radios
            className="govuk-!-margin-0"
            aria-label={t('display_poc')}
            inline
            small
            items={[
              {
                id: 'org-poc-scientific',
                children: t('scientific'),
                value: 'scientific',
                checked: probabilityUnit === 'scientific',
                onChange: () => setProbabilityUnit('scientific'),
              },
              {
                id: 'org-poc-percentage',
                children: t('percentage'),
                value: 'percentage',
                checked: probabilityUnit === 'percentage',
                onChange: () => setProbabilityUnit('percentage'),
              },
            ]}
            id="org-probabilityUnit"
          />
        </div>
      </div>
      <div className="overflow-auto max-h-[500px]">
        <InfiniteTable<TypeEventOut, TypeGetConjunctionEventsListParams>
          initialData={initialData}
          params={params}
          columns={columns}
          fetcher={getConjunctionEventsList}
          queryKeys={[QUERY_KEYS.Conjunctions, params.organization_id]}
          initialSort={initialSort}
          emptyLabel={t('empty')}
        />
      </div>
      <DownloadData
        type={t('download_type')}
        params={params}
        downloadAction={getConjunctionEventsList}
        ariaLabel={t('download_aria')}
      />
      <Details summary={t('help_title')}>
        <p>{t('help_description', { organisationName })}</p>
        <p>{t('help_select_event')}</p>
        <p>{t('help_row_meaning')}</p>
      </Details>
    </div>
  );
};

export { OrganisationConjunctionsDataTable };
