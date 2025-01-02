import { getTranslations } from 'next-intl/server';

import type { TypeGetStatsEventsByOrganizationParams } from '@/__generated__/data-contracts';
import { getStatsEventsByOrganization } from '@/actions/getStatsEventsByOrganization';
import { getUsersMe } from '@/actions/getUsersMe';
import { FORMAT_API_DATE_TIME, TODAY_DATE_TIME } from '@/libs/Dayjs';
import Details from '@/ui/details/details';
import { isAnalysist } from '@/utils/Roles';

import { MonitoringEventsByOrganisationContent } from './MonitoringEventsByOrganisationContent';

const MonitoringEventsByOrganisation = async () => {
  const t = await getTranslations('Performance_monitoring.conjunction_accordion.conjunction_events_by_organisation');

  const params: TypeGetStatsEventsByOrganizationParams = {
    start_date: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
  };

  const data = await getStatsEventsByOrganization(params);
  const user = await getUsersMe();

  return (
    <div>
      <MonitoringEventsByOrganisationContent initialData={data} params={params} isAnalysist={isAnalysist(user.role)} />
      <Details summary={t('details.title')}>
        {t('details.content')}
      </Details>
    </div>
  );
};

export { MonitoringEventsByOrganisation };
