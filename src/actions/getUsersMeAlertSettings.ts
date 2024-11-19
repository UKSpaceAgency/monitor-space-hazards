'use server';

import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getUsersMeAlertSettings(params: RequestParams = {}) {
  const { data } = await Api.getUsersMeAlertSettings(params);
  return data;
};
