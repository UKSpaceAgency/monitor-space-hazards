import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function getFragmentationAlertLatest(short_id: string) {
  const { data } = await Api.getFragmentationEventsShortIdAlertsLatest(short_id, {
    next: { tags: [REVALIDATION_TAGS.GET_FRAGMENTATION_ALERT_LATEST] },
  });
  return data;
}
