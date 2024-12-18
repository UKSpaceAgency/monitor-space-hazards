import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import type { TypeConjunctionReportOut, TypeUniqueEventOut } from '@/__generated__/data-contracts';

import { Markdown } from '../Markdown';
import { ConjunctionAlertExecutiveSummaryTable } from './tables/ConjunctionAlertExecutiveSummaryTable';

type ConjunctionAlertExecutiveSummaryProps = {
  event: TypeUniqueEventOut;
  report: TypeConjunctionReportOut;
  execSummaryAddition?: string | null;
  manoeuvreAddition?: string | null;
};

const ConjunctionAlertExecutiveSummary = async ({ report, execSummaryAddition, manoeuvreAddition }: ConjunctionAlertExecutiveSummaryProps) => {
  const t = await getTranslations('Conjunction_alert.Executive_summary');
  return (
    <div>
      <h2 data-anchor="information" data-pdf className="govuk-heading-l">{t('title')}</h2>
      <p className="govuk-body">
        {t.rich('content', {
          primaryObject: report.primaryObjectCommonName,
          secondaryObject: report.secondaryObjectCommonName,
          primaryObjectUrl: chunks => <Link href={`/satellites/${report.primaryObjectNoradId}`}>{chunks}</Link>,
          secondaryObjectUrl: chunks => <Link href={`/satellites/${report.secondaryObjectNoradId}`}>{chunks}</Link>,
        })}
      </p>
      <Markdown>
        {execSummaryAddition}
      </Markdown>
      <ConjunctionAlertExecutiveSummaryTable report={report} manoeuvreAddition={manoeuvreAddition} />
      {t.rich('see_further_information', { link: chunks => <a href="#further_information" className="govuk-link">{chunks}</a> })}
    </div>
  );
};

export { ConjunctionAlertExecutiveSummary };
