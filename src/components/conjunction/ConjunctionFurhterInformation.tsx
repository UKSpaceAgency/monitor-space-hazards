import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

const ConjunctionFurtherInformation = async () => {
  const t = await getTranslations('Conjunction.Further_information');
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
