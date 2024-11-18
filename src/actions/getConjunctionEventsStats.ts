'use server';

import type { TypeGetConjunctionEventsStatsParams } from '@/__generated__/data-contracts';
import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getConjunctionEventsStats(
  query?: TypeGetConjunctionEventsStatsParams,
  params: RequestParams = {},
) {
  const { data } = await Api.getConjunctionEventsStats(query, params);
  return data;
};
