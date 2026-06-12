'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import type { TypeEpoch, TypeEventOut } from '@/__generated__/data-contracts';
import { DownloadData } from '@/components/DownloadData';
import Details from '@/ui/details/details';
import Radios from '@/ui/radios/radios';
import Select from '@/ui/select/select';

import { DataTable } from '../DataTable';
import { getSatteliteConjunctionColumns } from '../satellite/data-table/SatelliteConjunctionsDataTableColumns';

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
        This table shows all upcoming and past conjunction events involving
        {' '}
        {organisationName}
        &apos;s UK-licensed satellites.
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-between md:items-end border-b border-midGrey pb-4 mb-4">
        <Select
          name="epoch"
          id="epoch-filter"
          label="Filter by time period:"
          value={epoch ?? 'future'}
          options={[
            { children: 'Upcoming', value: 'future' },
            { children: 'Past', value: 'past' },
            { children: 'All', value: 'all' },
          ]}
          onChange={handleEpochChange}
        />
        <div className="flex items-center gap-2">
          <legend className="govuk-fieldset__legend govuk-!-font-weight-bold govuk-!-margin-0 govuk-!-margin-right-2">
            Display probability of collision as:
          </legend>
          <Radios
            className="govuk-!-margin-0"
            aria-label="Probability of collision display"
            inline
            small
            items={[
              {
                id: 'org-poc-scientific',
                children: 'Scientific',
                value: 'scientific',
                checked: probabilityUnit === 'scientific',
                onChange: () => setProbabilityUnit('scientific'),
              },
              {
                id: 'org-poc-percentage',
                children: 'Percentage',
                value: 'percentage',
                checked: probabilityUnit === 'percentage',
                onChange: () => setProbabilityUnit('percentage'),
              },
            ]}
            id="org-probabilityUnit"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <DataTable<TypeEventOut>
          data={initialData}
          columns={columns}
          emptyLabel="No conjunction events found."
          stickyHeader
        />
      </div>
      <Details summary="Help with this table">
        <p>
          This table shows all upcoming and past conjunction events involving
          {organisationName}
          &apos;s UK-licensed satellites.
        </p>
        <p>Select the event ID to view more information.</p>
        <p>Each event ID or row represents one conjunction event including all related Conjunction Data Messages (CDMs) and NSpOC analysis.</p>
      </Details>
      <DownloadData
        type="conjunction events"
        params={{}}
        downloadAction={downloadAction}
        ariaLabel="Organisation conjunctions"
      />
    </div>
  );
};

export { OrganisationConjunctionsDataTable };
