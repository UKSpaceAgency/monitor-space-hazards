'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { StatsMonthlyOrganizationsType } from '@/actions/getStatsMonthlyOrganizations';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';

import BaseChart from '../base/BaseChart';
import { chartPalette } from '../base/theme';

type OrganisationsAndUsersProps = {
  data: StatsMonthlyOrganizationsType[];
};

const OrganisationsAndUsersChart = ({ data }: OrganisationsAndUsersProps) => {
  const t = useTranslations('Charts.Organisations_and_users');

  const [showMonths, setShowMonths] = useState(13);

  const sliderData = data.slice(0, showMonths);

  const actionButtons = (
    <ToggleButtons
      name="organisations-and-users-data-range"
      ariaLabel="Organisations and users"
      items={[
        {
          id: '12_months',
          title: t('12_months'),
          ariaLabel: t('12_months'),
          value: 13,
        },
        {
          id: 'all_time',
          title: t('all_time'),
          ariaLabel: t('all_time'),
          value: -1,
        },
      ]}
      active={showMonths}
      setActive={setShowMonths}
      title={t('data_range')}
    />
  );

  const datasets = useMemo(() => {
    return {
      datasets: [
        {
          label: t('users'),
          data: sliderData.map(({ month, users }) => ({
            x: month.getTime(),
            y: users,
          })),
          borderColor: chartPalette.darkBlue,
          backgroundColor: chartPalette.darkBlue,
        },
        {
          label: t('organisations'),
          data: sliderData.map(({ month, organisations }) => ({
            x: month.getTime(),
            y: organisations,
          })),
          borderColor: chartPalette.orange,
          backgroundColor: chartPalette.orange,
        },
      ],
    };
  }, [t, sliderData]);

  return (
    <BaseChart
      data={datasets}
      name="organisations-and-users-chart"
      actionButtons={actionButtons}
      yAxisTitle={t('y_axis_title')}
      xAxisTitle={t('x_axis_title')}
      showLegend
      ariaLabel="Organisations and users"
      legend={{
        title: t('legend_title'),
      }}
    />
  );
};

export { OrganisationsAndUsersChart };
