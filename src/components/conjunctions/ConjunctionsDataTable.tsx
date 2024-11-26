'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { TypeEventOut, TypeGetConjunctionEventsParams } from '@/__generated__/data-contracts';
import { getConjunctionEventsList } from '@/actions/getConjunctionEventsList';
import type { ConjunctionsPageSearchParams } from '@/app/(auth)/conjunctions/page';
import Radios from '@/ui/radios/radios';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import type { ProbabilityUnitType } from '../data-tables/columns/ConjunctionColumns';
import { getConjunctionEventsColumns } from '../data-tables/columns/ConjunctionColumns';
import InfiniteTable from '../InfiniteTable';

type ConjunctionsDataTableProps = {
  params: ConjunctionsPageSearchParams;
  conjunctions: TypeEventOut[];
  isAnalyst: boolean;
};

const ConjunctionsDataTable = ({ params, conjunctions, isAnalyst }: ConjunctionsDataTableProps) => {
  const t = useTranslations('Tables');

  const [probabilityUnit, setProbabilityUnit] = useState<ProbabilityUnitType>('scientific');

  const handleProbabilityUnitChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setProbabilityUnit(e.target.value as ProbabilityUnitType);

  const columns = getConjunctionEventsColumns({
    isAnalyst,
    probabilityUnit,
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
          inline
          small
          items={[
            {
              children: 'Scientific',
              value: 'scientific',
              checked: probabilityUnit === 'scientific',
              onChange: handleProbabilityUnitChange,
            },
            {
              children: 'Percentage',
              value: 'percentage',
              checked: probabilityUnit === 'percentage',
              onChange: handleProbabilityUnitChange,
            },
          ]}
          id="probabilityUnit"
        />
      </div>

      <InfiniteTable<TypeEventOut, TypeGetConjunctionEventsParams>
        initialData={conjunctions}
        params={params}
        columns={columns}
        fetcher={getConjunctionEventsList}
        queryKeys={[QUERY_KEYS.Conjunctions]}
        emptyLabel={t('Conjunctions.empty_list_info')}
      />
    </>
  );
};

export { ConjunctionsDataTable };
