'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { TypeEventOut, TypeGetConjunctionEventsParams } from '@/__generated__/data-contracts';
import { getConjunctionEventsList } from '@/actions/getConjunctionEventsList';
import type { ConjunctionsPageSearchParams } from '@/app/(auth)/conjunctions/page';
import Radios from '@/ui/radios/radios';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import InfiniteTable from '../InfiniteTable';
import type { ProbabilityUnitType } from './columns';
import { getConjunctionEventsColumns } from './columns';

type ConjunctionsDataTableProps = {
  searchParams: ConjunctionsPageSearchParams | undefined;
  conjunctions: TypeEventOut[];
  isAnalyst: boolean;
};

const ConjunctionsDataTable = ({ searchParams, conjunctions, isAnalyst }: ConjunctionsDataTableProps) => {
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
        params={searchParams || {}}
        columns={columns}
        fetcher={getConjunctionEventsList}
        queryKeys={[QUERY_KEYS.Conjunctions]}
      />
    </>
  );
};

export { ConjunctionsDataTable };
