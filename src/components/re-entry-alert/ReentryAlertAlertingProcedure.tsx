import { useTranslations } from 'next-intl';

const ReentryAlertAlertingProcedure = () => {
  const t = useTranslations('Reentry_alert.Alerting_procedure');
  return (
    <div>
      <h4 className="govuk-heading-m">{t('standard_alert.title')}</h4>
      {t.rich('standard_alert.content')}
      <h4 className="govuk-heading-m">{t('priority_alert.title')}</h4>
      {t.rich('priority_alert.content')}
    </div>
  );
};

export { ReentryAlertAlertingProcedure };
