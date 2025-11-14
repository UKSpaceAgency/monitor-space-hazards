import type { RichTranslationValues } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import type { TypeFragmentationEvent, TypeFragmentationReportOut, TypeReentryRisk } from '@/__generated__/data-contracts';
import { renderRiskTag } from '@/utils/Risk';

import { FragmentationExecutiveSummaryTable } from './tables/FragmentationExecutiveSummaryTable';

type FragmentationExecutiveSummaryProps = {
  event: TypeFragmentationEvent;
  report: TypeFragmentationReportOut;
};

const FragmentationExecutiveSummary = async ({ event, report }: FragmentationExecutiveSummaryProps) => {
  const t = await getTranslations('Fragmentation.Executive_summary');

  const contentVariables: RichTranslationValues = {
    primaryObjectName: event?.primary_object_common_name ?? 'Unknown',
    secondaryObjectName: event?.secondary_object_common_name ?? 'Unknown',
    fragments: event?.known_fragments ?? 0,
    risk: event?.risk ?? 'Unknown',
    tag: chunks => renderRiskTag(chunks as TypeReentryRisk),
  };

  return (
    <div data-pdf={t('title')}>
      <h2 data-anchor="information" className="govuk-heading-l">{t('title')}</h2>
      <p className="govuk-body">
        {event.executive_summary_comment}
        {t.rich('content', contentVariables)}
      </p>
      <FragmentationExecutiveSummaryTable report={report} />
      {t.rich('see_further_information', { link: chunks => <a href="#further_information" className="govuk-link">{chunks}</a>,
      })}
    </div>
  );
};

export { FragmentationExecutiveSummary };
