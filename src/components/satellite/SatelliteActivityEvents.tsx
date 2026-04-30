import { getTranslations } from 'next-intl/server';

import { getActivityEventsByNoradId } from '@/actions/getActivityEventsNoradId';
import Details from '@/ui/details/details';

import { DownloadData } from '../DownloadData';
import { SatelliteActivitiesDataTable } from './data-table/SatelliteActivitiesDataTable';

type SatelliteActivityEventsProps = {
  noradId: string;
  commonName: string;
};

const SatelliteActivityEvents = async ({ noradId, commonName }: SatelliteActivityEventsProps) => {
  const t = await getTranslations('Tables');
  const tActivities = await getTranslations('Satellite.Activity_events');
  const data = await getActivityEventsByNoradId(noradId);

  const downloadData = async () => {
    'use server';
    return await getActivityEventsByNoradId(noradId);
  };

  return (
    <div className="mb-12">
      <SatelliteActivitiesDataTable initialData={data} />
      <Details summary={tActivities.rich('help.title')}>
        {tActivities.rich('help.content', {
          commonName,
        })}
      </Details>
      <DownloadData type={t('Download.types.activities')} params={{ norad_id: noradId }} downloadAction={downloadData} ariaLabel="Activities" />
    </div>
  );
};

export { SatelliteActivityEvents };
