import { useTranslations } from 'next-intl';

const ConjunctionManoeuvreSupport = () => {
  const t = useTranslations('Accordions.Conjunction.mtp_chart');

  return (
    <div data-pdf={t('title')}></div>
  );
};

export { ConjunctionManoeuvreSupport };
