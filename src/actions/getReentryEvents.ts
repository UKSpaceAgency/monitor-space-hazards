'use server';

import type { TypeGetReentryEventsParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getReentryEvents(params?: TypeGetReentryEventsParams) {
  try {
    const { data } = await Api.getReentryEvents({ epoch: 'future', ...params });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
