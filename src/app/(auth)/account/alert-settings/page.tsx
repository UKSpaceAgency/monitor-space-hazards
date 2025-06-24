import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import type { TypeAlertSettingsIn } from '@/__generated__/data-contracts';
import { getUsersMe } from '@/actions/getUsersMe';
import { getUsersMeAlertSettings } from '@/actions/getUsersMeAlertSettings';
import { postMeAlertSettings } from '@/actions/postMeAlertSettings';
import { AlertSettingsForm } from '@/components/account/alert-settings/AlertSettingsForm';
import { isSatteliteUser } from '@/utils/Roles';
import type { AlertSettingsSchema } from '@/validations/alertSettingsSchema';

export const metadata: Metadata = {
  title: 'Edit your alert settings',
};

export default async function AlertSettingsPage() {
  const user = await getUsersMe();
  const alertSettings = await getUsersMeAlertSettings();

  if (isSatteliteUser(user.role) || !user.id) {
    notFound();
  }

  const defaultValues: AlertSettingsSchema = {
    conjunctionAlerts: alertSettings.conjunction_alert_settings?.chosen_option || 'none',
    receiveConjunction: alertSettings.conjunction_alert_settings?.notification_types || [],
    reEntryAlerts: alertSettings.reentry_alert_settings?.chosen_option || 'none',
    receiveReEntry: alertSettings.reentry_alert_settings?.notification_types || [],
    areasOfInterest: alertSettings.reentry_alert_settings?.areas_of_interest || [],
  };

  const onSubmit = async (data: TypeAlertSettingsIn) => {
    'use server';
    await postMeAlertSettings(data);
  };

  return (
    <div>
      <AlertSettingsForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
    </div>
  );
}
