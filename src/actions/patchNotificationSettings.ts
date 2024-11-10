'use server';

import type { TypeNotificationSettings } from '@/__generated__/data-contracts';

import { patchUsersMe } from './patchUsersMe';

export async function patchNotificationSettings(formData: TypeNotificationSettings) {
  try {
    const { data } = await patchUsersMe({ notification_settings: formData });

    return {
      errors: null,
      data,
    };
  } catch {
    return {
      errors: [{
        path: 'root',
        message: 'An unexpected error occurred.',
      }],
      data: null,
    };
  }
};
