import { useTranslations } from 'next-intl';

type ConjunctionAlertThresholdsProps = {
  dataPdf?: string;
};

const ConjunctionAlertThresholds = ({ dataPdf }: ConjunctionAlertThresholdsProps) => {
  const t = useTranslations('Conjunction_alert.Alert_thresholds');
  return (
    <div data-pdf={dataPdf}>
      {t.rich('content')}
    </div>
  );
};

export { ConjunctionAlertThresholds };
