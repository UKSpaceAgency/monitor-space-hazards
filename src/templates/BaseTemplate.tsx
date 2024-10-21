import Link from 'next/link';
import { useTranslations } from 'next-intl';

import PhaseBanner from '@/ui/phase-banner/phase-banner';

import Footer from './components/Footer';
import Header from './components/Header';
import Navigation from './components/Navigation';

type BaseTemplateProps = {
  children: React.ReactNode;
  showNavigation?: true;
};

const BaseTemplate = ({
  children,
  showNavigation,
}: BaseTemplateProps) => {
  const t = useTranslations('BaseTemplate');

  return (
    <>
      <a href="#main-content" className="govuk-skip-link">{t('skip_content')}</a>
      <Header />
      <PhaseBanner tag="Beta">
        {t.rich('phase_banner', {
          feedback: chunks => <Link className="govuk-link" href="/feedback">{chunks}</Link>,
        })}
      </PhaseBanner>
      {showNavigation && <Navigation />}
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper" id="main-content">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export { BaseTemplate };
