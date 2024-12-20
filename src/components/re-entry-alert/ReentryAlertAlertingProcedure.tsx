import { useTranslations } from 'next-intl';

type ReentryAlertAlertingProcedureProps = {
  dataPdf?: string;
};

const ReentryAlertAlertingProcedure = ({ dataPdf }: ReentryAlertAlertingProcedureProps) => {
  const t = useTranslations('Reentry_alert.Alerting_procedure');
  return (
    <div data-pdf={dataPdf}>
      <h4 className="govuk-heading-m">{t('standard_alert.title')}</h4>
      {t.rich('standard_alert.content')}
      <h4 className="govuk-heading-m">{t('priority_alert.title')}</h4>
      {t.rich('priority_alert.content')}
    </div>
  );
};

export { ReentryAlertAlertingProcedure };
