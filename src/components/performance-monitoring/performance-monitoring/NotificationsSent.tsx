import { getTranslations } from 'next-intl/server';

import type { TypeGetStatsNotificationsSentParams } from '@/__generated__/data-contracts';
import { getStatsNotificationsSent } from '@/actions/getStatsNotificationsSent';
import { DownloadData } from '@/components/DownloadData';
import Details from '@/ui/details/details';

import { NotificationsSentDaily } from './NotificationsSentDaily';

const NotificationsSent = async () => {
  const t = await getTranslations('Performance_monitoring.performance_accordion.notifications_sent');

  const params: TypeGetStatsNotificationsSentParams = {
    limit: 9999,
    sort_order: 'desc',
  };

  return (
    <>
      <NotificationsSentDaily />
      <DownloadData type={t('title')} params={params} downloadAction={getStatsNotificationsSent} ariaLabel="Notifications sent" />
      <Details summary={t('details.title')} aria-label="Notifications Sent details">
        {t.rich('details.content')}
      </Details>
    </>
  );
};

export { NotificationsSent };
