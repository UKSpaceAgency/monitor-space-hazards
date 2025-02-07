'use server';

import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getManoeuvrePlotsManoeuvrePlotId(manoeuvrePlotId: string | undefined, params: RequestParams = {}) {
  if (!manoeuvrePlotId) {
    throw new Error('Manoeuvre ID doesn\'t exist');
  }

  const { data } = await Api.getManoeuvrePlotsManoeuvrePlotId(manoeuvrePlotId, params);
  return { data };
};
