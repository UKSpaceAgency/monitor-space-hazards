import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';

import TaskList from '@/ui/task-list/task-list';

export const metadata: Metadata = {
  title: 'Your account information',
};

export default function AccountPage() {
  const t = useTranslations('AccountPage');

  return (
    <>
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
    </>
  );
}
