'use server';

import type { TypeGetFragmentationEventsParams } from '@/__generated__/data-contracts';
import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getFragmentationEventsList(
  queryParams?: TypeGetFragmentationEventsParams,
  params: RequestParams = {},
) {
  const query: TypeGetFragmentationEventsParams = {
    epoch: 'all',
    sort_order: 'desc',
    ...queryParams,
  };
  const { data } = await Api.getFragmentationEvents(query, params);
  return data;
};
