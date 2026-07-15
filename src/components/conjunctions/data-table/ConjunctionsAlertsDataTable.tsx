'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { TypeEventOut } from '@/__generated__/data-contracts';
import type { ProbabilityUnitType } from '@/components/conjunctions/data-table/ConjunctionsDataTableColumns';
import { getConjunctionEventsColumns } from '@/components/conjunctions/data-table/ConjunctionsDataTableColumns';
import { DataTable } from '@/components/DataTable';
import Radios from '@/ui/radios/radios';

type ConjunctionsAlertsDataTableProps = {
  data: TypeEventOut[];
  isAnalyst: boolean;
  haveAccessToAlerts: boolean;
};

const ConjunctionsAlertsDataTable = ({ data, isAnalyst, haveAccessToAlerts }: ConjunctionsAlertsDataTableProps) => {
  const t = useTranslations('Tables');

  const [probabilityUnit, setProbabilityUnit] = useState<ProbabilityUnitType>('scientific');

  const handleProbabilityUnitChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setProbabilityUnit(e.target.value as ProbabilityUnitType);

  const columns = getConjunctionEventsColumns({
    isAnalyst,
    probabilityUnit,
    haveAccessToAlerts,
  });

  return (
    <>
      <div
        className="govuk-!-margin-bottom-4 lg:flex lg:items-center lg:justify-end"
      >
        <legend className="govuk-fieldset__legend govuk-!-font-weight-bold govuk-!-margin-0 govuk-!-margin-right-2">
          {t('Conjunctions.display_probability')}
        </legend>
        <Radios
          className="govuk-!-margin-0"
          aria-label="Probability of collision"
          inline
          small
          items={[
            {
              id: 'scientific',
              children: 'Scientific',
              value: 'scientific',
              checked: probabilityUnit === 'scientific',
              onChange: handleProbabilityUnitChange,
            },
            {
              id: 'percentage',
              children: 'Percentage',
              value: 'percentage',
              checked: probabilityUnit === 'percentage',
              onChange: handleProbabilityUnitChange,
            },
          ]}
          id="probabilityUnit"
        />
      </div>
      <DataTable<TypeEventOut>
        data={data}
        columns={columns}
        emptyLabel={t('Conjunctions.table.empty_list_info')}
        enableSorting={false}
      />
    </>
  );
};

export { ConjunctionsAlertsDataTable };
