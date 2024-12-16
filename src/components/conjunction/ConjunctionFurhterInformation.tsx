import Link from 'next/link';
import { useTranslations } from 'next-intl';

const ConjunctionFurtherInformation = () => {
  const t = useTranslations('Accordions.Conjunction.further_information');
  return (
    <>
      <p className="govuk-body mt-2">{t('description')}</p>
      <ul className="govuk-list">
        <li>
          <Link
            href="/page/conjunction-analysis-information"
            className="govuk-link"
          >
            {t('link1')}
          </Link>
        </li>
        <li>
          <Link href="/page/definitions" className="govuk-link">
            {t('link2')}
          </Link>
        </li>
      </ul>
    </>
  );
};

export { ConjunctionFurtherInformation };
