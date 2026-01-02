'use server';

import type { TypeGetManoeuvrePlotsByEventEventShortIdParams } from '@/__generated__/data-contracts';
import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getManoeuvrePlotsByEventEventShortId(query: TypeGetManoeuvrePlotsByEventEventShortIdParams, params: RequestParams = {}) {
  try {
    const { data } = await Api.getManoeuvrePlotsByEventEventShortId(query, params);
    return data;
  } catch {
    return [];
  }
}
