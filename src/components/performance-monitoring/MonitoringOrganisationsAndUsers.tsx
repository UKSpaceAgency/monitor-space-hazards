import { getTranslations } from 'next-intl/server';

import { getStatsMonthlyOrganizations } from '@/actions/getStatsMonthlyOrganizations';
import Details from '@/ui/details/details';

import { OrganisationsAndUsersChart } from '../charts/organisations-and-users/OrganisationsAndUsers';
import { DataTable } from '../DataTable';
import { DownloadData } from '../DownloadData';
import { Scrollable } from '../Scrollable';
import { usersAndOrganisationsColumns } from './data-table/MonitoringOrganisationsAndUsersDataTableColumns';

const MonitoringOrganisationsAndUsers = async () => {
  const t = await getTranslations('Performance_monitoring.service_usage_accordion.organisations_and_users');

  const data = await getStatsMonthlyOrganizations();

  return (
    <>
      <OrganisationsAndUsersChart data={data} />
      <Scrollable>
        <DataTable
          columns={usersAndOrganisationsColumns}
          data={data}
        />
      </Scrollable>
      <DownloadData type={t('title')} downloadAction={getStatsMonthlyOrganizations} params={{}} />
      <Details summary={t('details.title')}>
        {t.rich('details.content')}
      </Details>
    </>
  );
};

export { MonitoringOrganisationsAndUsers };
