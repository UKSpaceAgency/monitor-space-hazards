'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { EventsBySatelliteType } from '@/actions/getStatsEventsBySatellite';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';
import Details from '@/ui/details/details';
import Select from '@/ui/select/select';

import { pocColumns, type PocRow } from './OrganisationConjunctionEventsByPoCColumns';

type OrganisationConjunctionEventsByPoCProps = {
  stats: EventsBySatelliteType[];
  organisationName: string;
};

const OrganisationConjunctionEventsByPoC = ({
  stats,
  organisationName,
}: OrganisationConjunctionEventsByPoCProps) => {
  const t = useTranslations('Tables.Organisation_conjunction_poc');
  const allSatellitesLabel = t('all_satellites');
  const [selectedSatellite, setSelectedSatellite] = useState(allSatellitesLabel);

  const rows: PocRow[] = useMemo(
    () =>
      stats.map(s => ({
        ...s,
        total: s.low + s.medium + s.high,
      })),
    [stats],
  );

  const filtered = useMemo(
    () =>
      selectedSatellite === allSatellitesLabel
        ? rows
        : rows.filter(r => r.name === selectedSatellite),
    [rows, selectedSatellite, allSatellitesLabel],
  );

  const satelliteOptions = [
    { children: allSatellitesLabel, value: allSatellitesLabel },
    ...stats.map(s => ({ children: s.name, value: s.name })),
  ];

  const downloadAction = async () => filtered;

  return (
    <div>
      <p className="govuk-!-font-weight-bold">
        {t('description', { organisationName })}
      </p>
      <Select
        name="satellite-poc"
        id="satellite-poc"
        label={t('select_satellite')}
        value={selectedSatellite}
        options={satelliteOptions}
        onChange={e => setSelectedSatellite(e.target.value)}
        className="mb-4"
      />
      {/* TODO: Add chart visualisation once chart component supports this breakdown */}
      <div className="overflow-x-auto h-[500px]">
        <DataTable<PocRow>
          data={filtered}
          columns={pocColumns}
          enableSorting={false}
          emptyLabel={t('empty')}
        />
      </div>
      <DownloadData
        type={t('download_type')}
        params={{}}
        downloadAction={downloadAction}
        ariaLabel={t('download_aria')}
      />
      <Details summary={t('help_title')}>
        {t('help_description', { organisationName })}
      </Details>
    </div>
  );
};

export { OrganisationConjunctionEventsByPoC };
