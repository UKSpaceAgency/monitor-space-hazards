'use client';
import { uniq } from 'lodash';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { TypeGetStatsEventsBySatelliteParams } from '@/__generated__/data-contracts';
import { type EventsBySatelliteType, getStatsEventsBySatellite } from '@/actions/getStatsEventsBySatellite';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';
import Select from '@/ui/select/select';

import { conjunctionsBySatelliteColumns } from './PerformanceMonitoringConjunctionEventsBySatelliteDataTableColumns';

type PerformanceMonitoringConjunctionsBySatelliteDataTableProps = {
  params: TypeGetStatsEventsBySatelliteParams;
  data: EventsBySatelliteType[];
  isAnalysist: boolean;
};

const PerformanceMonitoringConjunctionsBySatelliteDataTable = ({ data, params, isAnalysist }: PerformanceMonitoringConjunctionsBySatelliteDataTableProps) => {
  const t = useTranslations('Tables.Performance_monitoring.conjunction_events_by_satellite');

  const [organisation, setOrganisation] = useState<string>('');

  const organisations = useMemo(() => {
    return uniq(data.map(obj => obj.organizationName))
      .sort()
      .map(organisationName => ({
        children: organisationName,
        value: organisationName,
      }));
  }, [data]);

  const tableData = useMemo(() => {
    return organisation ? data.filter(obj => obj.organizationName === organisation) : data;
  }, [organisation, data]);

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setOrganisation(value);
  };

  return (
    <>
      {isAnalysist && (
        <Select
          name="organisation-select"
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
      <div className="overflow-auto max-h-[400px]">
        <DataTable
          columns={conjunctionsBySatelliteColumns}
          data={tableData}
        />
      </div>
      <DownloadData type={t('this_table')} params={params} downloadAction={getStatsEventsBySatellite} />
    </>
  );
};

export { PerformanceMonitoringConjunctionsBySatelliteDataTable };
