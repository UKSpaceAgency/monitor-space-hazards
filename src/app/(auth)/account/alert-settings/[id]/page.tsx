import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAlertsUserUserId } from '@/actions/getAlertsUserUserId';
import { getUsersMe } from '@/actions/getUsersMe';
import { AlertSettingsForm } from '@/components/account/alert-settings/AlertSettingsForm';
import { isAgencyApprover } from '@/utils/Roles';

export const metadata: Metadata = {
  title: 'Edit a user\'s alert settings',
};

export default async function EditUserAlertSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await getUsersMe();
  const alertSettings = await getAlertsUserUserId(id);

  if (!isAgencyApprover(user.role)) {
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
      <AlertSettingsForm
        userId={id}
        defaultValues={defaultValues}
        selfEdit={false}
      />
    </div>
  );
}
