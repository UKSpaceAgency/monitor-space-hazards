import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getUsersMe } from '@/actions/getUsersMe';
import { auth } from '@/auth';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import TaskList from '@/ui/task-list/task-list';
import { isAdmin } from '@/utils/Roles';

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
      <NotificationBanner status={isCompleted ? 'success' : 'important'}>
        <h3 className="govuk-notification-banner__heading">
          {t(isCompleted ? 'notification.completed' : 'notification.uncompleted')}
        </h3>
        {isCompleted && (
          <ButtonGroup>
            <Button as="link" href="/account">
              {t('notification.view_account_settings')}
            </Button>
            {!isAdmin(session.user.role) && (
              <Button as="link" href="/" className="govuk-button--secondary">
                {t('notification.view_home')}
              </Button>
            )}
            {isAdmin(session.user.role) && (
              <Button as="link" href="/account/add-new-user" className="govuk-button--secondary">
                {t('notification.add_users')}
              </Button>
            )}
          </ButtonGroup>
        )}
      </NotificationBanner>
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
