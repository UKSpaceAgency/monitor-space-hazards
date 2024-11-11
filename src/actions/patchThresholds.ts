'use server';

import { z } from 'zod';

import type { TypeThreshold, TypeThresholdType } from '@/__generated__/data-contracts';
import { transformZodErrors } from '@/utils/Zod';
import { type ThresholdsSettingsFormSchema, thresholdsSettingsFormSchema } from '@/validations/thresholdsSettingsFormSchema';

import { patchUsersMe } from './patchUsersMe';

export async function patchThresholds(formData: ThresholdsSettingsFormSchema) {
  try {
    thresholdsSettingsFormSchema.parse(formData);

    const notificationThresholds: TypeThreshold[] = [];
    for (const [key, fieldValue] of Object.entries(formData)) {
      let value = 0;
      if (key === 'TIME_TO_EVENT') {
        value = fieldValue * 3600;
      } else if (key === 'PROBABILITY_OF_COLLISION') {
        value = fieldValue / 100;
      } else {
        value = fieldValue;
      }
      notificationThresholds.push({
        type: key as TypeThresholdType,
        value,
      });
    }

    const { data } = await patchUsersMe({ notification_thresholds: notificationThresholds });

    return {
      data,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        errors: transformZodErrors(error),
      };
    }
    return {
      errors: [{
        path: 'root',
        message: 'An unexpected error occurred.',
      }],
    };
  }
};
