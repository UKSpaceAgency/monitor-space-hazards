'use server';

import type { TypeGetActivityEventsParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function getActivityEvents(query: TypeGetActivityEventsParams) {
  const { data } = await Api.getActivityEvents(query, {
    next: { tags: [REVALIDATION_TAGS.GET_ACTIVITY_EVENTS] },
  });
  return data;
}
