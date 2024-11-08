import { useMemo } from 'react';

import type { TypeThreshold, TypeThresholdType } from '@/__generated__/data-contracts';
import { patchUsersMe } from '@/actions/patchUsersMe';
import Form from '@/components/form/Form';

import { ThresholdsSettingsFormContent } from './ThresholdsSettingsFormContent';
import { schema } from './ThresholdsSettingsFormSchema';

type ThresholdsSettingsFormProps = {
  currentSettings?: TypeThreshold[] | null;
};

const ThresholdsSettingsForm = ({ currentSettings }: ThresholdsSettingsFormProps) => {
  const defaultValues = useMemo(() => currentSettings?.reduce((acc, cur) => {
    if (cur.type === 'TIME_TO_EVENT') {
      acc[cur.type] = cur.value / 3600;
    } else if (cur.type === 'PROBABILITY_OF_COLLISION') {
      acc[cur.type] = cur.value * 100;
    } else {
      acc[cur.type] = cur.value;
    }
    return acc;
  }, {} as Record<TypeThresholdType, number>), [currentSettings]);

  const handleFormSubmit = async (values: Record<TypeThresholdType, number>) => {
    'use server';
    const notificationThresholds: TypeThreshold[] = [];
    for (const [key, fieldValue] of Object.entries(values)) {
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
    return patchUsersMe({ notification_thresholds: notificationThresholds });
  };

  return (
    <div>
      <Form
        action={handleFormSubmit}
        defaultValues={defaultValues}
        schema={schema}
        i18path="Thresholds_settings"
      >
        <ThresholdsSettingsFormContent />
      </Form>
    </div>
  );
};

export { ThresholdsSettingsForm };
