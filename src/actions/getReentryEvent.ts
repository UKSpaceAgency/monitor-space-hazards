'use server';

import Api from '@/libs/Api';

export async function getReentryEvent(shortId: string) {
  const { data } = await Api.getReentryEventsShortId(shortId);
  return data;
};
