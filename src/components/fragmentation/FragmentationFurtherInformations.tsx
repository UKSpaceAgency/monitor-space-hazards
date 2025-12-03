import Link from 'next/link';
import { useTranslations } from 'next-intl';

const FragmentationFurtherInformations = ({ dataPdf }: { dataPdf: string }) => {
  const t = useTranslations('Fragmentation.Further_information');
  return (
    <div data-pdf={dataPdf}>
      <ul className="govuk-list">
        <li>
          <Link href="/page/fragmentation-event-analysis-information" className="govuk-link">
            {t('fragmentation_event_analysis_information')}
          </Link>
        </li>
        <li>
          <Link href="/page/definitions" className="govuk-link">
            {t('help_with_information')}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export { FragmentationFurtherInformations };
