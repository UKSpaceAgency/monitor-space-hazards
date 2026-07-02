'use client';

import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import type { EventsBySatelliteAndType } from '@/actions/getStatsEventsByTypeForOrg';
import { ConjunctionEventsByTypeChart } from '@/components/charts/conjunction-events-by-type-chart/ConjunctionEventsByTypeChart';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';
import Details from '@/ui/details/details';

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

  const rows: EventsByTypeRow[] = stats;

  const downloadAction = async () => rows;

  return (
    <div>
      <p className="govuk-!-font-weight-bold">
        {t('description', { organisationName })}
      </p>
      <ConjunctionEventsByTypeChart data={rows} actionButtons={actionButtons} />
      <div className="overflow-x-auto h-[500px]">
        <DataTable<EventsByTypeRow>
          data={rows}
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
      <Details summary={t('help_title')}>
        {t('help_description', { organisationName })}
      </Details>
    </div>
  );
};

export { OrganisationConjunctionEventsByType };
