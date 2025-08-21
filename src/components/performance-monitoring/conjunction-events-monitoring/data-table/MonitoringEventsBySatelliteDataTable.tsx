'use client';
import { useQuery } from '@tanstack/react-query';
import { uniq } from 'lodash';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { getStatsEventsBySatellite } from '@/actions/getStatsEventsBySatellite';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';
import { Scrollable } from '@/components/Scrollable';
import Select from '@/ui/select/select';
import Spinner from '@/ui/spinner/spinner';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { eventsBySatelliteColumns } from './MonitoringEventsBySatelliteDataTableColumns';

type MonitoringEventsBySatelliteDataTableProps = {
  isAnalysist: boolean;
};

const MonitoringEventsBySatelliteDataTable = ({ isAnalysist }: MonitoringEventsBySatelliteDataTableProps) => {
  const t = useTranslations('Tables.Performance_monitoring.conjunction_events_by_satellite');

  const [organisation, setOrganisation] = useState('');

  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.StatsEventBySatellite],
    queryFn: () => getStatsEventsBySatellite(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const organisations = useMemo(() => {
    return uniq((data || []).map(obj => obj.organizationName))
      .sort()
      .map(organisationName => ({
        children: organisationName,
        value: organisationName,
      }));
  }, [data]);

  const tableData = useMemo(() => {
    return organisation ? (data || []).filter(obj => obj.organizationName === organisation) : data || [];
  }, [organisation, data]);

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setOrganisation(value);
  };

  if (isFetching || !data) {
    return (
      <div className="p-10">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {isAnalysist && (
        <Select
          name="organisation-select"
          value={organisation}
          options={[
            {
              children: t('all_organisations'),
              value: '',
            },
            ...organisations,
          ]}
          onChange={selectChange}
        />
      )}
      <Scrollable>
        <DataTable
          columns={eventsBySatelliteColumns}
          data={tableData}
          ariaLabel="Information on Events by satellite"
        />
      </Scrollable>
      <DownloadData type={t('this_table')} params={{}} downloadAction={getStatsEventsBySatellite} ariaLabel="Conjunction events by satellite" />
    </>
  );
};

export { MonitoringEventsBySatelliteDataTable };
