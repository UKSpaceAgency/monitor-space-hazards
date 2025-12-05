'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useMessages, useTranslations } from 'next-intl';
import { useState } from 'react';

import { isAgencyUser } from '@/utils/Roles';

export const Navigation = () => {
  const t = useTranslations('Template');
  const messages = useMessages() as IntlMessages;
  const { data: session } = useSession();
  const keys = Object.keys(messages.Template.navigation).filter((key) => {
    if (key === 're-entries' && !isAgencyUser(session?.user?.role)) {
      return false;
    }
    return true;
  }) as Array<keyof typeof messages['Template']['navigation']>;
  // const keys = Object.keys(messages.Template.navigation) as Array<keyof typeof messages['Template']['navigation']>;

  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <nav className="govuk-width-container">
      <div className="govuk-service-navigation__container">
        <div className="govuk-service-navigation__wrapper app-service-navigation__wrapper">
          <button
            data-collapse-toggle="navbar-default"
            aria-controls="service-header__nav"
            data-open-class="cross-service-header__button--open"
            aria-label="Show service navigation menu"
            data-label-for-show="Show service navigation menu"
            data-label-for-hide="Hide service navigation menu"
            data-text-for-show="Menu"
            data-text-for-hide="Close"
            aria-expanded={open}
            type="button"
            className="flex md:hidden items-center font-bold text-m text-blue py-2"
            onClick={() => setOpen(open => !open)}
          >
            <svg
              className={clsx('fill-blue mr-2', {
                'rotate-180': open,
              })}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
            </svg>
            Menu
          </button>
          <div
            className={clsx('w-full md:block md:w-auto', {
              hidden: !open,
            })}
            id="navbar-default"
          >
            <div className="md:flex md:justify-between">
              <ul className="govuk-service-navigation__list block mb-0 md:flex md:flex-wrap">
                {keys.filter(key => key !== 'account').map((key) => {
                  const isActive = pathname.includes(key);
                  return (
                    <li
                      key={key}
                      className={clsx('govuk-service-navigation__item', {
                        'govuk-service-navigation__item--active': isActive,
                      })}
                    >
                      <Link href={`/${key}`} className="govuk-service-navigation__link">{t(`navigation.${key}`)}</Link>
                    </li>
                  );
                })}
              </ul>
              <ul className="govuk-service-navigation__list block mb-0 md:flex md:flex-wrap">
                {keys.includes('account') && (
                  <li
                    className="govuk-service-navigation__item self-end"
                  >
                    <Link href="/account" className="govuk-service-navigation__link">{t('navigation.account')}</Link>
                  </li>
                )}
                <li
                  className="govuk-service-navigation__item self-end"
                >
                  <button type="button" className="govuk-service-navigation__link" onClick={() => signOut({ redirectTo: '/api/auth/logout' })} aria-label={t('sign_out')}>{t('sign_out')}</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
