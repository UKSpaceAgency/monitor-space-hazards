'use server';

import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getAlertsUserUserId(userId: string, params: RequestParams = {}) {
  const { data } = await Api.getAlertsUserUserId(userId, params);
  return data;
};
