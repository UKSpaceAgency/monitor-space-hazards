import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getUsersMe } from '@/actions/getUsersMe';
import { NotificationSettingsForm } from '@/components/account/notification-settings/NotificationSettingsForm';
import { isGovUser } from '@/utils/Roles';

export const metadata: Metadata = {
  title: 'Choose your notification settings',
};

export default async function NotificationSettingsPage() {
  const t = await getTranslations('Notification_settings');

  const { notification_settings, role } = await getUsersMe();

  if (isGovUser(role)) {
    return notFound();
  }

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
