import { getTranslations } from 'next-intl/server';

import { getStatsMonthlyConjunctionEventsByNoradId } from '@/actions/getStatsMonthlyConjunctionEventsByNoradId';
import { DownloadData } from '@/components/DownloadData';
import Details from '@/ui/details/details';

import { SatelliteConjunctionEventsByPoCContent } from './SatelliteConjunctionEventsByPoCContent';

type SatelliteConjunctionEventsByPoCProps = {
  noradId: string;
};

const SatelliteConjunctionEventsByPoC = async ({ noradId }: SatelliteConjunctionEventsByPoCProps) => {
  const t = await getTranslations('Satellite.Conjunction_events_by_probability_of_collision');

  return (
    <div>
      <SatelliteConjunctionEventsByPoCContent noradId={noradId} />
      <DownloadData type={t('title')} params={{ noradId, months: 0 }} downloadAction={getStatsMonthlyConjunctionEventsByNoradId} ariaLabel="Conjunction events by probability" />
      <Details summary={t.rich('details.title')}>
        {t('details.content')}
      </Details>
    </div>
  );
};

export { SatelliteConjunctionEventsByPoC };
