import Link from 'next/link';
import { useTranslations } from 'next-intl';

const ReentryFurtherInformation = () => {
  const t = useTranslations('Reentry.Further_information');
  return (
    <div>
      <ul className="govuk-list govuk-list--bullet">
        <li>
          <Link
            href="/page/re-entry-analysis-information"
            className="govuk-link"
          >
            {t('reentry_event_analysis_information')}
          </Link>
        </li>
        <li>
          <Link
            href="/page/definitions"
            className="govuk-link"
          >
            {t('help_with_information')}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export { ReentryFurtherInformation };
