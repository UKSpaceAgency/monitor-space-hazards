import { getTranslations } from 'next-intl/server';

import { getUsersMe } from '@/actions/getUsersMe';
import { NotificationSettingsForm } from '@/components/account/notification-settings/NotificationSettingsForm';

export default async function NotificationSettingsPage() {
  const t = await getTranslations('NotificationSettings');

  const { notification_settings } = await getUsersMe();

  const defaultValues = {
    on_event_created: notification_settings?.on_event_created ?? [],
    on_event_updated: notification_settings?.on_event_updated ?? [],
    on_analysis_uploaded: notification_settings?.on_analysis_uploaded ?? [],
  };

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      {t.rich('content')}
      <NotificationSettingsForm defaultValues={defaultValues} />
    </div>
  );
}
