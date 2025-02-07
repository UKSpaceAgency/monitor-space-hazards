import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getUsersMe } from '@/actions/getUsersMe';
import { ThresholdsSettingsForm } from '@/components/account/thresholds-settings/ThresholdsSettingsForm';
import { isGovUser } from '@/utils/Roles';
import type { ThresholdsSettingsFormSchema } from '@/validations/thresholdsSettingsFormSchema';

export const metadata: Metadata = {
  title: 'Set your conjunction event notification thresholds',
};

export default async function EventNotificationThresholdsSettingsPage() {
  const t = await getTranslations('Event_notification_thresholds_settings');

  const data = await getUsersMe();

  if (isGovUser(data.role)) {
    return notFound();
  }

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
      {t.rich('content')}
      <ThresholdsSettingsForm defaultValues={defaultValues} />
    </div>
  );
}
