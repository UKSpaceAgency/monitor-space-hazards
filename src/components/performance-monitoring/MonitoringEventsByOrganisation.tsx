import { getTranslations } from 'next-intl/server';

import { getUsersMe } from '@/actions/getUsersMe';
import Details from '@/ui/details/details';
import { isAnalysist } from '@/utils/Roles';

import { MonitoringEventsByOrganisationContent } from './MonitoringEventsByOrganisationContent';

const MonitoringEventsByOrganisation = async () => {
  const t = await getTranslations('Performance_monitoring.conjunction_accordion.conjunction_events_by_organisation');

  const user = await getUsersMe();

  return (
    <div>
      <MonitoringEventsByOrganisationContent isAnalysist={isAnalysist(user.role)} />
      <Details summary={t('details.title')}>
        {t('details.content')}
      </Details>
    </div>
  );
};

export { MonitoringEventsByOrganisation };
