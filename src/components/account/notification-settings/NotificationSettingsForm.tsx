import type { TypeNotificationSettings } from '@/__generated__/data-contracts';
import { patchUsersMe } from '@/actions/patchUsersMe';
import Form from '@/components/form/Form';

import { NotificationSettingsFormContent } from './NotificationSettingsFormContent';

type NotificationSettingsFormProps = {
  defaultValues?: TypeNotificationSettings | null;
};

const NotificationSettingsForm = ({ defaultValues }: NotificationSettingsFormProps) => {
  const handleFormSubmit = async (values: TypeNotificationSettings) => {
    'use server';
    return patchUsersMe({ notification_settings: values });
  };

  return (
    <div>
      <Form
        action={handleFormSubmit}
        defaultValues={{
          on_event_created: defaultValues?.on_event_created ?? [],
          on_event_updated: defaultValues?.on_event_updated ?? [],
          on_analysis_uploaded: defaultValues?.on_analysis_uploaded ?? [],
        }}
        i18path="Notification_settings"
      >
        <NotificationSettingsFormContent />
      </Form>
    </div>
  );
};

export { NotificationSettingsForm };
