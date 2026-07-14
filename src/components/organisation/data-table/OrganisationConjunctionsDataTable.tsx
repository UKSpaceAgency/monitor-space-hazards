'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { TypeEpoch, TypeEventOut } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';
import Details from '@/ui/details/details';
import Radios from '@/ui/radios/radios';
import Select from '@/ui/select/select';

import { getSatteliteConjunctionColumns } from './OrganisationConjunctionsDataTableColumns';

type OrganisationConjunctionsDataTableProps = {
  initialData: TypeEventOut[];
  epoch?: TypeEpoch;
  organisationName: string;
};

const OrganisationConjunctionsDataTable = ({
  initialData,
  epoch,
  organisationName,
}: OrganisationConjunctionsDataTableProps) => {
  const t = useTranslations('Tables.Organisation_conjunctions');
  const [probabilityUnit, setProbabilityUnit] = useState<'scientific' | 'percentage'>('scientific');
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleEpochChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(window.location.search);
    params.set('epoch', e.target.value);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const columns = getSatteliteConjunctionColumns({
    isAnalyst: false,
    probabilityUnit,
    haveAccessToAlerts: true,
  });

  const downloadAction = async () => initialData;

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
        <DataTable<TypeEventOut>
          data={initialData}
          columns={columns}
          emptyLabel={t('empty')}
          stickyHeader
        />
      </div>
      <DownloadData
        type={t('download_type')}
        params={{}}
        downloadAction={downloadAction}
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
