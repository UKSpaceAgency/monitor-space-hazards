import { useTranslations } from 'next-intl';

const ConjunctionAlertThresholds = () => {
  const t = useTranslations('Conjunction_alert.Alert_thresholds');
  return (
    <div>
      {t.rich('content')}
    </div>
  );
};

export { ConjunctionAlertThresholds };
