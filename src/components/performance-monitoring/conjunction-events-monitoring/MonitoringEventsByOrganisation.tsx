import { getTranslations } from 'next-intl/server';

import { getSession } from '@/actions/getSession';
import Details from '@/ui/details/details';
import { isAnalysist } from '@/utils/Roles';

import { MonitoringEventsByOrganisationContent } from './MonitoringEventsByOrganisationContent';

const MonitoringEventsByOrganisation = async () => {
  const t = await getTranslations('Performance_monitoring.conjunction_accordion.conjunction_events_by_organisation');

  const session = await getSession();

  return (
    <div>
      <MonitoringEventsByOrganisationContent isAnalysist={isAnalysist(session?.user.role)} />
      <Details summary={t.rich('details.title')}>
        {t('details.content')}
      </Details>
    </div>
  );
};

export { MonitoringEventsByOrganisation };
