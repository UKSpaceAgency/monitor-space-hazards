import { useTranslations } from 'next-intl';

import type { StatsMonthlyOrganizationsType } from '@/actions/getStatsMonthlyOrganizations';
import { chartPalette } from '@/components/charts/base/theme';
import { MonthlyBarChart } from '@/components/charts/monthly-bar/MonthlyBar';
import { DataTable } from '@/components/DataTable';
import { Scrollable } from '@/components/Scrollable';

import { usersAndOrganisationsColumns } from './data-table/MonitoringOrganisationsAndUsersDataTableColumns';

const MonitoringOrganisationsAndUsersMonthly = async ({ data }: { data: StatsMonthlyOrganizationsType[] }) => {
  const t = useTranslations('Charts.Organisations_and_users');

  const datasets = {
    labels: data.map(({ month }) => month),
    datasets: [
      {
        label: t('users'),
        data: data.map(({ users }) => users),
        borderColor: chartPalette.orange,
        backgroundColor: chartPalette.orange,
      },
      {
        label: t('organisations'),
        data: data.map(({ organisations }) => organisations),
        borderColor: chartPalette.darkBlue,
        backgroundColor: chartPalette.darkBlue,
      },
    ],
  };

  return (
    <>
      <MonthlyBarChart data={datasets} stacked />
      <Scrollable>
        <DataTable
          columns={usersAndOrganisationsColumns}
          data={data.reverse()}
        />
      </Scrollable>
    </>
  );
};

export { MonitoringOrganisationsAndUsersMonthly };
