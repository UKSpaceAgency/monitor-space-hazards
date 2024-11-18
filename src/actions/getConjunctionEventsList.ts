'use server';

import type { TypeGetConjunctionEventsParams } from '@/__generated__/data-contracts';
import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getConjunctionEventsList(
  query?: TypeGetConjunctionEventsParams,
  params: RequestParams = {},
) {
  const { data } = await Api.getConjunctionEventsList(query, params);
  return data;
};
