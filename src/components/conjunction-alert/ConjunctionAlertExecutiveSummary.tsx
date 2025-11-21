import Link from 'next/link';
import type { RichTranslationValues } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import type { TypeConjunctionReportOut, TypeRisk } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import InsetText from '@/ui/inset-text/inset-text';
import { roundedPercent } from '@/utils/Math';
import { renderRiskTag } from '@/utils/Risk';

import { Markdown } from '../Markdown';
import { ConjunctionAlertExecutiveSummaryTable } from './tables/ConjunctionAlertExecutiveSummaryTable';

type ConjunctionAlertExecutiveSummaryProps = {
  report: TypeConjunctionReportOut;
  executiveSummaryComment?: string | null;
  manoeuvreComment?: string | null;
  isClosed?: boolean;
};

const ConjunctionAlertExecutiveSummary = async ({ report, executiveSummaryComment, manoeuvreComment, isClosed }: ConjunctionAlertExecutiveSummaryProps) => {
  const t = await getTranslations('Conjunction_alert.Executive_summary');

  const contentVariables: RichTranslationValues = {
    primaryObject: report.primaryObjectCommonName,
    secondaryObject: report.secondaryObjectCommonName,
    primaryObjectUrl: chunks => <Link href={`/satellites/${report.primaryObjectNoradId}`}>{chunks}</Link>,
    secondaryObjectUrl: chunks => <Link href={`/satellites/${report.secondaryObjectNoradId}`}>{chunks}</Link>,
    risk: report.risk,
    collisionProbability: roundedPercent(report.collisionProbability),
    tag: chunks => renderRiskTag(chunks as TypeRisk),
    date: dayjs(report.tcaTime).format(FORMAT_FULL_DATE_TIME),
  };

  return (
    <div data-pdf={t('title')}>
      <h2 data-anchor="information" className="govuk-heading-l">{t('title')}</h2>
      {isClosed
        ? (
            <InsetText>
              {t.rich('closed_report', contentVariables)}
            </InsetText>
          )
        : (
            <p className="govuk-body">
              {t.rich('content', contentVariables)}
            </p>
          )}
      <Markdown>
        {executiveSummaryComment}
      </Markdown>
      <ConjunctionAlertExecutiveSummaryTable report={report} manoeuvreComment={manoeuvreComment} />
      {t.rich('see_further_information', { link: chunks => <a href="#further_information" className="govuk-link">{chunks}</a> })}
    </div>
  );
};

export { ConjunctionAlertExecutiveSummary };
