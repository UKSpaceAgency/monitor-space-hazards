import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import type { TypeBannerMessagesBroadcastedOut } from '@/__generated__/data-contracts';
import { HtmlMapper } from '@/components/HtmlMapper';
import Cookies from '@/ui/cookies/cookies';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import PhaseBanner from '@/ui/phase-banner/phase-banner';

import Footer from './components/Footer';
import Header from './components/Header';
import Navigation from './components/Navigation';

type BaseTemplateProps = {
  breadcrumb: ReactNode;
  children: ReactNode;
  incidentBanners: TypeBannerMessagesBroadcastedOut[];
  showNavigation?: boolean;
};

const BaseTemplate = ({
  breadcrumb,
  children,
  showNavigation,
  incidentBanners,
}: BaseTemplateProps) => {
  const t = useTranslations('Template');

  return (
    <>
      <a href="#main-content" className="govuk-skip-link">{t('skip_content')}</a>
      <Cookies />
      <div className="govuk-service-navigation app-service-navigation">
        <Header />
        <PhaseBanner tag="Beta">
          {t.rich('phase_banner', {
            feedback: chunks => <Link className="govuk-link" href="/feedback">{chunks}</Link>,
          })}
        </PhaseBanner>
        {showNavigation && <Navigation />}
      </div>
      <div className="govuk-width-container">
        {breadcrumb}
        <main className="govuk-main-wrapper" id="main-content">
          {incidentBanners.map(banner => (
            <NotificationBanner key={banner.id} aria-label={banner.title} id={banner.id}>
              <HtmlMapper content={banner.content} />
            </NotificationBanner>
          ))}
          <div id="main-top-portal" />
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export { BaseTemplate };
