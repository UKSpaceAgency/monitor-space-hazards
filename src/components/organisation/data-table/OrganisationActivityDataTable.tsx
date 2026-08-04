'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { TypeActivityEvent } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';
import Details from '@/ui/details/details';
import Select from '@/ui/select/select';

import { activityFlagsColumns } from './OrganisationActivityDataTableColumns';

// Values must match the API TypeActivityReasonForFlag values (except the "all" sentinel,
// which means no filter). Only the display label is translated.
const REASON_FILTER_VALUES = {
  all: 'All flags',
  position_change: 'Position change',
  manoeuvre_unplanned: 'Manoeuvre (unplanned)',
  manoeuvre_planned: 'Manoeuvre (planned)',
  missing_data: 'Missing data',
} as const;

type OrganisationActivityDataTableProps = {
  initialData: TypeActivityEvent[];
  satellites: { name: string; noradId: string }[];
  organisationName: string;
};

const OrganisationActivityDataTable = ({
  initialData,
  satellites,
  organisationName,
}: OrganisationActivityDataTableProps) => {
  const t = useTranslations('Tables.Organisation_activity_flags');
  const allSatellitesLabel = t('all_satellites');
  const [selectedSatellite, setSelectedSatellite] = useState(allSatellitesLabel);
  const [selectedReason, setSelectedReason] = useState<string>(REASON_FILTER_VALUES.all);

  const filtered = useMemo(() => {
    return initialData.filter((item) => {
      const matchSatellite
        = selectedSatellite === allSatellitesLabel
        || item.common_name === selectedSatellite;
      const matchReason
        = selectedReason === REASON_FILTER_VALUES.all
        || item.reason_for_flag === selectedReason
        || (selectedReason === REASON_FILTER_VALUES.missing_data && item.reason_for_flag == null);
      return matchSatellite && matchReason;
    });
  }, [initialData, selectedSatellite, selectedReason, allSatellitesLabel]);

  const satelliteOptions = [
    { children: allSatellitesLabel, value: allSatellitesLabel },
    ...satellites.map(s => ({ children: s.name, value: s.name })),
  ];

  const reasonOptions = [
    { children: t('reason_all'), value: REASON_FILTER_VALUES.all },
    { children: t('reason_position_change'), value: REASON_FILTER_VALUES.position_change },
    { children: t('reason_manoeuvre_unplanned'), value: REASON_FILTER_VALUES.manoeuvre_unplanned },
    { children: t('reason_manoeuvre_planned'), value: REASON_FILTER_VALUES.manoeuvre_planned },
    { children: t('reason_missing_data'), value: REASON_FILTER_VALUES.missing_data },
  ];

  const downloadAction = async () => filtered;

  return (
    <div>
      <p className="govuk-body">
        {t('description', { organisationName })}
      </p>
      <p className="govuk-body govuk-!-font-weight-bold">{t('apply_filters')}</p>
      <div className="govuk-grid-row mb-4">
        <div className="govuk-grid-column-one-half">
          <Select
            name="activity-satellite"
            id="activity-satellite"
            label={t('filter_satellite')}
            value={selectedSatellite}
            options={satelliteOptions}
            onChange={e => setSelectedSatellite(e.target.value)}
          />
        </div>
        <div className="govuk-grid-column-one-half">
          <Select
            name="activity-reason"
            id="activity-reason"
            label={t('filter_reason')}
            value={selectedReason}
            options={reasonOptions}
            onChange={e => setSelectedReason(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-auto max-h-[500px]">
        <DataTable<TypeActivityEvent>
          data={filtered}
          columns={activityFlagsColumns}
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
        <p>{t('help_description', { organisationName })}</p>
        <p>{t('help_select_flag')}</p>
      </Details>
    </div>
  );
};

export { OrganisationActivityDataTable };
