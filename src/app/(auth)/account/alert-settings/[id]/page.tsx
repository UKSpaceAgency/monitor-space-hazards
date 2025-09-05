import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import type { TypeAlertSettingsIn } from '@/__generated__/data-contracts';
import { getAlertsUserUserId } from '@/actions/getAlertsUserUserId';
import { getUsersMe } from '@/actions/getUsersMe';
import { patchAlertsUserUserId } from '@/actions/patchAlertsUserUserId';
import { AlertSettingsForm } from '@/components/account/alert-settings/AlertSettingsForm';
import { isAgencyApprover } from '@/utils/Roles';
import type { AlertSettingsSchema } from '@/validations/alertSettingsSchema';

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
    await patchAlertsUserUserId(id, data);
  };

  return (
    <div>
      <AlertSettingsForm
        defaultValues={defaultValues}
        selfEdit={false}
        onSubmit={onSubmit}
      />
    </div>
  );
}
