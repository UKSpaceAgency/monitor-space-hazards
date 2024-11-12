'use server';

import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getManoeuvrePlotsManoeuvrePlotId(manoeuvrePlotId: string, params: RequestParams = {}) {
  const { data } = await Api.getManoeuvrePlotsManoeuvrePlotId(manoeuvrePlotId, params);
  return { data };
};
