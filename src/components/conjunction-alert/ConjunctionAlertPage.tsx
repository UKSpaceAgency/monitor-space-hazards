import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import type { TypeUniqueEventUpdateTextFieldsIn } from '@/__generated__/data-contracts';
import { getConjunctionReports } from '@/actions/getConjunctionReports';
import getConjunctionUniqueEvent from '@/actions/getConjunctionUniqueEvent';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';

import { ContentNavigation } from '../ContentNavigation';
import { ConjunctionAlertAccordion } from './ConjunctionAlertAccordion';
import { ConjunctionAlertExecutiveSummary } from './ConjunctionAlertExecutiveSummary';
import { ConjunctionAlertNextUpdate } from './ConjunctionAlertNextUpdate';
import { ConjunctionAlertPageButtons } from './ConjunctionAlertPageButtons';

type ConjunctionAlertPageProps = {
  shortId: string;
  searchParams?: TypeUniqueEventUpdateTextFieldsIn;
  footer?: ReactNode;
};

const ConjunctionAlertPage = async ({ shortId, searchParams, footer }: ConjunctionAlertPageProps) => {
  const t = await getTranslations('Conjunction_alert');
  const event = await getConjunctionUniqueEvent(shortId);
  const reports = await getConjunctionReports({ shortId });
  const lastReport = reports[reports.length - 1];

  if (!lastReport) {
    notFound();
  }

  return (
    <div>
      <h1 className="govuk-heading-xl">
        {t('title', { shortId })}
      </h1>
      <div className="grid md:grid-cols-4 gap-7">
        <ContentNavigation />
        <div className="md:col-span-3">
          {t.rich('report_info', { number: lastReport.reportNumber.toString(), time: dayjs(lastReport.reportTime).format(FORMAT_DATE_TIME) })}
          <ConjunctionAlertExecutiveSummary event={event} report={lastReport} execSummaryAddition={searchParams?.exec_summary_addition ?? event.execSummaryAddition} manoeuvreAddition={searchParams?.manoeuvre_addition ?? event.manoeuvreAddition} />
          <ConjunctionAlertNextUpdate shortId={shortId} />
          <ConjunctionAlertAccordion event={event} report={lastReport} reports={reports} searchParams={searchParams} />
          {footer || <ConjunctionAlertPageButtons pdfTitle={t('title', { shortId })} />}
        </div>
      </div>
    </div>
  );
};

export { ConjunctionAlertPage };
