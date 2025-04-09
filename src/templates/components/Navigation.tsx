'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useMessages, useTranslations } from 'next-intl';
import { useState } from 'react';

export const Navigation = () => {
  const t = useTranslations('Template');
  const messages = useMessages() as IntlMessages;
  const keys = (Object.keys(messages.Template.navigation) as Array<keyof typeof messages['Template']['navigation']>).filter(key => key !== 're-entries');

  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-lightGrey border-b border-midGrey">
      <div className="govuk-width-container">
        <button
          data-collapse-toggle="navbar-default"
          aria-controls="service-header__nav"
          data-open-class="cross-service-header__button--open"
          aria-label="Show service navigation menu"
          data-label-for-show="Show service navigation menu"
          data-label-for-hide="Hide service navigation menu"
          data-text-for-show="Menu"
          data-text-for-hide="Close"
          aria-expanded="false"
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
          <ul className="block md:flex md:flex-wrap">
            {keys.map((key) => {
              const isActive = pathname.includes(key);
              return (
                <li
                  key={key}
                  className={clsx('my-5 md:pl-0 md:my-0 md:mr-5 border-l-4 md:border-l-0 md:border-b-4', {
                    'border-blue': isActive,
                    'border-transparent': !isActive,
                    'pl-4': isActive,
                  })}
                >
                  <Link href={`/${key}`} className="block font-bold md:text-lg text-blue hover:text-lightBlue md:py-4">{t(`navigation.${key}`)}</Link>
                </li>
              );
            })}
            <li
              className="my-5 md:pl-0 md:my-0 md:mr-5 border-l-4 border-l-transparent md:border-l-0 md:border-b-4 md:border-transparent"
            >
              <button type="button" className="block font-bold md:text-lg text-blue hover:text-lightBlue md:py-4" onClick={() => signOut({ redirectTo: '/api/auth/logout' })}>{t('sign_out')}</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
