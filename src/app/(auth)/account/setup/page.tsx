import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getUsersMe } from '@/actions/getUsersMe';
import { auth } from '@/auth';
import { SetupNotificationBanner } from '@/components/account/setup/SetupNotificationBanner';
import TaskList from '@/ui/task-list/task-list';

export const metadata: Metadata = {
  title: 'Set up your account',
};

export default async function SetupPage() {
  const t = await getTranslations('Setup');
  const session = await auth();
  const user = await getUsersMe();
  const isCompleted = session?.user.setup_completed;

  return (
    <div>
      <SetupNotificationBanner session={session} viewAccountSettingsText={t('notification.view_account_settings')} viewHomeText={t('notification.view_home')} addUsersText={t('notification.add_users')} notificationsLabel={t(isCompleted ? 'notification.completed' : 'notification.uncompleted')} />
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-xl">{t('title')}</h1>
          <p className="govuk-body">
            {t('description', {
              count: Number(!!user.toc_accepted_at) + Number(!!user.account_details_confirmed_at),
              of: 2,
            })}
          </p>
          <h2 className="govuk-heading-m">{t('confirm_account_details')}</h2>
          <TaskList
            items={[
              {
                title: t('account_details'),
                href: '/account/contact-and-organisation-information',
                status: user.account_details_confirmed_at ? { text: t('completed') } : null,
              },
            ]}
          />
          <h2 className="govuk-heading-m">{t('review_terms_and_conditions')}</h2>
          <TaskList
            items={[
              {
                title: t('terms_and_conditions'),
                href: '/account/terms-and-conditions',
                status: user.toc_accepted_at ? { text: t('completed') } : null,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
