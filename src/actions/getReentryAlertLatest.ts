import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function getReentryAlertLatest(short_id: string) {
  const { data } = await Api.getReentryEventsShortIdAlertsLatest(short_id, {
    next: { tags: [REVALIDATION_TAGS.GET_REENTRY_ALERT_LATEST] },
  });
  return data;
}
