import type { RichTranslationValues } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import type { TypeFragmentationEvent, TypeFragmentationReportOut, TypeReentryRisk } from '@/__generated__/data-contracts';
import { renderRiskTag } from '@/utils/Risk';

import { Markdown } from '../Markdown';
import { FragmentationExecutiveSummaryTable } from './tables/FragmentationExecutiveSummaryTable';

type FragmentationExecutiveSummaryProps = {
  event: TypeFragmentationEvent;
  report: TypeFragmentationReportOut;
  execSummaryComment?: string | null;
};

const FragmentationExecutiveSummary = async ({ event, report, execSummaryComment }: FragmentationExecutiveSummaryProps) => {
  const t = await getTranslations('Fragmentation.Executive_summary');

  const contentVariables: RichTranslationValues = {
    risk: event?.risk ?? 'Unknown',
    tag: chunks => renderRiskTag(chunks as TypeReentryRisk),
  };

  return (
    <div data-pdf={t('title')}>
      <h2 data-anchor="information" className="govuk-heading-l">{t('title')}</h2>
      {execSummaryComment && (
        <Markdown>
          {execSummaryComment}
        </Markdown>
      )}
      <p className="govuk-body">
        {t.rich('content', contentVariables)}
      </p>
      <FragmentationExecutiveSummaryTable report={report} />
      {t.rich('see_further_information', { link: chunks => <a href="#further_information" className="govuk-link">{chunks}</a>,
      })}
    </div>
  );
};

export { FragmentationExecutiveSummary };
