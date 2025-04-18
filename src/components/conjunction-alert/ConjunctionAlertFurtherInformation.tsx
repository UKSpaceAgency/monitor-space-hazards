import Link from 'next/link';
import { useTranslations } from 'next-intl';

const ConjunctionAlertFurtherInformation = ({ dataPdf }: { dataPdf: string }) => {
  const t = useTranslations('Conjunction_alert.Further_information');
  return (
    <div data-pdf={dataPdf}>
      {/* <h4 className="govuk-heading-m">{t('alerting_procedure.title')}</h4>
      {t.rich('alerting_procedure.content', {
        link: chunks => <a href="#alert_thresholds" className="govuk-link">{chunks}</a>,
      })} */}
      <h4 className="govuk-heading-m">{t('methodology.title')}</h4>
      {t.rich('methodology.content', {
        eventInformationLink: chunks => (
          <Link
            href="/page/conjunction-analysis-information"
            className="govuk-link"
          >
            {chunks}
          </Link>
        ),
        helpLink: chunks => <Link href="/page/definitions" className="govuk-link">{chunks}</Link>,
      })}
    </div>
  );
};

export { ConjunctionAlertFurtherInformation };
