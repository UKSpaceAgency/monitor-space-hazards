import { getTranslations } from 'next-intl/server';

import { getStatsMonthlyOrganizations } from '@/actions/getStatsMonthlyOrganizations';
import Details from '@/ui/details/details';

import { DownloadData } from '../../DownloadData';
import { MonitoringOrganisationsAndUsersMonthly } from './MonitoringOrganisationsAndUsersMonthly';

const MonitoringOrganisationsAndUsers = async () => {
  const t = await getTranslations('Performance_monitoring.service_usage_accordion.organisations_and_users');

  const data = await getStatsMonthlyOrganizations();

  return (
    <>
      <MonitoringOrganisationsAndUsersMonthly data={data} />
      <DownloadData type={t('title')} downloadAction={getStatsMonthlyOrganizations} params={{}} />
      <Details summary={t('details.title')}>
        {t.rich('details.content')}
      </Details>
    </>
  );
};

export { MonitoringOrganisationsAndUsers };
