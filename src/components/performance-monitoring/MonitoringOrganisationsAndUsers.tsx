import { getTranslations } from 'next-intl/server';

import { getOrganisationsAndUsersStats } from '@/actions/getOrganisationsAndUsersStats';
import Details from '@/ui/details/details';

import { OrganisationsAndUsersChart } from '../charts/organisations-and-users/OrganisationsAndUsers';
import { DownloadData } from '../DownloadData';
import { MonitoringOrganisationsAndUsersDataTable } from './data-table/MonitoringOrganisationsAndUsersDataTable';

const MonitoringOrganisationsAndUsers = async () => {
  const t = await getTranslations('Performance_monitoring.service_usage_accordion.organisations_and_users');

  const data = await getOrganisationsAndUsersStats({});

  return (
    <>
      <OrganisationsAndUsersChart data={data} />
      <MonitoringOrganisationsAndUsersDataTable data={data} />
      <DownloadData type={t('title')} downloadAction={getOrganisationsAndUsersStats} params={{}} />
      <Details summary={t('details.title')}>
        {t.rich('details.content')}
      </Details>
    </>
  );
};

export { MonitoringOrganisationsAndUsers };
