'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { StatsMonthlyOrganizationsType } from '@/actions/getStatsMonthlyOrganizations';
import BaseChart from '@/components/charts/base/BaseChart';
import { chartPalette } from '@/components/charts/base/theme';
import { DataTable } from '@/components/DataTable';
import { Scrollable } from '@/components/Scrollable';
import { ToggleButtons } from '@/ui/toggle-buttons/toggle-buttons';

import { usersAndOrganisationsColumns } from './data-table/MonitoringOrganisationsAndUsersDataTableColumns';

const MonitoringOrganisationsAndUsersMonthly = ({ data }: { data: StatsMonthlyOrganizationsType[] }) => {
  const t = useTranslations('Charts.Organisations_and_users');

  const [showMonths, setShowMonths] = useState(12);

  const sliderData = data.slice(0, showMonths);

  const actionButtons = (
    <ToggleButtons
      name="organisations-and-users-data-range"
      items={[
        {
          title: t('12_months'),
          ariaLabel: t('12_months'),
          value: 13,
        },
        {
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
          borderColor: chartPalette.orange,
          backgroundColor: chartPalette.orange,
        },
        {
          label: t('organisations'),
          data: sliderData.map(({ month, organisations }) => ({
            x: month.getTime(),
            y: organisations,
          })),
          borderColor: chartPalette.darkBlue,
          backgroundColor: chartPalette.darkBlue,
        },
      ],
    };
  }, [t, sliderData]);

  return (
    <>
      <BaseChart data={datasets} name="organisations-and-users-chart" actionButtons={actionButtons} />
      <Scrollable>
        <DataTable
          columns={usersAndOrganisationsColumns}
          data={data}
        />
      </Scrollable>
    </>
  );
};

export { MonitoringOrganisationsAndUsersMonthly };
