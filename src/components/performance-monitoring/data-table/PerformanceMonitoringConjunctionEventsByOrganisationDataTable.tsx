'use client';
import { uniq } from 'lodash';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { TypeGetStatsEventsByOrganizationParams } from '@/__generated__/data-contracts';
import type { EventsByOrganizationType } from '@/actions/getStatsEventsByOrganization';
import { getStatsEventsByOrganization } from '@/actions/getStatsEventsByOrganization';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';
import Select from '@/ui/select/select';

import { conjunctionsByOrganisationColumns } from './PerformanceMonitoringConjunctionEventsByOrganisationDataTableColumns';

type PerformanceMonitoringConjunctionsByOrganisationDataTableProps = {
  params: TypeGetStatsEventsByOrganizationParams;
  data: EventsByOrganizationType[];
  isAnalysist: boolean;
};

const PerformanceMonitoringConjunctionsByOrganisationDataTable = ({ data, params, isAnalysist }: PerformanceMonitoringConjunctionsByOrganisationDataTableProps) => {
  const t = useTranslations('Tables.Performance_monitoring.conjunction_events_by_organisation');

  const [organisation, setOrganisation] = useState<string>('');

  const organisations = useMemo(() => {
    return uniq(
      data.filter(obj => obj.name !== 'Total')
        .map(obj => obj.name),
    )
      .sort()
      .map(organisationName => ({
        children: organisationName,
        value: organisationName,
      }));
  }, [data]);

  const tableData = useMemo(() => {
    return [
      ...(organisation
        ? data.filter(
          obj => obj.name === organisation,
        )
        : data),
    ];
  }, [organisation, data]);

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setOrganisation(value);
  };

  return (
    <>
      <p className="govuk-body">{t('description')}</p>
      {isAnalysist && (
        <Select
          name="event-by-organisation-select"
          value={organisation}
          options={[
            {
              children: 'All organisations',
              value: '',
            },
            ...organisations,
          ]}
          onChange={selectChange}
        />
      )}
      <DataTable
        columns={conjunctionsByOrganisationColumns}
        data={tableData}
      />
      <DownloadData type={t('this_table')} params={params} downloadAction={getStatsEventsByOrganization} />
    </>
  );
};

export { PerformanceMonitoringConjunctionsByOrganisationDataTable };
