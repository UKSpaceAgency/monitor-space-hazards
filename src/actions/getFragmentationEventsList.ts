'use server';

import type { TypeGetFragmentationEventsParams } from '@/__generated__/data-contracts';
import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getFragmentationEventsList(
  queryParams?: TypeGetFragmentationEventsParams,
  params: RequestParams = {},
) {
  let query = queryParams;
  if (queryParams?.epoch === 'past' && !queryParams?.sort_by) {
    query = {
      ...query,
      epoch: 'past',
      sort_order: 'desc',
    };
  }
  const { data } = await Api.getFragmentationEvents(query, params);
  return data;
};
