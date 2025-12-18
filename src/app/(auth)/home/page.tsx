import { ArrowRight02Icon } from 'hugeicons-react';
import { pick } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import type { MessageKeys } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

import { getSession } from '@/actions/getSession';
import { UpcomingEvents } from '@/components/dashboard/UpcomingEvents';
import nsocLogo from '@/public/nspoclogo2.png';
import { AppConfig } from '@/utils/AppConfig';
import { isAgencyUser } from '@/utils/Roles';

export default async function DashboardPage() {
  const t = await getTranslations('Dashboard');
  const session = await getSession();
  const messages = await getMessages() as IntlMessages;
  const allServicesItems = messages.Dashboard.services.items;
  const keyServicesItems = pick(allServicesItems, ['track_conjunctions', 'track_reentries', 'track_fragmentations']);

  return (
    <div>
      <div className="-mt-5 md:-mt-10 mb-7 bg-[#D2E2F1] w-[100vw] left-1/2 right-1/2 relative -translate-x-1/2">
        <div className="govuk-width-container py-10 flex flex-col gap-6">
          <Image src={nsocLogo} alt="National Space Operations Centre" width={180} height={81} priority />
          <h1 className="govuk-heading-xl mb-0">{AppConfig.name}</h1>
          <p className="govuk-body-l mb-0">{t('title')}</p>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="govuk-heading-m">{t('services.key_services_title')}</h3>
        <ul>
          {Object.keys(keyServicesItems).map((key) => {
            const title = t(`services.items.${key}.title` as MessageKeys<IntlMessages, 'Dashboard'>);
            const linkKey = `services.items.${key}.link` as MessageKeys<IntlMessages, 'Dashboard'>;
            const link = t.has(linkKey) ? t(linkKey) : null;
            return (
              <li key={key} className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center bg-lightGrey rounded-full w-8 h-8">
                  <ArrowRight02Icon className="size-6" />
                </div>
                {link
                  ? (
                      <Link className="govuk-body govuk-link block font-bold mb-0" href={link}>
                        {title}
                      </Link>
                    )
                  : <h4 className="govuk-body block font-bold mb-0">{title}</h4>}
              </li>
            );
          })}
        </ul>
      </div>
      <hr className="border-t-4 border-t-blue mb-8" />
      <div className="mb-8">
        <h3 className="govuk-heading-m">{t('services.all_services_title')}</h3>
        <div className="">
          {Object.keys(allServicesItems).filter((key) => {
            if (key === 'track_reentries' && !isAgencyUser(session?.user?.role)) {
              return false;
            }
            return true;
          }).map((key) => {
            const title = t(`services.items.${key}.title` as MessageKeys<IntlMessages, 'Dashboard'>);
            const description = t(`services.items.${key}.description` as MessageKeys<IntlMessages, 'Dashboard'>);

            const linkKey = `services.items.${key}.link` as MessageKeys<IntlMessages, 'Dashboard'>;
            const link = t.has(linkKey) ? t(linkKey) : null;

            return (
              <div key={key}>
                <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                {link
                  ? (
                      <Link className="govuk-body govuk-link block font-bold mb-5" href={link}>
                        {title}
                      </Link>
                    )
                  : <h4 className="govuk-body block font-bold mb-5">{title}</h4>}
                <p className="govuk-body mb-0">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
      <hr className="border-t-4 border-t-blue mb-8" />
      <UpcomingEvents title={t('upcoming_events.title')} conjunctionTitle={t('upcoming_events.upcoming_conjunction')} highestPocTitle={t('upcoming_events.highest_poc')} reentryTitle={t('upcoming_events.upcoming_reentry')} />
      {/* <ObjectsTracked className="mb-12" title={t('objects_tracked.title')} /> */}
    </div>
  );
}
