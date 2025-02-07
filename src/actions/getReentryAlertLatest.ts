import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function getReentryAlertLatest(shortId: string) {
  const { data } = await Api.getReentryEventsShortIdAlertsLatest(shortId, {
    next: { tags: [REVALIDATION_TAGS.GET_REENTRY_ALERT_LATEST] },
  });
  return data;
}
