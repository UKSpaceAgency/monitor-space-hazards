'use client';

import { useTranslations } from 'next-intl';
import type { SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';

import Button from '@/ui/button/button';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import Radios from '@/ui/radios/radios';
import Spinner from '@/ui/spinner/spinner';
import { getLocalStorage, setLocalStorage } from '@/utils/Storage';

type CookieConsentType = 'granted' | 'denied' | undefined;

const CookiesChange = () => {
  const t = useTranslations('Forms.Cookies');

  const [cookieConsent, setCookieConsent] = useState<CookieConsentType>();
  const [success, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage('cookie_consent', null);
    setCookieConsent(storedCookieConsent);

    setLoading(false);
  }, [setCookieConsent]);

  const onChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    setSuccess(false);
    setCookieConsent(e.currentTarget.value as CookieConsentType);
  };

  const saveCookieSettings = () => {
    // gaEvent({
    // analytics_storage: cookieConsent
    // })

    setLocalStorage('cookie_consent', cookieConsent);
    setSuccess(true);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {success && (
        <NotificationBanner
          status="success"
        >
          {t('success_message')}
        </NotificationBanner>
      )}
      <Radios
        legend={t('question')}
        required
        aria-label="Cookie consent"
        items={[
          {
            id: 'granted',
            children: t('yes'),
            value: 'granted',
            defaultChecked: cookieConsent === 'granted',
            checked: cookieConsent === 'granted',
          },
          {
            id: 'denied',
            children: t('no'),
            value: 'denied',
            defaultChecked: cookieConsent === 'denied',
            checked: cookieConsent === 'denied',

          },
        ]}
        name="analytics"
        onChange={onChangeHandler}
      />
      <Button onClick={saveCookieSettings} aria-label={t('button')}>{t('button')}</Button>
    </div>
  );
};

export { CookiesChange };
