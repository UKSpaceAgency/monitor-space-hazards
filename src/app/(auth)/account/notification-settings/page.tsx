import { getTranslations } from 'next-intl/server';

import { getUsersMe } from '@/actions/getUsersMe';
import { NotificationSettingsForm } from '@/components/account/notification-settings/NotificationSettingsForm';

export default async function NotificationSettingsPage() {
  const t = await getTranslations('NotificationSettings');

  const data = await getUsersMe();

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      {t.rich('description')}
      <NotificationSettingsForm defaultValues={data.notification_settings} />
    </div>
  );
}
