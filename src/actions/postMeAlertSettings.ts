'use server';

import type { TypeAlertSettingsIn } from '@/__generated__/data-contracts';
import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function postMeAlertSettings(payload: TypeAlertSettingsIn, params: RequestParams = {}) {
  const { data } = await Api.postUsersMeAlertSettings(payload, params);
  return data;
};
