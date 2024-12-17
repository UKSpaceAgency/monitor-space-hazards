import { useTranslations } from 'next-intl';

const ConjunctionManoeuvreSupport = () => {
  const t = useTranslations('Conjunction.Mtp_chart');

  return (
    <div data-pdf={t('title')}></div>
  );
};

export { ConjunctionManoeuvreSupport };
