import { getTranslations } from 'next-intl/server';

import { getReentryEventsByNoradId } from '@/actions/getReentryEventsByNoradId';
import { getSession } from '@/actions/getSession';
import { isSatteliteUser } from '@/utils/Roles';

import { DownloadData } from '../DownloadData';
import { SatelliteReentriesDataTable } from './data-table/SatelliteReentriesDataTable';

type SatelliteReentriesEventsProps = {
  noradId: string;
};

const SatelliteReentriesEvents = async ({ noradId }: SatelliteReentriesEventsProps) => {
  const t = await getTranslations('Tables');
  const session = await getSession();
  const data = await getReentryEventsByNoradId(noradId);

  const downloadData = async () => {
    'use server';
    return await getReentryEventsByNoradId(noradId);
  };

  return (
    <div className="mb-12">
      <SatelliteReentriesDataTable
        data={data}
        haveAccessToAlerts={!isSatteliteUser(session?.user.role)}
      />
      <DownloadData
        type={t('Download.types.reentry_events')}
        params={{ norad_id: noradId }}
        downloadAction={downloadData}
        ariaLabel="Reentries events"
      />
    </div>
  );
};

export { SatelliteReentriesEvents };
