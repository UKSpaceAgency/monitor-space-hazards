import { useTranslations } from 'next-intl';

const FragmentationAlertingProcedure = ({ dataPdf }: { dataPdf: string }) => {
  const t = useTranslations('Fragmentation.Alerting_procedure');
  return (
    <div data-pdf={dataPdf}>
      {t.rich('content')}
    </div>
  );
};

export { FragmentationAlertingProcedure };
