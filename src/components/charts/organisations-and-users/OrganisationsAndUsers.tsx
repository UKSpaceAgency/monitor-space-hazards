'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { StatsMonthlyOrganizationsType } from '@/actions/getStatsMonthlyOrganizations';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';

import { chartPalette } from '../base/theme';
import BaseBar from '../base-bar/BaseBar';

type OrganisationsAndUsersProps = {
  data: StatsMonthlyOrganizationsType[];
};

const OrganisationsAndUsersChart = ({ data }: OrganisationsAndUsersProps) => {
  const t = useTranslations('Charts.Organisations_and_users');
  const [showMonths, setShowMonths] = useState(0);

  const actionButtons = (
    <ToggleButtons
      name="organisations-and-users-data-range"
      items={[
        {
          title: t('12_months'),
          ariaLabel: t('12_months'),
          value: 12,
        },
        {
          title: t('all_time'),
          ariaLabel: t('all_time'),
          value: 0,
        },
      ]}
      active={showMonths}
      setActive={setShowMonths}
      title={t('data_range')}
    />
  );

  const datasets = useMemo(() => {
    const slicedData = data.slice(-showMonths);
    return {
      labels: slicedData.map(({ month }) => month),
      datasets: [
        {
          label: t('users'),
          data: slicedData.map(({ users }) => users),
          borderColor: chartPalette.orange,
          backgroundColor: chartPalette.orange,
        },
        {
          label: t('organisations'),
          data: slicedData.map(({ organisations }) => organisations),
          borderColor: chartPalette.darkBlue,
          backgroundColor: chartPalette.darkBlue,
        },
      ],
    };
  }, [data, showMonths, t]);

  return (
    <BaseBar
      actionButtons={actionButtons}
      yAxisTitle={t('y_axis_title')}
      data={datasets}
      stacked={false}
      showLegend
    />
  );
};

export { OrganisationsAndUsersChart };
