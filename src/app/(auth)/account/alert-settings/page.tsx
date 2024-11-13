import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getUsersMe } from '@/actions/getUsersMe';
import { getUsersMeAlertSettings } from '@/actions/getUsersMeAlertSettings';
import { AlertSettingsForm } from '@/components/account/alert-settings/AlertSettingsForm';
import WarningText from '@/ui/warning-text/warning-text';

export const metadata: Metadata = {
  title: 'Edit your alert settings',
};

export default async function AlertSettingsPage() {
  const t = await getTranslations('AlertSettings');

  const user = await getUsersMe();
  const alertSettings = await getUsersMeAlertSettings();

  // if (!isSatteliteUser(user.role) || !user.id) {
  //   return notFound();
  // }

  const defaultValues = {
    conjunctionAlerts: alertSettings.conjunction_alert_settings?.chosen_option || 'none',
    receiveConjunction: alertSettings.conjunction_alert_settings?.notification_types || [],
    reEntryAlerts: alertSettings.reentry_alert_settings?.chosen_option || 'none',
    receiveReEntry: alertSettings.reentry_alert_settings?.notification_types || [],
    areasOfInterest: alertSettings.reentry_alert_settings?.areas_of_interest || [],
  };

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <p className="govuk-body">{t('description')}</p>
      <WarningText>
        {t('warning')}
      </WarningText>
      <AlertSettingsForm userId={user.id!} defaultValues={defaultValues} />
    </div>
  );
}
