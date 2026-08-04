import { getTranslations } from 'next-intl/server';

import { getActivityEventsByNoradId } from '@/actions/getActivityEventsNoradId';
import Details from '@/ui/details/details';

import { DownloadData } from '../DownloadData';
import { SatelliteActivityFlagsByReasonContent } from './SatelliteActivityFlagsByReasonContent';

type SatelliteActivityFlagsByReasonProps = {
  noradId: string;
};

const SatelliteActivityFlagsByReason = async ({ noradId }: SatelliteActivityFlagsByReasonProps) => {
  const t = await getTranslations('Satellite.Activity_flags_by_reason');
  const data = await getActivityEventsByNoradId(noradId);

  const downloadData = async () => {
    'use server';
    return getActivityEventsByNoradId(noradId);
  };

  return (
    <div>
      <SatelliteActivityFlagsByReasonContent initialData={data} />
      <DownloadData type={t('title')} params={{ norad_id: noradId }} downloadAction={downloadData} ariaLabel="Activity flags by reason for flag" />
      <Details summary={t.rich('details.title')}>
        {t('details.content')}
      </Details>
    </div>
  );
};

export { SatelliteActivityFlagsByReason };
