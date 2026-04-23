'use client';
import type { ColumnSort } from '@tanstack/react-table';
import camelCase from 'lodash/camelCase';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { TypeEventOut, TypeGetConjunctionEventsListParams } from '@/__generated__/data-contracts';
import { getConjunctionEventsList } from '@/actions/getConjunctionEventsList';
import type { ProbabilityUnitType } from '@/components/conjunctions/data-table/ConjunctionsDataTableColumns';
import { DownloadData } from '@/components/DownloadData';
import InfiniteTable from '@/components/InfiniteTable';
import Radios from '@/ui/radios/radios';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { getSatteliteConjunctionColumns } from './SatelliteConjunctionsDataTableColumns';

type SatelliteConjunctionsDataTableProps = {
  params: TypeGetConjunctionEventsListParams;
  initialData: TypeEventOut[];
  isAnalyst: boolean;
  haveAccessToAlerts: boolean;
};

const SatelliteConjunctionsDataTable = ({ params, initialData, isAnalyst, haveAccessToAlerts }: SatelliteConjunctionsDataTableProps) => {
  const t = useTranslations('Tables');
  const [probabilityUnit, setProbabilityUnit] = useState<ProbabilityUnitType>('scientific');

  const handleProbabilityUnitChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setProbabilityUnit(e.target.value as ProbabilityUnitType);

  const initialSort: ColumnSort[] = useMemo(() => [{
    id: camelCase(params.sort_by),
    desc: params.sort_order === 'desc',
  }], [params]);

  const columns = getSatteliteConjunctionColumns({
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
      <InfiniteTable<TypeEventOut, TypeGetConjunctionEventsListParams>
        initialData={initialData}
        params={params}
        columns={columns}
        fetcher={getConjunctionEventsList}
        queryKeys={[QUERY_KEYS.Conjunctions]}
        initialSort={initialSort}
      />
      <DownloadData type={t('Download.types.satellite_events', { epoch: params.epoch === 'future' ? 'upcoming' : 'previous' })} params={params} downloadAction={getConjunctionEventsList} ariaLabel="Satellite conjunctions" />
    </>
  );
};

export { SatelliteConjunctionsDataTable };
