import { notFound } from 'next/navigation';

import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function getFragmentationAlertLatest(shortId: string) {
  try {
    const { data } = await Api.getFragmentationEventsShortIdAlertsLatest(shortId, {
      next: { tags: [REVALIDATION_TAGS.GET_FRAGMENTATION_ALERT_LATEST] },
    });
    return data;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
