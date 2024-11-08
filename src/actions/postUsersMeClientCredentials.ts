'use server';

import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function postUsersMeClientCredentials(params: RequestParams = {}) {
  const { data } = await Api.postUsersMeClientCredentials(params);

  return data;
};
