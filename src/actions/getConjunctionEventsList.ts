'use server';

import type { TypeGetConjunctionEventsParams } from '@/__generated__/data-contracts';
import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getConjunctionEventsList(
  queryParams?: TypeGetConjunctionEventsParams,
  params: RequestParams = {},
) {
  let query = queryParams;
  if (queryParams?.epoch === 'past') {
    query = {
      ...query,
      epoch: 'past',
      sort_by: 'tca_time',
      sort_order: 'desc',
    };
  }
  const { data } = await Api.getConjunctionEventsList(query, params);
  return data;
};
