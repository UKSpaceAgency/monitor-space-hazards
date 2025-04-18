import { useTranslations } from 'next-intl';

import { getStatsMonthlyConjunctionEvents } from '@/actions/getStatsMonthlyConjunctionEvents';
import { DownloadData } from '@/components/DownloadData';
import Details from '@/ui/details/details';

import { MonitoringEventsByProbabilityOfCollisionContent } from './MonitoringEventsByProbabilityOfCollisionContent';

const MonitoringEventsByProbabilityOfCollision = () => {
  const t = useTranslations('Performance_monitoring.conjunction_accordion.conjunction_events_by_probability_of_collision');

  return (
    <div>
      <MonitoringEventsByProbabilityOfCollisionContent />
      <DownloadData type={t('title')} params={{ months: 0 }} downloadAction={getStatsMonthlyConjunctionEvents} />
      <Details summary={t('details.title')}>
        {t('details.content')}
      </Details>
    </div>
  );
};

export { MonitoringEventsByProbabilityOfCollision };
