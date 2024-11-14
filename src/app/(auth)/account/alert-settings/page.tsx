import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getUsersMe } from '@/actions/getUsersMe';
import { getUsersMeAlertSettings } from '@/actions/getUsersMeAlertSettings';
import { AlertSettingsForm } from '@/components/account/alert-settings/AlertSettingsForm';
import { isSatteliteUser } from '@/utils/Roles';

export const metadata: Metadata = {
  title: 'Edit your alert settings',
};

export default async function AlertSettingsPage() {
  const user = await getUsersMe();
  const alertSettings = await getUsersMeAlertSettings();

  if (isSatteliteUser(user.role) || !user.id) {
    return notFound();
  }

  const defaultValues = {
    conjunctionAlerts: alertSettings.conjunction_alert_settings?.chosen_option || 'none',
    receiveConjunction: alertSettings.conjunction_alert_settings?.notification_types || [],
    reEntryAlerts: alertSettings.reentry_alert_settings?.chosen_option || 'none',
    receiveReEntry: alertSettings.reentry_alert_settings?.notification_types || [],
    areasOfInterest: alertSettings.reentry_alert_settings?.areas_of_interest || [],
  };

  return (
    <div>
      <AlertSettingsForm userId={user.id} defaultValues={defaultValues} />
    </div>
  );
}
