'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getLocalStorage, setLocalStorage } from '@/utils/Storage';

import CookieBanner from '../cookie-banner/cookie-banner';

export function Cookies() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cookieConsent, setCookieConsent] = useState<
    'granted' | 'denied' | undefined
  >();

  useEffect(() => {
    const storedCookieConsent = getLocalStorage('cookie_consent', null);
    if (!storedCookieConsent) {
      setIsOpen(true);
    }
    setCookieConsent(storedCookieConsent);
  }, [setCookieConsent]);

  useEffect(() => {
    if (cookieConsent && window && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: cookieConsent,
      });
      setLocalStorage('cookie_consent', cookieConsent);
    }
  }, [cookieConsent]);

  const closeConsentForm = () => setIsOpen(false);

  return isOpen
    ? (
        <CookieBanner
          aria-label="Cookie banner"
          messages={[
            {
              actions: [
                {
                  'children': 'Yes, I\'m OK with analytics cookies',
                  'onClick': () => setCookieConsent('granted'),
                  'aria-label': 'Yes, I\'m OK with analytics cookie',
                },
                {
                  'children': 'No, do not use analytics cookies',
                  'onClick': () => setCookieConsent('denied'),
                  'aria-label': 'No, do not use analytics cookies',
                },
              ],
              children: [
                <p key="cookie-p-0" className="govuk-body">
                  We'd like to use analytics cookies to collect information about
                  how you use our services. We use this information to improve our
                  service.
                </p>,
                <p key="cookie-p-1" className="govuk-body">
                  You can
                  {' '}
                  <Link href="/cookies" className="govuk-link">
                    read more about our cookies
                  </Link>
                  {' '}
                  before you decide.
                </p>,
              ],
              visible: cookieConsent === null,
              heading: 'Cookies on Monitor Space Hazards',
            },
            {
              actions: [
                {
                  'children': 'Hide cookie message',
                  'onClick': closeConsentForm,
                  'aria-label': 'Hide cookie message',
                },
              ],
              children:
              <p className="govuk-body">Your cookie preferences have been saved. You have accepted cookies.</p>,
              visible: cookieConsent === 'granted',
              role: 'alert',
            },
            {
              actions: [
                {
                  'children': 'Hide cookie message',
                  'onClick': closeConsentForm,
                  'aria-label': 'Hide cookie message',
                },
              ],
              children:
              <p className="govuk-body">Your cookie preferences have been saved. You have rejected cookies.</p>,
              visible: cookieConsent === 'denied',
              role: 'alert',
            },
          ]}
        />
      )
    : null;
}

export default Cookies;
