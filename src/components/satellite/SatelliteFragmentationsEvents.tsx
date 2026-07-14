import { getTranslations } from 'next-intl/server';

import type { TypeFragmentationEvent } from '@/__generated__/data-contracts';
import { getFragmentationEventsByNoradId } from '@/actions/getFragmentationEventsByNoradId';

import { DownloadData } from '../DownloadData';
import { SatelliteFragmentationsDataTable } from './data-table/SatelliteFragmentationsDataTable';

type SatelliteFragmentationsEventsProps = {
  noradId: string;
};

const SatelliteFragmentationsEvents = async ({ noradId }: SatelliteFragmentationsEventsProps) => {
  const t = await getTranslations('Tables');
  const data = await getFragmentationEventsByNoradId(noradId);
  const sortedData = [...data].sort((a: TypeFragmentationEvent, b: TypeFragmentationEvent) => (
    new Date(b.event_epoch).getTime() - new Date(a.event_epoch).getTime()
  ));

  const downloadData = async () => {
    'use server';
    return await getFragmentationEventsByNoradId(noradId);
  };

  return (
    <div className="mb-12">
      <SatelliteFragmentationsDataTable data={sortedData} />
      <DownloadData
        type={t('Download.types.fragmentation_events')}
        params={{ norad_id: noradId }}
        downloadAction={downloadData}
        ariaLabel="Fragmentation events"
      />
    </div>
  );
};

export { SatelliteFragmentationsEvents };
