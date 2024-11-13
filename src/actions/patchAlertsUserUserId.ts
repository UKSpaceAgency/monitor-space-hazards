'use server';

import type { TypeAlertSettingsIn } from '@/__generated__/data-contracts';
import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function patchAlertsUserUserId(userId: string, payload: TypeAlertSettingsIn, params: RequestParams = {}) {
  try {
    const { data } = await Api.patchAlertsUserUserId(userId, payload, params);

    return {
      data,
    };
  } catch {
    return {
      errors: [{
        path: 'root',
        message: 'An unexpected error occurred.',
      }],
    };
  }
};
