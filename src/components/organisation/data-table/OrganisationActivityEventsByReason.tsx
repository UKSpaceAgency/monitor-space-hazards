'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { TypeActivityEvent } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';
import Details from '@/ui/details/details';
import Select from '@/ui/select/select';

import { reasonColumns } from './OrganisationActivityEventsByReasonColumns';

type ReasonRow = {
  satellite: string;
  noradId: string;
  planned: number;
  unplanned: number;
  positionChange: number;
  missingData: number;
  total: number;
};

type OrganisationActivityEventsByReasonProps = {
  initialData: TypeActivityEvent[];
  satellites: { name: string; noradId: string }[];
  organisationName: string;
};

const OrganisationActivityEventsByReason = ({
  initialData,
  satellites,
  organisationName,
}: OrganisationActivityEventsByReasonProps) => {
  const t = useTranslations('Tables.Organisation_activity_by_reason');
  const allSatellitesLabel = t('all_satellites');
  const [selectedSatellite, setSelectedSatellite] = useState(allSatellitesLabel);

  const rows: ReasonRow[] = useMemo(() => {
    const satelliteList = selectedSatellite === allSatellitesLabel
      ? satellites
      : satellites.filter(s => s.name === selectedSatellite);

    return satelliteList.map(({ name, noradId }) => {
      const events = initialData.filter(e => e.norad_id === noradId);
      return {
        satellite: name,
        noradId,
        planned: events.filter(e => e.reason_for_flag === 'Manoeuvre (planned)').length,
        unplanned: events.filter(e => e.reason_for_flag === 'Manoeuvre (unplanned)').length,
        positionChange: events.filter(e => e.reason_for_flag === 'Position change').length,
        missingData: events.filter(e => e.reason_for_flag === 'Missing data' || e.reason_for_flag == null).length,
        total: events.length,
      };
    });
  }, [initialData, satellites, selectedSatellite, allSatellitesLabel]);

  const satelliteOptions = [
    { children: allSatellitesLabel, value: allSatellitesLabel },
    ...satellites.map(s => ({ children: s.name, value: s.name })),
  ];

  const downloadAction = async () => rows;

  return (
    <div>
      <p className="govuk-!-font-weight-bold">
        {t('description', { organisationName })}
      </p>
      <Select
        name="reason-satellite"
        id="reason-satellite"
        label={t('select_satellite')}
        value={selectedSatellite}
        options={satelliteOptions}
        onChange={e => setSelectedSatellite(e.target.value)}
        className="mb-4"
      />
      {/* TODO: Add chart visualisation once chart component supports activity flag breakdown */}
      <div className="overflow-x-auto">
        <DataTable<ReasonRow>
          data={rows}
          columns={reasonColumns}
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

export { OrganisationActivityEventsByReason };
