'use server';

import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function getAlerts(params: RequestParams = {}) {
  const { data } = await Api.getAlerts({
    next: { tags: [REVALIDATION_TAGS.GET_ALERTS] },
    ...params,
  });

  return data;
};
