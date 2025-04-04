import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getSession } from '@/actions/getSession';
import { getUsersMe } from '@/actions/getUsersMe';
import TaskList from '@/ui/task-list/task-list';
import { isAgencyApprover, isAnalysist, isGovUser, isOrgAdmin, isSuperAdmin } from '@/utils/Roles';

export const metadata: Metadata = {
  title: 'Your account information',
};

export default async function AccountPage() {
  const t = await getTranslations('Account');
  const session = await getSession();
  const role = session?.user.role;

  if (!session?.user.setup_completed) {
    redirect('/account/setup');
  }

  const data = await getUsersMe();

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <div className="mb-12">
          <h1 className="govuk-heading-xl">{t('title')}</h1>
        </div>
        <div>
          <h2 className="govuk-heading-m">
            {t('view_account_details.title')}
          </h2>
        </div>
        <TaskList
          items={[
            {
              title: t('view_account_details.account_details'),
              href: '/account/contact-and-organisation-information',
            },
            {
              title: t('view_account_details.credentials_for_api'),
              href: '/account/credentials',
            },
          ]}
        />
        <div>
          <h2 className="govuk-heading-m">
            {t('change_your_notification_settings.title')}
          </h2>
        </div>
        <TaskList
          items={[
            ...(!isGovUser(role)
              ? [{
                  title: t('change_your_notification_settings.conjunction_event_notification_thresholds_settings'),
                  href: '/account/event-notification-thresholds-settings',
                }, {
                  title: t('change_your_notification_settings.conjunction_event_notification_settings'),
                  href: '/account/notification-settings',
                }]
              : []),
            // ...(!isSatteliteUser(role)
            //   ? [
            //       {
            //         title: t('change_your_notification_settings.alert_settings'),
            //         href: '/account/alert-settings',
            //       },
            //     ]
            //   : []),
          ]}
        />
        {isOrgAdmin(role) && (
          <>
            <div>
              <h2 className="govuk-heading-m">
                {t('change_your_organisation_details.title')}
              </h2>
            </div>
            <TaskList
              items={[
                {
                  title: t(`change_your_organisation_details.${isAgencyApprover(role) ? 'organisations' : 'organisation_information'}`),
                  href: isAgencyApprover(role) ? '/account/organisations' : `/account/organisations/${data.organization_id}`,
                },
                {
                  title: t('change_your_organisation_details.add_new_user'),
                  href: '/account/add-new-user',
                },
                ...(isAgencyApprover(role)
                  ? [
                      {
                        title: t('change_your_organisation_details.distribution_lists'),
                        href: '/account/distribution-list',
                      },
                    ]
                  : []),
              ]}
            />
          </>
        )}

        <div>
          <h2 className="govuk-heading-m">
            {t('view_terms_and_conditions.title')}
          </h2>
        </div>
        <TaskList
          items={[
            {
              title: t('view_terms_and_conditions.terms_and_conditions'),
              href: '/account/terms-and-conditions',
            },
            {
              title: t('view_terms_and_conditions.data_privacy_notice'),
              href: '/data-privacy-notice',
            },
          ]}
        />
        {isAnalysist(role) && (
          <>
            <div>
              <h2 className="govuk-heading-m">
                {t('view_your_account_activity.title')}
              </h2>
            </div>
            <TaskList
              items={[
                {
                  title: t('view_your_account_activity.analysis_uploads'),
                  href: '/account/analysis-upload-log',
                },
                {
                  title: t('view_your_account_activity.manoeuvre_support_uploads'),
                  href: '/account/manoeuvre-support-upload-log',
                },
              ]}
            />
          </>
        )}
        {isSuperAdmin(role) && (
          <>
            <div>
              <h2 className="govuk-heading-m">
                {t('manage_an_incident.title')}
              </h2>
            </div>
            <TaskList
              items={[
                {
                  title: t('manage_an_incident.manage_incident_banners'),
                  href: '/account/incident-banner',
                },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
}
