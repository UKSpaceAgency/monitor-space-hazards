'use server';

import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function getReentryEvent(shortId: string) {
  const { data } = await Api.getReentryEventsShortId(shortId, {
    next: { tags: [REVALIDATION_TAGS.GET_REENTRY_EVENT] },
  });
  return data;
};
