import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Markdown } from '../Markdown';

type ReentryAlertGuidanceIfObjectImpactsUkInterestsProps = {
  recoveryAndCleanUp?: string | null;
  dataPdf?: string;
};

const ReentryAlertGuidanceIfObjectImpactsUkInterests = ({ recoveryAndCleanUp, dataPdf }: ReentryAlertGuidanceIfObjectImpactsUkInterestsProps) => {
  const t = useTranslations('Reentry_alert.Guidance_if_object_impacts_uk_interests');

  return (
    <div data-pdf={dataPdf}>
      <h4 className="govuk-heading-m">{t('handling_space_debris.title')}</h4>
      {t.rich('handling_space_debris.content', {
        hydrazine: chunks => (
          <Link
            href="https://www.gov.uk/government/publications/hydrazine-properties-and-incident-management"
            className="govuk-link"
            target="_blank"
          >
            {chunks}
          </Link>
        ),
        kerosene: chunks => (
          <Link
            href="https://www.gov.uk/government/publications/kerosene-properties-incident-management-and-toxicology"
            className="govuk-link"
            target="_blank"
          >
            {chunks}
          </Link>
        ),
        email: chunks => (
          <Link
            href={`mailto:${chunks}`}
            className="govuk-link"
          >
            {chunks}
          </Link>
        ),
      })}
      <h4 className="govuk-heading-m">{t('public_guidance_on_space_debris.title')}</h4>
      {recoveryAndCleanUp ? <Markdown>{recoveryAndCleanUp}</Markdown> : t.rich('public_guidance_on_space_debris.content')}
    </div>
  );
};

export { ReentryAlertGuidanceIfObjectImpactsUkInterests };
