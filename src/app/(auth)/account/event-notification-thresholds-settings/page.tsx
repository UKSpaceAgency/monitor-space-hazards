import { getTranslations } from 'next-intl/server';

import { getUsersMe } from '@/actions/getUsersMe';
import { ThresholdsSettingsForm } from '@/components/account/thresholds-settings/ThresholdsSettingsForm';

export default async function EventNotificationThresholdsSettingsPage() {
  const t = await getTranslations('EventNotificationThresholdsSettings');

  const data = await getUsersMe();

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      {t.rich('description')}
      <ThresholdsSettingsForm currentSettings={data.notification_thresholds} />
    </div>
  );
}
