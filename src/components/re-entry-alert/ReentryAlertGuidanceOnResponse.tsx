import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Markdown } from '../Markdown';

type ReentryAlertGuidanceOnResponseProps = {
  immediateResponse?: string | null;
  recoveryAndCleanUp?: string | null;
  dataPdf?: string;
};

const ReentryAlertGuidanceOnResponse = ({ immediateResponse, recoveryAndCleanUp, dataPdf }: ReentryAlertGuidanceOnResponseProps) => {
  const t = useTranslations('Reentry_alert.Guidance_on_response');
  return (
    <div data-pdf={dataPdf}>
      <h4 className="govuk-heading-m">{t('immediate_response.title')}</h4>
      {t.rich('immediate_response.content', { hydrazine: chunks => (
        <Link
          href="https://www.gov.uk/government/publications/hydrazine-properties-and-incident-management"
          className="govuk-link"
          target="_blank"
        >
          {chunks}
        </Link>
      ), kerosene: chunks => (
        <Link
          href="https://www.gov.uk/government/publications/kerosene-properties-incident-management-and-toxicology"
          className="govuk-link"
          target="_blank"
        >
          {chunks}
        </Link>
      ) })}
      {immediateResponse && <Markdown>{immediateResponse}</Markdown>}
      <h4 className="govuk-heading-m">{t('recovery_and_clean_up.title')}</h4>
      {t.rich('recovery_and_clean_up.content')}
      {recoveryAndCleanUp && <Markdown>{recoveryAndCleanUp}</Markdown>}
    </div>
  );
};

export { ReentryAlertGuidanceOnResponse };
