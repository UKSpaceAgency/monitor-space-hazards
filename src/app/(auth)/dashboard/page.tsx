import Image from 'next/image';
import Link from 'next/link';
import type { MessageKeys } from 'next-intl';
import { useMessages, useTranslations } from 'next-intl';

import nsocLogo from '@/public/nspoclogo2.png';
import { AppConfig } from '@/utils/AppConfig';

import { ObjectsTracked } from './_components/ObjectsTracked';
import { UpcomingEvents } from './_components/UpcomingEvents';

export default function DashboardPage() {
  const t = useTranslations('DashboardPage');

  const messages = useMessages() as IntlMessages;
  const services = Object.keys(messages.DashboardPage.services) as Array<keyof typeof messages['DashboardPage']['services']>; ;

  return (
    <div>
      <div className="flex items-center mb-7">
        <div className="flex-1">
          <h1 className="govuk-heading-xl mb-0">{AppConfig.name}</h1>
        </div>
        <div>
          <Image src={nsocLogo} alt="National Space Operations Centre" width={180} height={81} priority />
        </div>
      </div>
      <div className="mb-12">
        <h2 className="govuk-heading-m">{t('title')}</h2>
        <p className="govuk-body mb-0">{t('description')}</p>
      </div>

      {services.map((serviceKey) => {
        const items = messages.DashboardPage.services[serviceKey].items;
        return (
          <div key={serviceKey} className="mb-12">
            <h3 className="govuk-heading-m">{t(`services.${serviceKey}.title`)}</h3>
            <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {Object.keys(items).map((key) => {
                const title = t(`services.${serviceKey}.items.${key}.title` as MessageKeys<IntlMessages, 'DashboardPage'>);
                const description = t(`services.${serviceKey}.items.${key}.description` as MessageKeys<IntlMessages, 'DashboardPage'>);

                const linkKey = `services.${serviceKey}.items.${key}.link` as MessageKeys<IntlMessages, 'DashboardPage'>;
                const link = t.has(linkKey) ? t(linkKey) : null;

                return (
                  <div key={key}>
                    {link
                      ? (
                          <Link className="govuk-body govuk-link block font-bold mb-5" href={link}>
                            {title}
                            <svg className="inline-block govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="12.5" height="19" viewBox="0 0 33 40" aria-hidden="true" focusable="false"><path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z"></path></svg>
                          </Link>
                        )
                      : <h4 className="govuk-body block font-bold mb-5">{title}</h4>}
                    <p className="govuk-body mb-0">{description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <UpcomingEvents className="mb-12" title={t('upcoming_events.title')} conjuntionTitle={t('upcoming_events.upcoming_conjuntion')} highestPocTitle={t('upcoming_events.highest_poc')} reentryTitle={t('upcoming_events.upcoming_reentry')} />
      <ObjectsTracked className="mb-12" title={t('objects_tracked.title')} />
    </div>
  );
}
