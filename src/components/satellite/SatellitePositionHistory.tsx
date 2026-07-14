import { getTranslations } from 'next-intl/server';

import type { TypeActivityReportOut } from '@/__generated__/data-contracts';
import { getActivityEventLatestReport } from '@/actions/getActivityEventLatestReport';
import { getActivityEventsByNoradId } from '@/actions/getActivityEventsNoradId';

import { DownloadData } from '../DownloadData';
import { SatellitePositionHistoryDataTable } from './data-table/SatellitePositionHistoryDataTable';

type SatellitePositionHistoryProps = {
  noradId: string;
  commonName: string;
};

const SatellitePositionHistory = async ({ noradId, commonName }: SatellitePositionHistoryProps) => {
  const t = await getTranslations('Satellite.Position_history');
  const tTables = await getTranslations('Tables');
  const activityEvents = await getActivityEventsByNoradId(noradId);
  const shortIds = [...new Set(activityEvents.map(event => event.short_id))];

  const latestReports = await Promise.all(
    shortIds.map(shortId => getActivityEventLatestReport(shortId)),
  );

  const data = latestReports
    .filter((report): report is TypeActivityReportOut => report !== null)
    .sort((a, b) => new Date(b.latest_tle_epoch).getTime() - new Date(a.latest_tle_epoch).getTime());

  const downloadData = async () => {
    'use server';

    const events = await getActivityEventsByNoradId(noradId);
    const eventShortIds = [...new Set(events.map(event => event.short_id))];
    const reports = await Promise.all(eventShortIds.map(shortId => getActivityEventLatestReport(shortId)));

    return reports
      .filter((report): report is TypeActivityReportOut => report !== null)
      .sort((a, b) => new Date(b.latest_tle_epoch).getTime() - new Date(a.latest_tle_epoch).getTime());
  };

  return (
    <div>
      {t.rich('description', {
        common_name: commonName,
      })}
      <SatellitePositionHistoryDataTable data={data} />
      <DownloadData type={tTables('Download.types.position_history')} params={{ norad_id: noradId }} downloadAction={downloadData} ariaLabel="Position history" />
    </div>
  );
};

export { SatellitePositionHistory };
