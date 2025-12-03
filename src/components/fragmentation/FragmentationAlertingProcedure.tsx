import { useTranslations } from 'next-intl';

const FragmentationAlertingProcedure = ({ dataPdf }: { dataPdf: string }) => {
  const t = useTranslations('Fragmentation.Alerting_procedure');
  return (
    <div data-pdf={dataPdf}>
      <h4 className="govuk-heading-m">{t('standard.title')}</h4>
      {t.rich('standard.content')}
      <h4 className="govuk-heading-m">{t('priority.title')}</h4>
      {t.rich('priority.content')}
    </div>
  );
};

export { FragmentationAlertingProcedure };
