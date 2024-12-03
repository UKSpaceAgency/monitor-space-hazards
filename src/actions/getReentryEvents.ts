'use server';

import type { TypeGetReentryEventsParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getReentryEvents(params?: TypeGetReentryEventsParams) {
  const { data } = await Api.getReentryEvents(params);
  return data;
};
