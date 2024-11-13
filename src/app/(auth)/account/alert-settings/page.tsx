import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { getUsersMe } from '@/actions/getUsersMe';
import { getUsersMeAlertSettings } from '@/actions/getUsersMeAlertSettings';
import { AlertSettingsForm } from '@/components/account/alert-settings/AlertSettingsForm';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import WarningText from '@/ui/warning-text/warning-text';

export const metadata: Metadata = {
  title: 'Edit your alert settings',
};

export default async function AlertSettingsPage() {
  const t = await getTranslations('AlertSettings');

  const user = await getUsersMe();
  const alertSettings = await getUsersMeAlertSettings();

  //   if (!isSatteliteUser(user.role)) {
  //     return notFound();
  //   }

  const defaultValues = {
    conjunctionAlerts: alertSettings.conjunction_alert_settings?.chosen_option || 'none',
    receiveConjunction: alertSettings.conjunction_alert_settings?.notification_types || [],
    reEntryAlerts: alertSettings.reentry_alert_settings?.chosen_option || 'none',
    receiveReEntry: alertSettings.reentry_alert_settings?.notification_types || [],
  };

  return (
    <div>
      <NotificationBanner status="important" heading={t('information_banner.title')}>
        <p className="govuk-body">
          {t('information_banner.content.youCanVisit')}
          <Link href="/performance-monitoring" className="govuk-link mx-1">{t('information_banner.content.externalData')}</Link>
          {t('information_banner.content.toSeeWhen')}
        </p>
        <p className="govuk-body">
          {t('information_banner.content.contact')}
          <Link href="/performance-monitoring" className="govuk-link mx-1">{t('information_banner.content.email')}</Link>
          {t('information_banner.content.forMoreInformation')}
        </p>
      </NotificationBanner>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <p className="govuk-body">{t('description')}</p>
      <WarningText>
        {t('warning')}
      </WarningText>
      <AlertSettingsForm userId={user.id || ''} defaultValues={defaultValues} />
    </div>
  );
}
