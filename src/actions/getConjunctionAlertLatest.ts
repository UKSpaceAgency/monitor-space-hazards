import { notFound } from 'next/navigation';

import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function getConjunctionAlertLatest(shortId: string) {
  try {
    const { data } = await Api.getConjunctionEventsShortIdAlertsLatest(shortId, {
      next: { tags: [REVALIDATION_TAGS.GET_CONJUNCTION_ALERT_LATEST] },
    });
    return data;
  } catch {
    notFound();
  }
}
