'use server';

import Api from '@/libs/Api';

export async function getActivityEvent(shortId: string) {
  try {
    const { data } = await Api.getActivityEventsShortId(shortId);
    return data;
  } catch {
    return null;
  }
}
