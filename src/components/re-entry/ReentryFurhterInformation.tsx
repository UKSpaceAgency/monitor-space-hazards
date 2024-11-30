import Link from 'next/link';
import { useTranslations } from 'next-intl';

type ReentryFurtherInformationProps = {
  title?: string;
};

const ReentryFurtherInformation = ({ title }: ReentryFurtherInformationProps) => {
  const t = useTranslations('Re-entry.FurtherInformation');
  return (
    <div>
      <h2 data-anchor="furhter_information" className="hidden">{title}</h2>
      <p className="govuk-body">{t('content')}</p>
      <ul className="govuk-list govuk-list--bullet">
        <li>
          <Link
            href="/page/re-entry-analysis-information"
            passHref
            className="govuk-link"
          >
            {t('reentry_event_analysis_information')}
          </Link>
        </li>
        <li>
          <Link
            href="/page/definitions"
            passHref
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
