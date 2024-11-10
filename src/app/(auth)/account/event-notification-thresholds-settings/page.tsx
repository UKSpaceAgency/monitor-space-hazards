import { getTranslations } from 'next-intl/server';

import { getUsersMe } from '@/actions/getUsersMe';
import { ThresholdsSettingsForm } from '@/components/account/thresholds-settings/ThresholdsSettingsForm';
import type { ThresholdsSettingsFormSchema } from '@/validations/thresholdsSettingsFormSchema';

export default async function EventNotificationThresholdsSettingsPage() {
  const t = await getTranslations('EventNotificationThresholdsSettings');

  const data = await getUsersMe();

  const defaultValues = data.notification_thresholds?.reduce((acc, cur) => {
    if (cur.type === 'TIME_TO_EVENT') {
      acc[cur.type] = cur.value / 3600;
    } else if (cur.type === 'PROBABILITY_OF_COLLISION') {
      acc[cur.type] = Math.round(cur.value * 100);
    } else {
      acc[cur.type] = cur.value;
    }
    return acc;
  }, {} as ThresholdsSettingsFormSchema);

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      {t.rich('description')}
      <ThresholdsSettingsForm defaultValues={defaultValues} />
    </div>
  );
}
