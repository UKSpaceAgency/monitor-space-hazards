import { useTranslations } from 'next-intl';

const ConjunctionAlertFurtherInformation = () => {
  const t = useTranslations('Conjunction_alert.Further_information');
  return (
    <div>
      <h4 className="govuk-heading-m">{t('alerting_procedure.title')}</h4>
      {t.rich('alerting_procedure.content', {
        link: chunks => <a href="#alert_thresholds" className="govuk-link">{chunks}</a>,
      })}
      <h4 className="govuk-heading-m">{t('methodology.title')}</h4>
      {t.rich('methodology.content', {
        eventInformationLink: chunks => <a href="#alert_thresholds" className="govuk-link">{chunks}</a>,
        helpLink: chunks => <a href="#alert_thresholds" className="govuk-link">{chunks}</a>,
      })}
    </div>
  );
};

export { ConjunctionAlertFurtherInformation };
