'use client';

import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

import type { EventsBySatelliteAndType } from '@/actions/getStatsEventsByTypeForOrg';
import { ConjunctionEventsByTypeChart } from '@/components/charts/conjunction-events-by-type-chart/ConjunctionEventsByTypeChart';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';
import Details from '@/ui/details/details';
import Select from '@/ui/select/select';

import {
  eventsByTypeColumns,
  type EventsByTypeRow,
} from './OrganisationConjunctionEventsByTypeColumns';

type OrganisationConjunctionEventsByTypeProps = {
  stats: EventsBySatelliteAndType[];
  organisationName: string;
  actionButtons?: ReactNode;
};

const OrganisationConjunctionEventsByType = ({
  stats,
  organisationName,
  actionButtons,
}: OrganisationConjunctionEventsByTypeProps) => {
  const t = useTranslations('Tables.Organisation_conjunction_type');
  const allSatellitesLabel = t('all_satellites');
  const [selectedSatellite, setSelectedSatellite] = useState(allSatellitesLabel);

  const rows: EventsByTypeRow[] = stats;

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

  const hasData = filtered.length > 0 && filtered.some(r => r.total > 0);

  const downloadAction = async () => filtered;

  return (
    <div>
      <p className="govuk-!-font-weight-bold mb-6">
        {t('description', { organisationName })}
      </p>
      <Select
        name="satellite-type"
        id="satellite-type"
        label={t('select_satellite')}
        value={selectedSatellite}
        options={satelliteOptions}
        onChange={e => setSelectedSatellite(e.target.value)}
        className="mb-4"
      />
      {hasData
        ? (
            <>
              <ConjunctionEventsByTypeChart data={filtered} actionButtons={actionButtons} />
              <div className="overflow-x-auto max-h-[500px]">
                <DataTable<EventsByTypeRow>
                  data={filtered}
                  columns={eventsByTypeColumns}
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
            </>
          )
        : (
            <p className="govuk-body">{t('empty')}</p>
          )}
      <Details summary={t('help_title')}>
        {t('help_description', { organisationName })}
      </Details>
    </div>
  );
};

export { OrganisationConjunctionEventsByType };
