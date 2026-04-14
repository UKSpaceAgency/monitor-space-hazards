import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import type { TypeAlertSettingsIn } from '@/__generated__/data-contracts';
import { getAlertsUserUserId } from '@/actions/getAlertsUserUserId';
import { getSession } from '@/actions/getSession';
import { getUsersById } from '@/actions/getUserById';
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

  const session = await getSession();
  const alertSettings = await getAlertsUserUserId(id);
  const user = await getUsersById(id);

  if (!isAgencyApprover(session?.user.role)) {
    notFound();
  }

  const defaultValues: AlertSettingsSchema = {
    conjunctionAlerts: alertSettings.conjunction_alert_settings?.chosen_options || [],
    receiveConjunction: alertSettings.conjunction_alert_settings?.notification_types || [],
    reEntryAlerts: alertSettings.reentry_alert_settings?.chosen_options || [],
    receiveReEntry: alertSettings.reentry_alert_settings?.notification_types || [],
    areasOfInterest: alertSettings.reentry_alert_settings?.areas_of_interest || [],
    fragmentationAlerts: alertSettings.fragmentation_alert_settings?.chosen_options || [],
    receiveFragmentation: alertSettings.fragmentation_alert_settings?.notification_types || [],
  };

  const onSubmit = async (data: TypeAlertSettingsIn) => {
    'use server';
    await patchAlertsUserUserId(id, data);
  };

  return (
    <div>
      <AlertSettingsForm
        user={user}
        defaultValues={defaultValues}
        selfEdit={false}
        onSubmit={onSubmit}
      />
    </div>
  );
}
