'use server';

import type { TypeGetManoeuvrePlotsParams } from '@/__generated__/data-contracts';
import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function getManoeuvrePlots(query?: TypeGetManoeuvrePlotsParams, params: RequestParams = {}) {
  const { data } = await Api.getManoeuvrePlots(query, {
    next: { tags: [REVALIDATION_TAGS.GET_MANOEUVRE] },
    ...params,
  });
  return data;
};
